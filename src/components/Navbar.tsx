import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Facebook, Phone, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const location = useLocation();

  const navLinks = [
    { name: 'Menu', href: '/menu' },
    { name: 'Bespoke', href: '/bespoke' },
    { name: 'About', href: '/about' },
    { name: 'Catering', href: '/catering' },
    { name: 'Contact', href: '/contact' },
  ];

  const adminLink = { name: 'Admin', href: '/admin' };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-diamond-gold rounded-full flex items-center justify-center text-white font-serif font-bold italic shadow-lg group-hover:scale-110 transition-transform">
              AY
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter uppercase text-diamond-brown">
                DIAMOND <span className="font-light opacity-60">Pastries</span>
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "transition-colors hover:text-diamond-gold",
                  location.pathname === link.href ? "text-diamond-gold" : "text-diamond-brown"
                )}
              >
                {link.name}
              </Link>
            ))}
            <Link to={adminLink.href} className="text-[10px] opacity-40 hover:opacity-100 transition-opacity">
               {adminLink.name}
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link to="/wishlist" className="relative p-2 text-diamond-brown hover:text-diamond-gold transition-colors hidden sm:block">
              <Heart size={22} strokeWidth={2} />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 bg-rose-500 text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative p-2 text-diamond-brown hover:text-diamond-gold transition-colors">
              <ShoppingBag size={22} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-diamond-brown text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-lg border-2 border-white/50">
                  {totalItems}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-diamond-brown"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-serif text-stone-800 hover:text-amber-700"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-lg font-serif text-stone-800 hover:text-amber-700 flex items-center justify-between"
                >
                  <span>Wishlist</span>
                  {wishlistCount > 0 && <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full text-xs">{wishlistCount}</span>}
              </Link>
              <div className="pt-4 flex items-center space-x-6 text-stone-500">
                <Instagram size={20} />
                <Facebook size={20} />
                <Phone size={20} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
