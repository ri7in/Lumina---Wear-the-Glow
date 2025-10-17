
-- Remove new products
DELETE FROM products WHERE id > 3;

-- Remove category columns
ALTER TABLE products DROP COLUMN subcategory;
ALTER TABLE products DROP COLUMN category;

-- Restore original image URLs
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80' WHERE id = 1;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&q=80' WHERE id = 2;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&q=80' WHERE id = 3;
