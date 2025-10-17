import { useState } from 'react';
import { X } from 'lucide-react';

export default function AnnouncementStrip() {
  const [isVisible, setIsVisible] = useState(() => {
    return !localStorage.getItem('lumina_announcement_dismissed');
  });
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('lumina_announcement_dismissed', 'true');
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div className={`bg-gradient-to-r from-lumina-50 to-lumina-100 border-b border-lumina-200/50 ${isClosing ? 'animate-slide-out-up' : 'animate-slide-down'}`}>
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <p className="text-body-2 text-primary-dark font-medium font-source">
              First order delivery on us 🚚 Free shipping for new customers
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-lumina-200/50 transition-colors focus-ring"
            aria-label="Close announcement"
          >
            <X className="w-4 h-4 text-primary-dark" />
          </button>
        </div>
      </div>
    </div>
  );
}
