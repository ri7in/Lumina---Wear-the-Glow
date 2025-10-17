
-- Clear existing products and add category-specific products
DELETE FROM products;

-- Tops Category
INSERT INTO products (name, description, price, image_url, is_active, category, subcategory) VALUES
('Soft Cotton Crop Tee', 'Ultra-soft cotton crop tee perfect for layering or wearing alone. Features a relaxed fit and breathable fabric.', 2800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-croptee-1.jpg', 1, 'Tops', 'Crop Tops'),
('Vintage Oversized Shirt', 'Effortlessly chic oversized shirt with a vintage-inspired silhouette. Made from sustainable materials.', 4200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-shirt-1.jpg', 1, 'Tops', 'Shirts'),
('Essential Tank Top', 'Wardrobe essential tank top in premium organic cotton. Perfect for layering or summer styling.', 2400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-tank-1.jpg', 1, 'Tops', 'Tanks'),
('Luxe Long Sleeve Tee', 'Elevated basics in buttery-soft modal blend. Features subtle draping and timeless appeal.', 3600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-longsleeve-1.jpg', 1, 'Tops', 'Tees'),
('Silk Touch Blouse', 'Delicate blouse with silk-like finish. Perfect for work or evening occasions.', 5800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-blouse-1.jpg', 1, 'Tops', 'Blouses');

-- Bottoms Category  
INSERT INTO products (name, description, price, image_url, is_active, category, subcategory) VALUES
('High-Waisted Vintage Jeans', 'Classic high-waisted jeans with a vintage wash. Flattering fit that works with everything in your wardrobe.', 6800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-jeans-1.jpg', 1, 'Bottoms', 'Jeans'),
('Flowing Midi Skirt', 'Dreamy midi skirt that moves beautifully. Perfect for both casual and dressed-up looks.', 4600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-skirt-1.jpg', 1, 'Bottoms', 'Skirts'),
('Wide Leg Trousers', 'Effortlessly elegant wide-leg trousers in premium fabric. Creates a beautiful silhouette.', 7200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-trousers-1.jpg', 1, 'Bottoms', 'Trousers'),
('Comfort Shorts', 'Ultra-comfortable shorts perfect for warm weather. Features a relaxed fit and soft fabric.', 3200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-shorts-1.jpg', 1, 'Bottoms', 'Shorts'),
('Cargo Style Pants', 'Modern take on cargo pants with a feminine silhouette. Functional yet stylish.', 5600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-cargo-1.jpg', 1, 'Bottoms', 'Cargo Pants');

-- Outerwear Category
INSERT INTO products (name, description, price, image_url, is_active, category, subcategory) VALUES
('Cozy Oversized Hoodie', 'The perfect cozy hoodie for lounging or casual outings. Features ultra-soft fleece interior.', 6200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-hoodie-1.jpg', 1, 'Outerwear', 'Hoodies'),
('Vintage Denim Jacket', 'Classic denim jacket with vintage details. A timeless piece that elevates any outfit.', 8800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-jacket-1.jpg', 1, 'Outerwear', 'Jackets'),
('Cropped Knit Cardigan', 'Delicate cropped cardigan perfect for layering. Features beautiful knit details.', 5400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-cardigan-1.jpg', 1, 'Outerwear', 'Cardigans'),
('Structured Blazer', 'Perfectly tailored blazer that works from desk to dinner. Features modern feminine silhouette.', 12800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-blazer-1.jpg', 1, 'Outerwear', 'Blazers'),
('Bomber Jacket', 'Contemporary bomber jacket with a feminine twist. Perfect for transitional weather.', 9600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-bomber-1.jpg', 1, 'Outerwear', 'Jackets');

-- Dresses & Jumpsuits Category
INSERT INTO products (name, description, price, image_url, is_active, category, subcategory) VALUES
('Flowing Midi Dress', 'Effortlessly elegant midi dress that flatters every figure. Perfect for any occasion.', 7800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-dress-1.jpg', 1, 'Dresses & Jumpsuits', 'Midi Dresses'),
('Romantic Wrap Dress', 'Timeless wrap dress with beautiful draping. Features adjustable fit and feminine silhouette.', 8400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-wrapdress-1.jpg', 1, 'Dresses & Jumpsuits', 'Casual Dresses'),
('Elegant Maxi Dress', 'Floor-length maxi dress perfect for special occasions. Features flowing fabric and beautiful details.', 11200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-maxi-1.jpg', 1, 'Dresses & Jumpsuits', 'Maxi Dresses'),
('Casual Day Dress', 'Perfect everyday dress that looks effortless but polished. Features comfortable fit and beautiful drape.', 6400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-casual-dress-1.jpg', 1, 'Dresses & Jumpsuits', 'Casual Dresses'),
('Wide Leg Jumpsuit', 'Sophisticated jumpsuit with wide leg silhouette. Perfect for work or evening occasions.', 9800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-jumpsuit-1.jpg', 1, 'Dresses & Jumpsuits', 'Jumpsuits');

-- Accessories Category
INSERT INTO products (name, description, price, image_url, is_active, category, subcategory) VALUES
('Soft Leather Handbag', 'Luxurious soft leather handbag perfect for everyday use. Features multiple compartments and timeless design.', 14800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-handbag-1.jpg', 1, 'Accessories', 'Bags'),
('Wide Brim Hat', 'Chic wide brim hat perfect for sunny days. Features UVA protection and elegant silhouette.', 4800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-hat-1.jpg', 1, 'Accessories', 'Hats'),
('Delicate Gold Necklace', 'Minimalist gold necklace that complements any outfit. Features quality gold plating and adjustable length.', 3200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-necklace-1.jpg', 1, 'Accessories', 'Jewelry'),
('Leather Belt', 'Classic leather belt with modern hardware. Perfect for cinching dresses or styling high-waisted pieces.', 2800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-belt-1.jpg', 1, 'Accessories', 'Belts'),
('Vintage Sunglasses', 'Retro-inspired sunglasses with UV protection. Features durable frames and timeless appeal.', 3600, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-sunglasses-1.jpg', 1, 'Accessories', 'Sunglasses');
