import { Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would integrate with an email service
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="bg-gradient-to-br from-pink-50 to-peach-50 border-t border-pink-100 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <img 
              src="https://mocha-cdn.com/0199e222-1be9-72bc-aa82-20c4d89a63a8/lumina-high-resolution-logo-transparent.png" 
              alt="Lumina" 
              className="h-10 w-auto mb-6"
            />
            <p className="text-body-2 text-secondary mb-6 leading-relaxed font-source">
              A modern fashion store inspired by minimal design and soft aesthetics. Every piece is curated to bring warmth, confidence, and simplicity to your everyday look.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="text-headline-6 font-semibold text-gray-800 mb-4 font-source">Stay in the Glow</h3>
              <form onSubmit={handleNewsletterSubmit} className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 border border-pink-200 focus:border-pink-400 focus:outline-none transition-colors text-body-2 focus-ring font-source"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-lumina-200 to-lumina-300 hover:from-lumina-300 hover:to-lumina-400 text-gray-800 transition-all duration-300 font-source"
                >
                  {subscribed ? 'Subscribed!' : 'Join'}
                </button>
              </form>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="p-2 hover:bg-pink-100 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5 text-secondary hover:text-pink-600 transition-colors" />
              </a>
              <a href="#" className="p-2 hover:bg-pink-100 transition-colors" aria-label="Pinterest">
                <svg className="w-5 h-5 text-secondary hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.374 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.219-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.001 24c6.624 0 11.999-5.375 11.999-12C24 5.374 18.626.001 12.001.001z"/>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-pink-100 transition-colors" aria-label="TikTok">
                <svg className="w-5 h-5 text-secondary hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
              <a href="#" className="p-2 hover:bg-pink-100 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5 text-secondary hover:text-pink-600 transition-colors" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="text-headline-6 font-semibold text-gray-800 mb-6 font-source">Shop</h3>
            <div className="space-y-3">
              <a href="/products?new=true" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                New Arrivals
              </a>
              <a href="/tops?subcategory=Tees" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Women
              </a>
              <a href="/outerwear?subcategory=Hoodies" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Men
              </a>
              <a href="/accessories?subcategory=Bags" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Accessories
              </a>
              <a href="/products?sale=true" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Sale
              </a>
              <a href="/gift-cards" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Gift Cards
              </a>
            </div>
          </div>

          {/* Support & Policies */}
          <div>
            <h3 className="text-headline-6 font-semibold text-gray-800 mb-6 font-source">Support & Policies</h3>
            <div className="space-y-3">
              <a href="/contact" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Contact Us
              </a>
              <a href="/shipping" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Shipping & Delivery
              </a>
              <a href="/returns" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Returns & Exchanges
              </a>
              <a href="/size-guide" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Size Guide
              </a>
              <a href="/privacy" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Privacy Policy
              </a>
              <a href="/terms" className="block text-body-2 text-secondary hover:text-primary-dark transition-colors font-source">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-pink-200 pt-8">
          <div className="text-center">
            <p className="text-caption text-secondary font-source">
              © 2025 Lumina. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
