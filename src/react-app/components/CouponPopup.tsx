import { useState } from 'react';
import { Gift, X } from 'lucide-react';

interface CouponPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CouponPopup({ isOpen, onClose }: CouponPopupProps) {
  const [applied, setApplied] = useState(false);

  const applyDiscount = () => {
    // Apply 10% discount to all products
    localStorage.setItem('lumina_discount_applied', 'true');
    localStorage.setItem('lumina_discount_code', 'GLOW10');
    setApplied(true);
    
    setTimeout(() => {
      onClose();
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white border border-lumina-200 shadow-glow max-w-md w-full animate-slide-up card-sharp">
          <div className="p-8 text-center">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-pink-50 transition-colors focus-ring"
              aria-label="Close popup"
            >
              <X className="w-5 h-5 text-secondary" />
            </button>

            {/* Gift icon */}
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-lumina-100 to-lumina-200 flex items-center justify-center card-sharp">
                <Gift className="w-8 h-8 text-lumina-600" />
              </div>
            </div>

            {/* Content */}
            <h3 className="text-headline-5 font-playfair font-semibold text-gray-800 mb-4">
              Welcome Gift
            </h3>
            <p className="text-body-1 text-secondary mb-6">
              Enjoy 10% off on your first order. Start your glow journey with us.
            </p>

            {applied && (
              <div className="bg-green-50 border border-green-200 p-4 mb-6 card-sharp">
                <p className="text-caption text-green-600 text-center">
                  Welcome! Ready to start shopping?
                </p>
              </div>
            )}

            {/* Action button */}
            <button
              onClick={applyDiscount}
              disabled={applied}
              className="w-full btn-primary py-3 px-6 transition-all duration-300 font-source font-medium"
            >
              {applied ? 'Happy Shopping! ✓' : "I'm ready to shop!"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
