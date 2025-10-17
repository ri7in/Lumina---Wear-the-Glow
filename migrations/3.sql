
-- Update existing products with categories
UPDATE products SET category = 'Tops', subcategory = 'Tees' WHERE name LIKE '%Tee%' OR name LIKE '%T-Shirt%';
UPDATE products SET category = 'Tops', subcategory = 'Shirts' WHERE name LIKE '%Shirt%' AND name NOT LIKE '%T-Shirt%';
UPDATE products SET category = 'Outerwear', subcategory = 'Hoodies' WHERE name LIKE '%Hoodie%';
UPDATE products SET category = 'Outerwear', subcategory = 'Cardigans' WHERE name LIKE '%Cardigan%';
UPDATE products SET category = 'Outerwear', subcategory = 'Blazers' WHERE name LIKE '%Blazer%';
UPDATE products SET category = 'Dresses & Jumpsuits', subcategory = 'Midi Dresses' WHERE name LIKE '%Dress%';
UPDATE products SET category = 'Bottoms', subcategory = 'Jeans' WHERE name LIKE '%Jean%';
UPDATE products SET category = 'Bottoms', subcategory = 'Skirts' WHERE name LIKE '%Skirt%';
UPDATE products SET category = 'Bottoms', subcategory = 'Trousers' WHERE name LIKE '%Trouser%';
UPDATE products SET category = 'Tops', subcategory = 'Tanks' WHERE name LIKE '%Tank%';
UPDATE products SET category = 'Tops', subcategory = 'Long Sleeves' WHERE name LIKE '%Long%';
UPDATE products SET category = 'Outerwear', subcategory = 'Jackets' WHERE name LIKE '%Jacket%';
UPDATE products SET category = 'Tops', subcategory = 'Crop Tops' WHERE name LIKE '%Crop%';

-- Add new products for comprehensive catalog
INSERT INTO products (name, description, price, image_url, category, subcategory, is_active) VALUES
('Urban Cream Hoodie', 'Oversized hoodie in soft cream color, perfect for city adventures and cozy days', 6500, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-hoodie-cream.jpg', 'Outerwear', 'Hoodies', 1),
('Light Wash Jeans', 'High-waisted jeans in vintage light wash denim, effortlessly stylish', 8500, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-jeans-light.jpg', 'Bottoms', 'Jeans', 1),
('Pink Oversized Blazer', 'Soft pink blazer with relaxed fit, perfect for elevating any look', 12500, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-blazer-pink.jpg', 'Outerwear', 'Blazers', 1),
('Peach Midi Dress', 'Flowing midi dress in soft peach, designed for comfort and elegance', 9500, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-dress-peach.jpg', 'Dresses & Jumpsuits', 'Midi Dresses', 1),
('Cream Cropped Cardigan', 'Cropped cardigan in cream white, perfect for layering', 7500, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-cardigan-cream.jpg', 'Outerwear', 'Cardigans', 1),
('Beige Crop Top', 'Soft crop top in beige, minimalist design with maximum comfort', 4500, 'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-croptop-beige.jpg', 'Tops', 'Crop Tops', 1);
