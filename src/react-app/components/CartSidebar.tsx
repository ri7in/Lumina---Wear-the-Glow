import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/react-app/hooks/useCart';

export default function CartSidebar() {
  const { state, closeCart, updateQuantity, removeItem } = useCart();

  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  const totalAmount = state.total;

  if (!state.isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
        onClick={closeCart}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transform translate-x-0 transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-pink-100">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5" />
              <span>Your Bag</span>
            </h2>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-pink-50 transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Your bag is empty</p>
                <button
                  onClick={closeCart}
                  className="text-pink-600 font-medium hover:text-pink-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 card-sharp border border-gray-100">
                    <img
                      src={item.image_url || '/placeholder-product.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover card-sharp"
                      style={{
                        filter: 'sepia(0.1) contrast(0.95) brightness(0.98)',
                      }}
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-gray-800 font-semibold">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-full hover:bg-pink-100 transition-colors"
                      >
                        <Minus className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      <span className="w-8 text-center font-medium text-gray-800">
                        {item.quantity}
                      </span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-full hover:bg-green-100 transition-colors"
                      >
                        <Plus className="w-4 h-4 text-green-600" />
                      </button>
                      
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 rounded-full hover:bg-red-100 transition-colors ml-2"
                      >
                        <X className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Footer */}
          {state.items.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50">
              {/* Item Total for each item */}
              <div className="space-y-2 mb-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm text-gray-600">
                    <span>{item.name} × {item.quantity}</span>
                    <span>{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-800">Total:</span>
                <span className="text-2xl font-bold text-gray-800">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              
              <div className="space-y-3">
                <a
                  href="/cart"
                  onClick={closeCart}
                  className="block w-full text-center px-6 py-4 btn-primary font-semibold transition-all duration-300 shadow-soft hover:shadow-glow font-source"
                >
                  Checkout
                </a>
                <button
                  onClick={closeCart}
                  className="block w-full text-center px-6 py-3 border-2 border-lumina-200 text-gray-700 font-medium hover:bg-lumina-50 transition-all duration-300 font-source"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
