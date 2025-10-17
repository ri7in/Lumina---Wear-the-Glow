
-- Remove new products
DELETE FROM products WHERE name IN ('Urban Cream Hoodie', 'Light Wash Jeans', 'Pink Oversized Blazer', 'Peach Midi Dress', 'Cream Cropped Cardigan', 'Beige Crop Top');

-- Reset categories to NULL
UPDATE products SET category = NULL, subcategory = NULL;
