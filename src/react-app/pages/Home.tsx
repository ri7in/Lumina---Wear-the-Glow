import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '@/shared/types';

import HeroSlideshow from '@/react-app/components/HeroSlideshow';
import CouponPopup from '@/react-app/components/CouponPopup';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCouponPopup, setShowCouponPopup] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const products = await response.json();
        
        // Filter for specific featured products
        const featuredNames = ['Soft Cotton Crop Tee', 'Wide Leg Jumpsuit', 'Soft Leather Handbag'];
        const featured = products.filter((product: Product) => 
          featuredNames.includes(product.name)
        );
        setFeaturedProducts(featured);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Show coupon popup after 2 seconds on first visit
    const hasSeenPopup = localStorage.getItem('lumina_coupon_seen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setShowCouponPopup(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCloseCouponPopup = () => {
    setShowCouponPopup(false);
    localStorage.setItem('lumina_coupon_seen', 'true');
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="animate-spin">
          <Sparkles className="w-10 h-10 text-pink-400" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in bg-white">
      {/* Coupon Popup */}
      <CouponPopup isOpen={showCouponPopup} onClose={handleCloseCouponPopup} />
      
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Category Highlights Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-source font-semibold text-gray-800 mb-3">
              Shop by Category
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-source">
              Explore our curated collections designed to elevate every aspect of your wardrobe.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <a 
              href="/tops"
              className="group relative overflow-hidden aspect-square border border-pink-100 shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 card-sharp"
            >
              <img
                src="https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/category-tops-closeup.jpg"
                alt="Tops"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white font-source">Tops</h3>
              </div>
            </a>
            
            <a 
              href="/bottoms"
              className="group relative overflow-hidden aspect-square border border-pink-100 shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 card-sharp"
            >
              <img
                src="https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/category-bottoms-closeup.jpg"
                alt="Bottoms"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white font-source">Bottoms</h3>
              </div>
            </a>
            
            <a 
              href="/outerwear"
              className="group relative overflow-hidden aspect-square border border-pink-100 shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 card-sharp"
            >
              <img
                src="https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/category-outerwear-closeup.jpg"
                alt="Outerwear"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white font-source">Outerwear</h3>
              </div>
            </a>
            
            <a 
              href="/dresses"
              className="group relative overflow-hidden aspect-square border border-pink-100 shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 card-sharp"
            >
              <img
                src="https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/category-dresses-closeup.jpg"
                alt="Dresses & Jumpsuits"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white font-source">Dresses</h3>
              </div>
            </a>

            <a 
              href="/accessories"
              className="group relative overflow-hidden aspect-square border border-pink-100 shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 card-sharp"
            >
              <img
                src="https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/category-accessories-closeup.jpg"
                alt="Accessories"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h3 className="text-lg font-semibold text-white font-source">Accessories</h3>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-source font-semibold text-gray-800 mb-3">
              Featured Collection
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto font-source">
              Discover our most loved pieces, carefully selected for their comfort, style, and that special glow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="w-full animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a 
                  href={`/products/${product.id}`}
                  className="group block overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105 card-sharp bg-white"
                >
                  <div className="aspect-[3/5] overflow-hidden relative">
                    <img
                      src={product.image_url || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                      <h3 className="text-lg font-medium text-white mb-1 font-source">
                        {product.name}
                      </h3>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <a
              href="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 text-lg btn-primary shadow-soft hover:shadow-glow transform hover:scale-105 font-source"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
}
