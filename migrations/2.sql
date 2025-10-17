
-- Add category support to products
ALTER TABLE products ADD COLUMN category TEXT;
ALTER TABLE products ADD COLUMN subcategory TEXT;

-- Update existing products with categories
UPDATE products SET category = 'Tops', subcategory = 'Tees' WHERE id = 1;
UPDATE products SET category = 'Tops', subcategory = 'Shirts' WHERE id = 2;
UPDATE products SET category = 'Outerwear', subcategory = 'Hoodies' WHERE id = 3;

-- Insert more products with aesthetic images
INSERT INTO products (name, description, price, image_url, category, subcategory, is_active) VALUES
('Vintage Wash Jeans', 'High-waisted denim with a perfectly faded vintage wash. Effortlessly cool and endlessly comfortable.', 7200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-jeans-1.jpg', 'Bottoms', 'Jeans', 1),
('Silk Midi Skirt', 'Flowing silk skirt that moves with grace. Perfect for both casual days and special moments.', 5400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-skirt-1.jpg', 'Bottoms', 'Skirts', 1),
('Cashmere Cardigan', 'Ultra-soft cashmere cardigan that wraps you in luxury. A timeless piece for every wardrobe.', 8900, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-cardigan-1.jpg', 'Outerwear', 'Cardigans', 1),
('Structured Blazer', 'Tailored blazer that commands attention while keeping you comfortable. Power meets elegance.', 12500, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-blazer-1.jpg', 'Outerwear', 'Blazers', 1),
('Essential Tank', 'The perfect layering piece in premium cotton. Simple, elegant, and endlessly versatile.', 1800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-tank-1.jpg', 'Tops', 'Tanks', 1),
('Wide-Leg Trousers', 'Flowing trousers that combine comfort with sophistication. Your new go-to for effortless style.', 6800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-trousers-1.jpg', 'Bottoms', 'Trousers', 1),
('Long Sleeve Henley', 'Soft cotton henley with a relaxed fit. Perfect for layering or wearing on its own.', 3200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-longsleeve-1.jpg', 'Tops', 'Long Sleeves', 1),
('Bomber Jacket', 'Classic bomber with a modern twist. Lightweight and perfect for transitional weather.', 7800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-bomber-1.jpg', 'Outerwear', 'Jackets', 1),
('Wrap Dress', 'Flattering wrap dress that transitions from day to night. Elegant simplicity at its finest.', 6200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-wrapdress-1.jpg', 'Dresses', 'Midi', 1),
('Cropped Tee', 'Perfectly cropped tee in the softest cotton. A modern essential for your everyday wardrobe.', 2200, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-croptee-1.jpg', 'Tops', 'Tees', 1),
('Knit Sweater', 'Cozy knit sweater that feels like a warm hug. Perfect for cool days and cozy nights.', 5800, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-sweater-1.jpg', 'Tops', 'Sweaters', 1),
('Maxi Dress', 'Flowing maxi dress that moves with ethereal grace. Romance meets comfort in perfect harmony.', 8400, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-dress-1.jpg', 'Dresses', 'Maxi', 1);

-- Update existing product images with new aesthetic ones
UPDATE products SET image_url = 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-tee-1.jpg' WHERE id = 1;
UPDATE products SET image_url = 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-shirt-1.jpg' WHERE id = 2;
UPDATE products SET image_url = 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-hoodie-1.jpg' WHERE id = 3;
