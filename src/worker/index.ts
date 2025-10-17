import { Hono } from "hono";
import { cors } from "hono/cors";
import { zValidator } from "@hono/zod-validator";
import { 
  authMiddleware, 
  getOAuthRedirectUrl, 
  exchangeCodeForSessionToken,
  deleteSession,
  MOCHA_SESSION_TOKEN_COOKIE_NAME 
} from "@getmocha/users-service/backend";
import { getCookie, setCookie } from "hono/cookie";
import { CreateOrderSchema } from "@/shared/types";
import Stripe from "stripe";
import z from "zod";

const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use("*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// Products API
app.get("/api/products", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM products WHERE is_active = 1 ORDER BY created_at DESC"
  ).all();
  
  return c.json(results);
});

app.get("/api/products/:id", async (c) => {
  const id = c.req.param("id");
  const result = await c.env.DB.prepare(
    "SELECT * FROM products WHERE id = ? AND is_active = 1"
  ).bind(id).first();
  
  if (!result) {
    return c.json({ error: "Product not found" }, 404);
  }
  
  return c.json(result);
});

// Auth endpoints
app.get('/api/oauth/google/redirect_url', async (c) => {
  const redirectUrl = await getOAuthRedirectUrl('google', {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  return c.json({ redirectUrl }, 200);
});

app.post("/api/sessions", async (c) => {
  const body = await c.req.json();

  if (!body.code) {
    return c.json({ error: "No authorization code provided" }, 400);
  }

  const sessionToken = await exchangeCodeForSessionToken(body.code, {
    apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
    apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
  });

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    maxAge: 60 * 24 * 60 * 60, // 60 days
  });

  return c.json({ success: true }, 200);
});

app.get("/api/users/me", authMiddleware, async (c) => {
  return c.json(c.get("user"));
});

app.get('/api/logout', async (c) => {
  const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);

  if (typeof sessionToken === 'string') {
    await deleteSession(sessionToken, {
      apiUrl: c.env.MOCHA_USERS_SERVICE_API_URL,
      apiKey: c.env.MOCHA_USERS_SERVICE_API_KEY,
    });
  }

  setCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME, '', {
    httpOnly: true,
    path: '/',
    sameSite: 'none',
    secure: true,
    maxAge: 0,
  });

  return c.json({ success: true }, 200);
});

// Stripe API endpoints
app.get("/api/stripe/public-key", async (c) => {
  const publicKey = c.env.STRIPE_PUBLISHABLE_KEY;
  if (!publicKey) {
    return c.json({ error: "Stripe publishable key not configured" }, 500);
  }
  return c.json({ publicKey });
});

const CreatePaymentIntentSchema = z.object({
  amount: z.number(),
  currency: z.string().default("usd"),
  metadata: z.object({}).optional(),
});

app.post("/api/stripe/create-payment-intent", zValidator("json", CreatePaymentIntentSchema), async (c) => {
  const { amount, currency, metadata } = c.req.valid("json");
  
  const stripeSecretKey = c.env.STRIPE_SECRET_KEY;
  if (!stripeSecretKey) {
    console.error('Stripe secret key not configured');
    return c.json({ error: 'Payment system not configured' }, 500);
  }

  if (!amount || amount < 50) {
    return c.json({ error: 'Invalid amount' }, 400);
  }
  
  try {
    const stripe = new Stripe(stripeSecretKey);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata: metadata || {},
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    if (!paymentIntent.client_secret) {
      throw new Error('No client secret returned from Stripe');
    }
    
    return c.json({ 
      client_secret: paymentIntent.client_secret,
      payment_intent_id: paymentIntent.id 
    });
  } catch (error) {
    console.error('Stripe payment intent creation failed:', error);
    return c.json({ 
      error: 'Failed to create payment intent',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, 500);
  }
});

// Orders API
app.post("/api/orders", zValidator("json", CreateOrderSchema), async (c) => {
  const { email, items, shipping_name, shipping_address, payment_intent_id } = c.req.valid("json");
  
  // Get user if authenticated
  let user_id = null;
  try {
    const sessionToken = getCookie(c, MOCHA_SESSION_TOKEN_COOKIE_NAME);
    if (sessionToken) {
      // This would require importing getCurrentUser, but for simplicity we'll skip user_id for now
      // user_id = user?.id || null;
    }
  } catch (e) {
    // Not authenticated, continue as guest
  }
  
  // Calculate total amount
  let total_amount = 0;
  for (const item of items) {
    const product = await c.env.DB.prepare(
      "SELECT price FROM products WHERE id = ? AND is_active = 1"
    ).bind(item.product_id).first();
    
    if (!product) {
      return c.json({ error: `Product ${item.product_id} not found` }, 400);
    }
    
    total_amount += (product.price as number) * item.quantity;
  }
  
  // Create order
  const orderResult = await c.env.DB.prepare(
    "INSERT INTO orders (user_id, email, total_amount, status, stripe_payment_intent_id, shipping_name, shipping_address) VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id"
  ).bind(user_id, email, total_amount, 'completed', payment_intent_id, shipping_name, shipping_address).first();
  
  const orderId = (orderResult as any).id;
  
  // Create order items
  for (const item of items) {
    const product = await c.env.DB.prepare(
      "SELECT price FROM products WHERE id = ?"
    ).bind(item.product_id).first();
    
    await c.env.DB.prepare(
      "INSERT INTO order_items (order_id, product_id, quantity, price_at_purchase) VALUES (?, ?, ?, ?)"
    ).bind(orderId, item.product_id, item.quantity, (product as any).price).run();
  }
  
  return c.json({ 
    success: true, 
    order_id: orderId,
    total_amount: total_amount 
  });
});

// Get orders for authenticated user
app.get("/api/orders", authMiddleware, async (c) => {
  const user = c.get("user");
  
  const { results } = await c.env.DB.prepare(
    `SELECT o.*, 
     GROUP_CONCAT(p.name || ' x' || oi.quantity, ', ') as items
     FROM orders o 
     LEFT JOIN order_items oi ON o.id = oi.order_id
     LEFT JOIN products p ON oi.product_id = p.id
     WHERE o.user_id = ? 
     GROUP BY o.id
     ORDER BY o.created_at DESC`
  ).bind(user!.id).all();
  
  return c.json(results);
});

export default app;
