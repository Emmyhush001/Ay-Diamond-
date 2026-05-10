import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const Wishlist: React.FC = () => {
  const { wishlist, wishlistCount } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 relative z-10">
        <div className="w-24 h-24 glass rounded-full flex items-center justify-center mb-8">
           <Heart size={40} className="text-diamond-brown/20" strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-serif text-diamond-brown mb-4 font-black">Your wishlist is empty.</h2>
        <p className="text-diamond-brown/50 mb-8 text-center max-w-sm font-medium">
          Save your favorite Diamond masterpieces here for a future indulgence.
        </p>
        <Link to="/menu" className="bg-diamond-brown text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-diamond-gold transition-all shadow-xl">
          Discover Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
           <div className="max-w-xl">
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-diamond-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
              >
                Curated Indulgence
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-serif font-black text-diamond-brown"
              >
                Wishlist<span className="text-diamond-brown/20 font-sans ml-4 text-3xl font-light">({wishlistCount})</span>
              </motion.h1>
           </div>
           <Link to="/menu" className="group flex items-center space-x-2 text-diamond-brown font-black uppercase tracking-widest text-[10px] border-b-2 border-diamond-gold/30 pb-2 hover:border-diamond-gold transition-all">
              <span>Continue Exploring</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
           </Link>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence>
            {wishlist.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                layout
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
