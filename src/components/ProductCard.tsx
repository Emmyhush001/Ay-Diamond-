import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Zap, Heart, Eye, X, ChevronRight } from 'lucide-react';
import { type Product } from '../types';
import { formatPrice, cn } from '../lib/utils';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [showQuickView, setShowQuickView] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const isWishlisted = isInWishlist(product.id);
  
  // Subtle parallax effect on scroll
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

  return (
    <motion.div
      ref={cardRef}
      whileHover={{ y: -12, shadow: "0 25px 50px -12px rgba(62, 39, 35, 0.2)" }}
      className="group glass rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-2xl"
    >
      <div className="relative aspect-square overflow-hidden group/img">
        <motion.img
          style={{ y }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          src={product.image}
          alt={product.name}
          className="w-full h-[120%] -top-[10%] absolute left-0 object-cover transition-shadow duration-500 group-hover/img:shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
          referrerPolicy="no-referrer"
        />
        {/* Badges & Wishlist */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
            <div className="flex flex-col space-y-2">
                {product.isPopular && (
                  <span className="bg-diamond-gold text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center space-x-1 shadow-[0_4px_15px_rgba(212,175,55,0.4)] animate-glow">
                    <Star size={12} fill="currentColor" />
                    <span>Best Seller</span>
                  </span>
                )}
                {product.isLimited && (
                  <span className="bg-diamond-brown text-white text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-full flex items-center space-x-1 shadow-[0_4px_15px_rgba(50,40,30,0.3)]">
                    <Zap size={12} fill="currentColor" />
                    <span>Limited</span>
                  </span>
                )}
            </div>

            <button 
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              className={cn(
                "p-2.5 rounded-full glass transition-all duration-300 transform active:scale-90",
                isWishlisted ? "bg-rose-500 text-white border-rose-500 shadow-rose-500/20" : "text-diamond-brown hover:bg-diamond-brown hover:text-white"
              )}
            >
              <Heart size={14} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
            </button>
        </div>
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-stone-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3">
            <button 
               onClick={(e) => {
                 e.preventDefault();
                 addToCart(product);
               }}
               className="bg-gradient-to-r from-diamond-brown to-stone-900 text-white px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-2xl transform translate-y-6 group-hover:translate-y-0 transition-all duration-500 hover:scale-105 flex items-center space-x-3"
            >
                <ShoppingBag size={16} />
                <span>Quick Add</span>
            </button>
            <button 
               onClick={(e) => {
                 e.preventDefault();
                 setShowQuickView(true);
               }}
               className="bg-white/90 backdrop-blur-md text-diamond-brown px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl transform translate-y-8 group-hover:translate-y-0 transition-all duration-500 hover:bg-diamond-gold hover:text-white flex items-center space-x-3 delay-75"
            >
                <Eye size={16} />
                <span>Quick View</span>
            </button>
        </div>
      </div>

      <div className="p-8">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-serif text-xl font-bold text-diamond-brown mb-1 group-hover:text-diamond-gold transition-colors">
            {product.name}
          </h3>
          <p className="text-diamond-brown/40 text-[10px] font-black uppercase tracking-widest mb-4">
            {product.category}
          </p>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xl font-black text-diamond-brown whitespace-nowrap">
              {formatPrice(product.price)}
            </span>
            <button
               onClick={(e) => {
                 e.preventDefault();
                 addToCart(product);
               }}
               className="flex-1 bg-diamond-brown text-white py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-diamond-gold transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
            >
                <ShoppingBag size={12} />
                <span>Add to Cart</span>
            </button>
          </div>
        </Link>
      </div>

      <AnimatePresence>
        {showQuickView && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowQuickView(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-2xl h-full max-h-[600px]"
            >
              <button 
                onClick={() => setShowQuickView(false)}
                className="absolute top-6 right-6 z-10 p-2 bg-stone-100 hover:bg-stone-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-64 md:h-auto relative">
                <img src={product.image} className="w-full h-full object-cover" alt={product.name} referrerPolicy="no-referrer" />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {product.isPopular && <span className="bg-diamond-gold text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg">Best Seller</span>}
                  {product.isLimited && <span className="bg-diamond-brown text-white text-[9px] font-black uppercase px-3 py-1.5 rounded-full shadow-lg">Limited</span>}
                </div>
              </div>

              <div className="flex-1 p-10 overflow-y-auto">
                <div className="mb-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-diamond-gold mb-2">{product.category}</p>
                  <h2 className="text-3xl font-serif font-black text-diamond-brown mb-4">{product.name}</h2>
                  <p className="text-2xl font-black text-diamond-brown">{formatPrice(product.price)}</p>
                </div>

                <p className="text-stone-500 leading-relaxed mb-10 text-sm">{product.description}</p>

                <div className="space-y-8 mb-10">
                   {product.ingredients && (
                     <div>
                       <h4 className="text-[10px] font-black uppercase tracking-widest text-stone-900 mb-3">Key Ingredients</h4>
                       <div className="flex flex-wrap gap-2">
                         {product.ingredients.slice(0, 3).map(ing => (
                           <span key={ing} className="px-3 py-1 bg-stone-50 text-[10px] font-bold rounded-lg border border-stone-100">{ing}</span>
                         ))}
                         {product.ingredients.length > 3 && <span className="text-[10px] font-bold text-stone-400">+{product.ingredients.length - 3} more</span>}
                       </div>
                     </div>
                   )}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      addToCart(product);
                      setShowQuickView(false);
                    }}
                    className="flex-1 bg-diamond-brown text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-diamond-gold transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart</span>
                  </button>
                  <Link 
                    to={`/product/${product.id}`}
                    className="p-5 bg-stone-50 text-stone-400 rounded-2xl hover:text-diamond-brown hover:bg-stone-100 transition-all border border-stone-100"
                  >
                    <ChevronRight size={20} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
