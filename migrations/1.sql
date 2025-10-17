
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  description TEXT,
  price INTEGER NOT NULL, -- stored in cents (USD)
  image_url TEXT,
  is_active BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT, -- nullable for guest orders
  email TEXT NOT NULL,
  total_amount INTEGER NOT NULL, -- stored in cents (USD)
  status TEXT NOT NULL DEFAULT 'pending', -- pending, completed, cancelled
  stripe_payment_intent_id TEXT,
  shipping_name TEXT,
  shipping_address TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  order_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_at_purchase INTEGER NOT NULL, -- price when purchased, in cents
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, description, price, image_url) VALUES
('Lumina Classic Tee', 'Soft cotton tee that feels like a gentle embrace. Perfect for everyday comfort with a premium touch.', 2400, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80'),
('Lumina Linen Shirt', 'Lightweight and breezy linen shirt that flows with grace. Ideal for warm days and effortless style.', 4800, 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80'),
('Lumina Cozy Hoodie', 'Warm and comfy hoodie that wraps you in pure comfort. The perfect companion for cozy moments.', 6500, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80');
