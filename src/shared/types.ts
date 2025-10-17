import z from "zod";

// Product schemas
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  price: z.number(), // in cents
  image_url: z.string().nullable(),
  is_active: z.boolean(),
  category: z.string().nullable(),
  subcategory: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Product = z.infer<typeof ProductSchema>;

// Cart item schema
export const CartItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image_url: z.string().nullable(),
  quantity: z.number(),
});

export type CartItem = z.infer<typeof CartItemSchema>;

// Order schemas
export const OrderItemSchema = z.object({
  id: z.number(),
  order_id: z.number(),
  product_id: z.number(),
  quantity: z.number(),
  price_at_purchase: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const OrderSchema = z.object({
  id: z.number(),
  user_id: z.string().nullable(),
  email: z.string(),
  total_amount: z.number(),
  status: z.string(),
  stripe_payment_intent_id: z.string().nullable(),
  shipping_name: z.string().nullable(),
  shipping_address: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Order = z.infer<typeof OrderSchema>;
export type OrderItem = z.infer<typeof OrderItemSchema>;

// API request schemas
export const CreateOrderSchema = z.object({
  email: z.string().email(),
  items: z.array(z.object({
    product_id: z.number(),
    quantity: z.number().min(1),
  })),
  shipping_name: z.string().min(1),
  shipping_address: z.string().min(1),
  payment_intent_id: z.string().optional(),
});

export type CreateOrderRequest = z.infer<typeof CreateOrderSchema>;
