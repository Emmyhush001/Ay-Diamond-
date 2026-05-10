import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SupportHub } from './SupportHub';
import { motion, AnimatePresence } from 'motion/react';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-diamond-cream overflow-x-hidden font-sans selection:bg-diamond-gold/30 selection:text-diamond-brown relative">
      {/* Background Mesh Gradient */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-diamond-pink blur-[120px] opacity-60"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-diamond-beige blur-[120px] opacity-60"></div>
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-diamond-gold blur-[150px] opacity-20"></div>
      </div>

      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative z-10 pt-20"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
      
      <SupportHub />
      
      {/* Ticker Footer (Themelift) */}
      <div className="relative z-20 h-16 bg-diamond-brown text-white flex items-center overflow-hidden border-t border-white/10">
        <div className="flex whitespace-nowrap gap-20 animate-marquee items-center text-[10px] font-bold tracking-[0.3em] uppercase opacity-80">
          <span>✨ Luxury Desserts Made to Order</span>
          <span className="text-diamond-gold">💎 Lagos Most Instagrammable Bakery</span>
          <span>🍦 24 Signature Flavors of Ice Cream</span>
          <span className="text-diamond-gold">🎁 Nationwide Premium Gifting</span>
          {/* Duplicate for seamless loop */}
          <span>✨ Luxury Desserts Made to Order</span>
          <span className="text-diamond-gold">💎 Lagos Most Instagrammable Bakery</span>
          <span>🍦 24 Signature Flavors of Ice Cream</span>
          <span className="text-diamond-gold">🎁 Nationwide Premium Gifting</span>
        </div>
      </div>

      {/* Sticky WhatsApp Floating CTA */}
      <a 
        href="https://wa.me/2349161425463" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-40 bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center space-x-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-bold tracking-wide">
          Order on WhatsApp
        </span>
        <svg fill="currentColor" width="24" height="24" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.011 0-3.986-.51-5.736-1.478l-6.057 1.59zm6.097-3.638l.343.204c1.47.873 3.161 1.334 4.888 1.334 5.231 0 9.491-4.259 9.491-9.491 0-2.535-1.01-4.919-2.845-6.756-1.834-1.836-4.221-2.847-6.752-2.847-5.232 0-9.493 4.261-9.493 9.491 0 1.954.544 3.86 1.572 5.52l.224.363-.99 3.612 3.612-.947zm9.734-6.662c-.22-.11-1.3-.642-1.503-.715-.203-.074-.351-.11-.5.11-.149.221-.577.715-.705.86-.129.147-.258.165-.478.055-.221-.11-.933-.344-1.776-1.096-.657-.586-1.1-.1.309-1.341-.122.148-.258-.02-.479-.131-.22-.11-1.3-.641-1.53-.762-.23-.121-.383-.176-.554.08-.171.258-.66.86-.809 1.03-.15.171-.3.195-.519.085s-.946-.35-1.802-1.119c-.665-.597-1.114-1.335-1.245-1.556-.13-.221-.014-.341.096-.45.1-.1.22-.258.33-.388.11-.129.148-.221.223-.37.074-.147.037-.276-.018-.387-.056-.11-.5-.1.221-.685-.45-.184-.23-.277-.66-.351-.775-.074-.074-.149-.074-.3-.074s-.35.055-.533.258c-.182.203-1.018.995-1.018 2.426 0 1.431.54 2.813 1.066 3.551.52.738 2.037 3.111 4.935 4.363.689.298 1.227.476 1.646.609.693.22 1.324.19 1.823.115.556-.084 1.708-.698 1.951-1.371.243-.672.243-1.248.17-1.371-.073-.124-.268-.204-.488-.314z"/></svg>
      </a>
    </div>
  );
};
