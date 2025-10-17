import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ArrowLeft, ShoppingBag, Heart, Share2, Sparkles, Star, Ruler, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Product } from '@/shared/types';
import { useCart } from '@/react-app/hooks/useCart';
import BagDropdown from '@/react-app/components/BagDropdown';

const productImages = {
  1: [
    'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-croptee-1.jpg',
    'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-croptop-beige.jpg'
  ],
  2: [
    'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-hoodie-cream.jpg',
    'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-hoodie-1.jpg'
  ],
  3: [
    'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/urban-jeans-light.jpg',
    'https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/product-jeans-1.jpg'
  ]
};

const sizes = ['XS', 'S', 'M', 'L', 'XL'];
const colors = ['Cream', 'Soft Pink', 'Sage Green', 'Lavender'];

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Cream');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [favoriteCount, setFavoriteCount] = useState(203);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [showBagDropdown, setShowBagDropdown] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<any>(null);
  const { addItem } = useCart();

  const currentImages = product ? (productImages[product.id as keyof typeof productImages] || [product.image_url]) : [];

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        const response = await fetch(`/api/products/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Product not found');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const allProducts = await response.json();
        // Get 3 random products from different categories
        const filtered = allProducts.filter((p: Product) => p.id !== parseInt(id || '0')).slice(0, 3);
        setRelatedProducts(filtered);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
      });
    }
    
    setLastAddedItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: product.image_url,
      quantity: quantity,
    });
    
    setShowBagDropdown(true);
    setTimeout(() => setShowBagDropdown(false), 3000);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    setFavoriteCount(prev => isFavorited ? prev - 1 : prev + 1);
  };

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Sparkles className="w-12 h-12 text-pink-400 mx-auto" />
          </div>
          <p className="text-gray-600 font-source">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 font-source">
            Product not found
          </h2>
          <a
            href="/products"
            className="text-gray-700 font-medium hover:text-gray-900 transition-colors font-source"
          >
            Browse all products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Back Button */}
        <div className="mb-8 animate-fade-in">
          <a
            href={product?.category ? `/${product.category.toLowerCase().replace(' & ', '-').replace(' ', '-')}` : '/products'}
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors font-source"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {product?.category || 'Products'}</span>
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Product Images */}
          <div className="animate-slide-up space-y-4">
            {/* Main Image */}
            <div className="aspect-square overflow-hidden shadow-soft card-sharp relative">
              <img
                src={currentImages[currentImageIndex] || '/placeholder-product.jpg'}
                alt={product.name}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-700"
              />
              
              {/* Image Navigation */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === 0 ? currentImages.length - 1 : prev - 1)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white shadow-soft card-sharp"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setCurrentImageIndex(prev => prev === currentImages.length - 1 ? 0 : prev + 1)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white shadow-soft card-sharp"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-2">
              {currentImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-20 h-20 overflow-hidden border-2 card-sharp transition-all duration-300 ${
                    currentImageIndex === index ? 'border-pink-400' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="animate-slide-up space-y-8" style={{ animationDelay: '0.2s' }}>
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl md:text-5xl font-source font-semibold text-gray-800 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-gray-800 font-source">
                  {formatPrice(product.price)}
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2 font-source">4.2</span>
                  </div>
                  <span className="text-sm text-gray-500 font-source">
                    (127 reviews)
                  </span>
                  <span className="text-sm text-gray-500 font-source">
                    ♡ {favoriteCount} favorites
                  </span>
                </div>
              </div>
            </div>

            {/* Product Description */}
            <div className="space-y-4">
              <h3 className="text-headline-6 font-semibold text-gray-800 font-source">
                About this piece
              </h3>
              <p className="text-gray-600 leading-relaxed text-base font-source">
                {product.description || `Experience the perfect blend of comfort and style with our ${product.name}. 
                Crafted from premium materials, this piece embodies the essence of modern minimalism while 
                maintaining the soft, dreamy aesthetic that defines our collection. Whether you're creating 
                a casual everyday look or dressing up for special moments, this versatile piece adapts 
                beautifully to your lifestyle.`}
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700 font-source">
                Color: {selectedColor}
              </label>
              <div className="flex space-x-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 card-sharp transition-all duration-300 ${
                      selectedColor === color ? 'border-4 border-black scale-110' : 'border-2 border-gray-200'
                    }`}
                    style={{
                      backgroundColor: color === 'Cream' ? '#F5F5DC' : 
                                     color === 'Soft Pink' ? '#F2BBCF' :
                                     color === 'Sage Green' ? '#9CAF88' : '#E6E6FA'
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-700 font-source">
                  Size: {selectedSize}
                </label>
                <button
                  onClick={() => setShowSizeChart(true)}
                  className="text-sm text-lumina-600 hover:text-lumina-700 underline font-source flex items-center space-x-1"
                >
                  <Ruler className="w-3 h-3" />
                  <span>Size Chart</span>
                </button>
              </div>
              <div className="flex space-x-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border text-sm font-medium transition-all duration-300 font-source ${
                      selectedSize === size
                        ? 'border-2 border-pink-400 text-gray-800 bg-pink-50'
                        : 'border border-gray-200 text-gray-600 hover:border-lumina-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-6">
              <label className="text-sm font-medium text-gray-700 font-source">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-200 button-sharp">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-source"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium text-gray-800 min-w-[3rem] text-center font-source">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors font-source"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                className="w-full flex items-center justify-center space-x-2 px-6 py-3 btn-primary font-medium transition-all duration-300 font-source"
              >
                <ShoppingBag className="w-6 h-6" />
                <span>Add to Bag</span>
              </button>

              <div className="flex space-x-4">
                <button 
                  onClick={handleFavorite}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-lumina-200 text-gray-700 font-medium transition-all duration-300 font-source"
                >
                  <Heart className={`w-4 h-4 transition-colors ${isFavorited ? 'text-pink-500 fill-current' : ''}`} />
                  <span>Save for Later</span>
                </button>
                <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-lumina-200 text-gray-700 font-medium transition-all duration-300 font-source">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* You'll Love These Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 font-source">
                You'll love these too
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <a 
                    key={relatedProduct.id}
                    href={`/products/${relatedProduct.id}`}
                    className="group block overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 border border-lumina-100 card-sharp bg-white"
                  >
                    <div className="aspect-[3/4] overflow-hidden relative">
                      <img
                        src={relatedProduct.image_url || '/placeholder-product.jpg'}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                        <h3 className="text-lg font-medium text-white mb-1 font-source">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-white font-source">
                          {formatPrice(relatedProduct.price)}
                        </p>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bag Dropdown */}
        {lastAddedItem && (
          <BagDropdown 
            isVisible={showBagDropdown} 
            item={lastAddedItem}
          />
        )}

        {/* Size Chart Modal */}
        {showSizeChart && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
              onClick={() => setShowSizeChart(false)}
            />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="bg-white border border-lumina-200 shadow-glow max-w-md w-full animate-slide-up card-sharp">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 font-source">Size Chart</h3>
                    <button
                      onClick={() => setShowSizeChart(false)}
                      className="p-2 hover:bg-lumina-50 transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-lumina-100">
                          <th className="text-left py-2 font-source">Size</th>
                          <th className="text-left py-2 font-source">Bust</th>
                          <th className="text-left py-2 font-source">Waist</th>
                          <th className="text-left py-2 font-source">Hips</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        <tr className="border-b border-lumina-100">
                          <td className="py-2 font-source">XS</td>
                          <td className="py-2 font-source">32"</td>
                          <td className="py-2 font-source">24"</td>
                          <td className="py-2 font-source">34"</td>
                        </tr>
                        <tr className="border-b border-lumina-100">
                          <td className="py-2 font-source">S</td>
                          <td className="py-2 font-source">34"</td>
                          <td className="py-2 font-source">26"</td>
                          <td className="py-2 font-source">36"</td>
                        </tr>
                        <tr className="border-b border-lumina-100">
                          <td className="py-2 font-source">M</td>
                          <td className="py-2 font-source">36"</td>
                          <td className="py-2 font-source">28"</td>
                          <td className="py-2 font-source">38"</td>
                        </tr>
                        <tr className="border-b border-lumina-100">
                          <td className="py-2 font-source">L</td>
                          <td className="py-2 font-source">38"</td>
                          <td className="py-2 font-source">30"</td>
                          <td className="py-2 font-source">40"</td>
                        </tr>
                        <tr>
                          <td className="py-2 font-source">XL</td>
                          <td className="py-2 font-source">40"</td>
                          <td className="py-2 font-source">32"</td>
                          <td className="py-2 font-source">42"</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
