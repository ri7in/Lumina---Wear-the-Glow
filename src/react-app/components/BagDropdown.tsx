import { ShoppingBag, ArrowRight } from 'lucide-react';

interface BagDropdownProps {
  isVisible: boolean;
  item: {
    id: number;
    name: string;
    price: number;
    image_url: string | null;
    quantity: number;
  };
}

export default function BagDropdown({ isVisible, item }: BagDropdownProps) {
  const formatPrice = (priceInCents: number) => {
    return `$${(priceInCents / 100).toFixed(2)}`;
  };

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 right-0 z-50">
      <div 
        className="absolute top-16 right-8 bg-white border-2 border-gray-200 shadow-2xl w-80 animate-slide-down card-sharp"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
        }}
      >
        <div className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <ShoppingBag className="w-5 h-5 text-green-600" />
            <h3 className="text-lg font-semibold text-gray-800 font-source">
              Added to Bag!
            </h3>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={item.image_url || '/placeholder-product.jpg'}
              alt={item.name}
              className="w-16 h-16 object-cover card-sharp"
            />
            
            <div className="flex-1">
              <h4 className="font-medium text-gray-800 font-source">{item.name}</h4>
              <p className="text-gray-600 text-sm font-source">
                {formatPrice(item.price)} × {item.quantity}
              </p>
              <p className="font-semibold text-gray-800 font-source">
                {formatPrice(item.price * item.quantity)}
              </p>
            </div>
          </div>
          
          <a
            href="/cart"
            className="w-full flex items-center justify-center space-x-2 px-6 py-3 btn-primary font-semibold transition-all duration-300 shadow-soft hover:shadow-glow font-source"
          >
            <span>Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
