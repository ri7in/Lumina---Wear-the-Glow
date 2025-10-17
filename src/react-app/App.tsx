import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from '@getmocha/users-service/react';
import { CartProvider } from '@/react-app/hooks/useCart';
import HomePage from "@/react-app/pages/Home";
import ProductsPage from "@/react-app/pages/Products";
import ProductDetailPage from "@/react-app/pages/ProductDetail";
import CartPage from "@/react-app/pages/Cart";
import CheckoutPage from "@/react-app/pages/Checkout";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import CategoryTopsPage from "@/react-app/pages/CategoryTops";
import CategoryBottomsPage from "@/react-app/pages/CategoryBottoms";
import CategoryOuterwearPage from "@/react-app/pages/CategoryOuterwear";
import CategoryDressesPage from "@/react-app/pages/CategoryDresses";
import CategoryAccessoriesPage from "@/react-app/pages/CategoryAccessories";
import Header from "@/react-app/components/Header";
import CartSidebar from "@/react-app/components/CartSidebar";
import AnnouncementStrip from "@/react-app/components/AnnouncementStrip";
import Footer from "@/react-app/components/Footer";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white font-source">
            <AnnouncementStrip />
            <Header />
            <CartSidebar />
            <main className="bg-white">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />
                <Route path="/tops" element={<CategoryTopsPage />} />
                <Route path="/bottoms" element={<CategoryBottomsPage />} />
                <Route path="/outerwear" element={<CategoryOuterwearPage />} />
                <Route path="/dresses" element={<CategoryDressesPage />} />
                <Route path="/accessories" element={<CategoryAccessoriesPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/auth/callback" element={<AuthCallbackPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
