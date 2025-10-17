import { Plus, Minus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/react-app/hooks/useCart';

export default function Cart() {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  const totalAmount = state.total;
  const itemCount = state.items.reduce((total, item) => total + item.quantity, 0);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen py-12 px-6 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center py-20">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-8" />
            <h1 className="text-4xl font-source font-semibold text-gray-800 mb-4">
              Your bag is empty
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto font-source">
              Looks like you haven't added any items to your bag yet. 
              Discover our beautiful collection and find something that makes you glow.
            </p>
            <a
              href="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-lumina-200 to-lumina-300 hover:from-lumina-300 hover:to-lumina-400 text-gray-800 font-semibold transition-all duration-300 shadow-soft hover:shadow-glow button-sharp font-source"
            >
              <span>Start Shopping</span>
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        {/* Page Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-source font-semibold text-gray-800 mb-4">
            Shopping Bag
          </h1>
          <p className="text-gray-600 font-source">
            {itemCount} item{itemCount !== 1 ? 's' : ''} in your bag
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-6 animate-slide-up">
              {state.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-white p-6 shadow-soft border border-gray-100 card-sharp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image_url || '/placeholder-product.jpg'}
                        alt={item.name}
                        className="w-24 h-24 object-cover card-sharp"
                        style={{
                          filter: 'sepia(0.1) contrast(0.95) brightness(0.98)',
                        }}
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {item.name}
                      </h3>
                      <p className="text-gray-800 font-semibold text-lg">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center border border-gray-200">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 font-medium text-gray-800 min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-green-600 hover:text-green-700 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:bg-red-100 transition-colors"
                        title="Remove item"
                      >
                        <X className="w-5 h-5 text-red-600" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="mt-4 pt-4 border-t border-pink-100">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Item total:</span>
                      <span className="font-semibold text-gray-800">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <div className="pt-6">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear entire bag
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gray-50 p-8 shadow-soft sticky top-24 card-sharp border border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6 font-source">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({itemCount} items)</span>
                  <span className="font-semibold text-gray-800">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-600">Calculated at checkout</span>
                </div>
                <hr className="border-pink-200" />
                <div className="flex justify-between text-xl">
                  <span className="font-semibold text-gray-800">Total</span>
                  <span className="font-bold text-gray-800">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <a
                  href="/checkout"
                  className="block w-full text-center px-6 py-4 btn-green font-semibold transition-all duration-300 shadow-soft hover:shadow-glow transform hover:scale-105 font-source"
                >
                  Proceed to Checkout
                </a>
                <a
                  href="/products"
                  className="block w-full text-center px-6 py-3 border-2 border-lumina-200 text-gray-700 font-medium hover:bg-lumina-50 transition-all duration-300 font-source"
                >
                  Continue Shopping
                </a>
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-pink-200">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                  <span>Secure checkout guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
