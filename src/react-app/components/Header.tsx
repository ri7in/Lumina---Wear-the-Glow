import { useState } from 'react';
import { ShoppingBag, User, LogOut, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/react-app/hooks/useCart';
import { useAuth } from '@getmocha/users-service/react';

const categories = [
  {
    name: 'Tops',
    subcategories: ['Tees', 'Shirts', 'Crop Tops', 'Blouses', 'Tanks']
  },
  {
    name: 'Bottoms',
    subcategories: ['Jeans', 'Skirts', 'Shorts', 'Trousers', 'Cargo Pants']
  },
  {
    name: 'Outerwear',
    subcategories: ['Hoodies', 'Jackets', 'Cardigans', 'Blazers', 'Overshirts']
  },
  {
    name: 'Dresses & Jumpsuits',
    subcategories: ['Casual Dresses', 'Maxi Dresses', 'Midi Dresses', 'Jumpsuits', 'Two-Piece Sets']
  },
  {
    name: 'Accessories',
    subcategories: ['Bags', 'Hats', 'Jewelry', 'Belts', 'Sunglasses']
  }
];

export default function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { state: cartState, toggleCart } = useCart();
  const { user, redirectToLogin, logout } = useAuth();
  
  const itemCount = cartState.items.reduce((total, item) => total + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const getCategoryUrl = (categoryName: string) => {
    switch (categoryName) {
      case 'Tops': return '/tops';
      case 'Bottoms': return '/bottoms';
      case 'Outerwear': return '/outerwear';
      case 'Dresses & Jumpsuits': return '/dresses';
      case 'Accessories': return '/accessories';
      default: return '/products';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-pink-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo - moved more to the left */}
          <div className="flex items-center -ml-4">
            <a href="/" className="flex items-center space-x-2">
              <img 
                src="https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/lumina-high-resolution-logo-transparent.png" 
                alt="Lumina" 
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <a href="/" className="text-body-1 text-gray-700 hover:text-primary-dark transition-colors">
              Home
            </a>
            
            {categories.map((category) => (
              <div 
                key={category.name} 
                className="relative"
                onMouseEnter={() => {
                  if (dropdownTimeout) {
                    clearTimeout(dropdownTimeout);
                    setDropdownTimeout(null);
                  }
                  setActiveDropdown(category.name);
                }}
                onMouseLeave={() => {
                  const timeout = setTimeout(() => {
                    setActiveDropdown(null);
                  }, 800);
                  setDropdownTimeout(timeout);
                }}
              >
                <a href={getCategoryUrl(category.name)} className="text-body-1 text-gray-700 hover:text-primary-dark transition-colors">
                  <span>{category.name}</span>
                </a>
                
                {activeDropdown === category.name && (
                  <div className="absolute top-full left-0 mt-1 bg-white border border-pink-100 shadow-soft min-w-48 animate-slide-down">
                    <div className="py-2">
                      {category.subcategories.map((sub) => (
                        <a
                          key={sub}
                          href={`${getCategoryUrl(category.name)}?subcategory=${sub}`}
                          className="block px-4 py-2 text-body-2 text-secondary hover:bg-lumina-200 hover:text-gray-800 transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-3">
            {/* Search Box - Desktop */}
            <form onSubmit={handleSearch} className="hidden lg:flex items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 w-48 border border-gray-200 text-sm text-gray-700 placeholder-gray-400 focus:border-lumina-200 transition-colors"
                />
              </div>
            </form>

            {/* User Menu - Desktop */}
            <div className="hidden lg:block relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    className="flex items-center space-x-2 p-1 hover:bg-pink-50 transition-colors"
                  >
                    <img
                      src={user.google_user_data.picture || ''}
                      alt={user.google_user_data.name || 'User'}
                      className="w-7 h-7 border border-pink-200"
                    />
                  </button>
                  {activeDropdown === 'user' && (
                    <div className="absolute top-full right-0 mt-1 bg-white border border-pink-100 shadow-soft min-w-40 animate-slide-down">
                      <div className="py-2">
                        <div className="px-4 py-2 text-body-2 text-gray-600 border-b border-pink-100">
                          {user.google_user_data.given_name}
                        </div>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2 text-body-2 text-secondary hover:bg-lumina-200 hover:text-gray-800 transition-colors flex items-center space-x-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={redirectToLogin}
                  className="p-2 hover:bg-pink-50 transition-colors"
                  title="Sign In"
                >
                  <User className="w-5 h-5 text-gray-600" />
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-pink-50 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>

            {/* Bag Button */}
            <button
              onClick={toggleCart}
              className="relative p-2 hover:bg-pink-50 transition-colors"
              title="Shopping Bag"
              id="shopping-bag-button"
            >
              <ShoppingBag className="w-5 h-5 text-gray-600" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-pink-100 animate-slide-down">
            <div className="py-4 space-y-4">
              <a href="/" className="block text-body-1 text-gray-700 hover:text-primary-dark transition-colors">
                Home
              </a>
              
              {categories.map((category) => (
                <div key={category.name}>
                  <a 
                    href={getCategoryUrl(category.name)}
                    className="block text-body-1 text-gray-700 hover:text-primary-dark transition-colors font-medium"
                  >
                    {category.name}
                  </a>
                  <div className="ml-4 mt-2 space-y-2">
                    {category.subcategories.map((sub) => (
                      <a
                        key={sub}
                        href={`${getCategoryUrl(category.name)}?subcategory=${sub}`}
                        className="block text-body-2 text-secondary hover:text-primary-dark transition-colors"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              ))}

              {/* Mobile User Menu */}
              <div className="pt-4 border-t border-pink-100">
                {user ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.google_user_data.picture || ''}
                        alt={user.google_user_data.name || 'User'}
                        className="w-8 h-8 border border-pink-200"
                      />
                      <span className="text-body-2 text-gray-700">
                        {user.google_user_data.given_name}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="p-2 hover:bg-pink-50 transition-colors focus-ring"
                      title="Logout"
                    >
                      <LogOut className="w-4 h-4 text-secondary" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={redirectToLogin}
                    className="flex items-center space-x-2 text-body-1 text-primary-dark font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
