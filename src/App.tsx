import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { ProductDetail } from './pages/ProductDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Catering } from './pages/Catering';
import { Admin } from './pages/Admin';
import { Wishlist } from './pages/Wishlist';
import { CustomCake } from './pages/CustomCake';

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="product/:id" element={<ProductDetail />} />
                <Route path="about" element={<About />} />
                <Route path="contact" element={<Contact />} />
                <Route path="cart" element={<Cart />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="catering" element={<Catering />} />
                <Route path="bespoke" element={<CustomCake />} />
                <Route path="admin" element={<Admin />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
