import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import { Product } from '@/shared/types';


const categories = [
  'All',
  'Tops',
  'Bottoms', 
  'Outerwear',
  'Dresses & Jumpsuits',
  'Accessories'
];

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Get search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get('search');
    if (search) {
      setSearchQuery(search);
    }
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || 
      (product.category && product.category === selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin mb-4">
            <Sparkles className="w-12 h-12 text-pink-400 mx-auto" />
          </div>
          <p className="text-gray-600 font-source">Loading our beautiful collection...</p>
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
            Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 font-source">
            Discover comfort that radiates style. Each piece in our collection is thoughtfully designed 
            to make you feel confident and effortlessly elegant.
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-sm font-medium transition-all duration-300 font-source ${
                  selectedCategory === category
                    ? 'text-gray-800 border-2 border-lumina-300'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-lumina-50 hover:text-gray-800'
                }`}
              >
                {category}
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
              Try adjusting your search terms or browse our full collection.
            </p>
            <div className="space-x-4">
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-lumina-600 font-medium hover:text-lumina-700 transition-colors font-source"
                >
                  Clear search
                </button>
              )}
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-lumina-600 font-medium hover:text-lumina-700 transition-colors font-source"
                >
                  Show all categories
                </button>
              )}
            </div>
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

        {/* Call to Action */}
        <div className="text-center mt-16 py-12 bg-gradient-to-r from-lumina-50 to-lumina-100 card-sharp">
          <h3 className="text-2xl md:text-3xl font-source font-semibold text-gray-800 mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto font-source">
            We're constantly adding new pieces to our collection. 
            Check back soon for more beautiful styles.
          </p>
          <a
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-lumina-200 to-lumina-300 hover:from-lumina-300 hover:to-lumina-400 text-gray-800 font-medium transition-all duration-300 shadow-soft hover:shadow-glow button-sharp font-source"
          >
            <span>Back to Home</span>
          </a>
        </div>
      </div>
    </div>
  );
}
