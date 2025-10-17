import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '@/shared/types';

const subcategories = ['Casual Dresses', 'Maxi Dresses', 'Midi Dresses', 'Jumpsuits', 'Two-Piece Sets'];

export default function CategoryDresses() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubcategory, setSelectedSubcategory] = useState('All');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        const dressesProducts = data.filter((product: Product) => product.category === 'Dresses & Jumpsuits');
        setProducts(dressesProducts);
        
        // Check for subcategory filter from URL
        const urlParams = new URLSearchParams(window.location.search);
        const subcategory = urlParams.get('subcategory');
        if (subcategory) {
          setSelectedSubcategory(subcategory);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedSubcategory === 'All') return true;
    return product.subcategory === selectedSubcategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Sparkles className="w-12 h-12 text-pink-400 mx-auto" />
          </div>
          <p className="text-gray-600 font-source">Loading dresses collection...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-5xl">
        {/* Page Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-source font-semibold text-gray-800 mb-4">
            Dresses & Jumpsuits
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 font-source">
            Embrace feminine elegance with our collection of dresses and jumpsuits. From casual day wear 
            to special occasion pieces, find styles that make you feel confident and beautiful.
          </p>

          {/* Subcategory Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setSelectedSubcategory('All')}
              className={`px-4 py-2 text-sm font-medium transition-all duration-300 font-source ${
                selectedSubcategory === 'All'
                  ? 'text-gray-800 border-2 border-pink-400 bg-pink-50'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-lumina-50 hover:text-gray-800'
              }`}
            >
              All Dresses
            </button>
            {subcategories.map((subcategory) => (
              <button
                key={subcategory}
                onClick={() => setSelectedSubcategory(subcategory)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 font-source ${
                  selectedSubcategory === subcategory
                    ? 'text-gray-800 border-2 border-pink-400 bg-pink-50'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-lumina-50 hover:text-gray-800'
                }`}
              >
                {subcategory}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2 font-source">
              No products found
            </h3>
            <p className="text-gray-500 mb-4 font-source">
              Try selecting a different subcategory or check back soon for new arrivals.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 px-4">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a 
                  href={`/products/${product.id}`}
                  className="group block overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 transform hover:scale-105"
                >
                  <div className="aspect-[3/4] overflow-hidden relative">
                    <img
                      src={product.image_url || '/placeholder-product.jpg'}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
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
        )}
      </div>
    </div>
  );
}
