
-- Clear existing products and add comprehensive catalog
DELETE FROM products;

-- Tops
INSERT INTO products (name, description, price, image_url, category, subcategory) VALUES
('Essential Cotton Tee', 'Soft cotton essential in perfect fit. Your everyday go-to piece.', 2800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-tee-1.jpg', 'Tops', 'Tees'),
('Oversized Linen Shirt', 'Lightweight linen that flows with grace. Effortless elegance.', 4600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-shirt-1.jpg', 'Tops', 'Shirts'),
('Cropped Ribbed Tank', 'Ribbed cotton tank with perfect crop. Comfort meets style.', 2200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-tank-1.jpg', 'Tops', 'Tanks'),
('Silk Touch Blouse', 'Delicate silk-blend blouse. Refined and timeless.', 5400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-shirt-1.jpg', 'Tops', 'Blouses'),
('Vintage Crop Tee', 'Perfectly cropped vintage-style tee. Retro meets modern.', 3200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-croptee-1.jpg', 'Tops', 'Crop Tops'),

-- Bottoms  
('High Rise Vintage Jeans', 'Classic high-waisted denim with perfect fade. Timeless appeal.', 7800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-jeans-1.jpg', 'Bottoms', 'Jeans'),
('Silk Midi Skirt', 'Flowing silk skirt that moves with you. Effortless grace.', 5600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-skirt-1.jpg', 'Bottoms', 'Skirts'),
('Wide Leg Trousers', 'Comfortable wide-leg silhouette. Modern minimalism.', 6400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-trousers-1.jpg', 'Bottoms', 'Trousers'),
('Denim Mini Skirt', 'Classic denim mini with vintage wash. Effortlessly cool.', 4200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-skirt-1.jpg', 'Bottoms', 'Skirts'),
('Cargo Style Pants', 'Utility meets style in soft cotton blend. Urban comfort.', 5800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-trousers-1.jpg', 'Bottoms', 'Cargo Pants'),

-- Outerwear
('Oversized Comfort Hoodie', 'Ultimate comfort in premium cotton blend. Your cozy companion.', 7200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-hoodie-1.jpg', 'Outerwear', 'Hoodies'),
('Structured Blazer', 'Tailored blazer with modern edge. Confidence in every line.', 9800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-blazer-1.jpg', 'Outerwear', 'Blazers'),
('Soft Knit Cardigan', 'Cozy cardigan in delicate knit. Warmth with elegance.', 6800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-cardigan-1.jpg', 'Outerwear', 'Cardigans'),
('Vintage Denim Jacket', 'Classic denim with perfect vintage wash. Timeless essential.', 8400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-jacket-1.jpg', 'Outerwear', 'Jackets'),
('Bomber Jacket', 'Modern bomber with soft touch. Urban sophistication.', 7600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-bomber-1.jpg', 'Outerwear', 'Jackets'),

-- Dresses & Jumpsuits
('Flowing Midi Dress', 'Graceful midi that moves with you. Effortless elegance.', 8200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-dress-1.jpg', 'Dresses & Jumpsuits', 'Midi Dresses'),
('Casual Day Dress', 'Perfect everyday dress in soft cotton. Comfort meets style.', 6400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-dress-1.jpg', 'Dresses & Jumpsuits', 'Casual Dresses'),
('Elegant Wrap Dress', 'Classic wrap silhouette in premium fabric. Timeless femininity.', 9600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-wrapdress-1.jpg', 'Dresses & Jumpsuits', 'Casual Dresses'),
('Maxi Flow Dress', 'Dreamy maxi with beautiful drape. Romance in every movement.', 10400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-dress-1.jpg', 'Dresses & Jumpsuits', 'Maxi Dresses'),
('Two Piece Set', 'Coordinated set for effortless styling. Modern sophistication.', 11200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-dress-1.jpg', 'Dresses & Jumpsuits', 'Two-Piece Sets');
