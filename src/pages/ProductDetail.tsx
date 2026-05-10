import React, { useState, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ShoppingBag, ChevronRight, Star, Minus, Plus, Share2, Info, ArrowLeft, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice, cn } from '../lib/utils';
import { ProductCard } from '../components/ProductCard';

export const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [selectedFlavor, setSelectedFlavor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'nutrition'>('details');
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the main image
  const { scrollYProgress } = useScroll({
    target: imageContainerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  const product = useMemo(() => PRODUCTS.find(p => p.id === id), [id]);
  const relatedProducts = useMemo(() => 
    PRODUCTS.filter(p => p.category === product?.category && p.id !== id).slice(0, 4),
    [product, id]
  );

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-diamond-cream">
        <div className="text-center">
          <h2 className="text-3xl font-serif text-diamond-brown mb-4">Product not found.</h2>
          <Link to="/menu" className="text-diamond-gold font-bold uppercase tracking-widest text-xs border-b border-diamond-gold pb-1">
             Back to Collection
          </Link>
        </div>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="bg-stone-50 min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center space-x-3 text-[10px] uppercase font-bold tracking-[0.2em] text-stone-400 mb-12">
          <Link to="/" className="hover:text-stone-900 transition-colors">Home</Link>
          <ChevronRight size={12} strokeWidth={3} />
          <Link to="/menu" className="hover:text-stone-900 transition-colors">Menu</Link>
          <ChevronRight size={12} strokeWidth={3} />
          <span className="text-stone-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div 
              ref={imageContainerRef}
              className="aspect-square bg-stone-100 rounded-[3rem] overflow-hidden shadow-2xl relative group"
            >
              <motion.img 
                style={{ y: imgY }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                src={product.image} 
                className="w-full h-[120%] -top-[10%] absolute left-0 object-cover" 
                alt={product.name}
                referrerPolicy="no-referrer"
              />
              <button 
                onClick={() => toggleWishlist(product)}
                className={cn(
                  "absolute top-8 right-8 p-4 glass rounded-full transition-all z-10",
                  isWishlisted ? "bg-rose-500 text-white border-rose-500 shadow-rose-500/20" : "text-diamond-brown hover:bg-diamond-brown hover:text-white"
                )}
              >
                <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} strokeWidth={isWishlisted ? 0 : 2} />
              </button>
            </div>
            {/* Asset Thumbnails mockup */}
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map(i => (
                 <div key={i} className="aspect-square rounded-2xl bg-stone-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-amber-700 transition-all opacity-60 hover:opacity-100">
                    <img src={product.image} className="w-full h-full object-cover" alt="Thumb" referrerPolicy="no-referrer" />
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6 inline-block">
                {product.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-serif text-stone-900 mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <span className="text-xs font-bold text-stone-400 uppercase tracking-widest">24 Verified Cravings</span>
              </div>
              <p className="text-3xl font-medium text-stone-900">{formatPrice(product.price)}</p>
            </div>

            <div className="mb-12">
               <p className={cn(
                 "text-stone-500 leading-relaxed text-lg transition-all duration-300",
                 !isExpanded && product.description.length > 200 && "line-clamp-3"
               )}>
                  {product.description}
               </p>
               {product.description.length > 200 && (
                 <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-amber-700 font-bold text-[10px] mt-2 uppercase tracking-[0.2em] hover:text-stone-900 transition-colors flex items-center gap-1"
                 >
                    {isExpanded ? 'Show Less' : 'Read More'}
                    <ChevronRight size={12} className={cn("transition-transform", isExpanded ? "-rotate-90" : "rotate-90")} />
                 </button>
               )}
            </div>

            {/* Config options */}
            <div className="space-y-10 mb-12 border-b border-stone-200 pb-12">
              {product.flavors && (
                <div className="space-y-4">
                  <h4 className="text-xs uppercase font-bold tracking-widest text-stone-900">Select Flavor Signature</h4>
                  <div className="flex flex-wrap gap-3">
                    {product.flavors.map(flavor => (
                      <button 
                        key={flavor}
                        onClick={() => setSelectedFlavor(flavor)}
                        className={cn(
                          "px-6 py-3 rounded-xl text-sm font-bold border-2 transition-all",
                          selectedFlavor === flavor 
                            ? "border-amber-700 bg-amber-50 text-amber-900" 
                            : "border-stone-100 text-stone-500 hover:border-stone-300"
                        )}
                      >
                        {flavor}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs uppercase font-bold tracking-widest text-stone-900">Choose Size</h4>
                    {product.sizes && !selectedSize && (
                      <span className="text-[10px] text-amber-700 font-bold animate-pulse">Required</span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.sizes.map(size => (
                      <label 
                        key={size}
                        className={cn(
                          "relative flex items-center justify-center px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest border-2 cursor-pointer transition-all",
                          selectedSize === size 
                            ? "border-amber-700 bg-amber-50 text-amber-900 shadow-lg shadow-amber-700/10" 
                            : "border-stone-100 text-stone-400 hover:border-stone-200 bg-white"
                        )}
                      >
                        <input 
                          type="radio"
                          name="size-selection"
                          value={size}
                          className="sr-only"
                          onChange={() => setSelectedSize(size)}
                          checked={selectedSize === size}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <h4 className="text-xs uppercase font-bold tracking-widest text-stone-900">Quantity</h4>
                <div className="flex items-center space-x-6">
                   <div className="flex items-center border border-stone-200 rounded-full p-2 bg-white shadow-sm">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 hover:text-amber-700 transition-colors">
                        <Minus size={18} />
                      </button>
                      <span className="w-12 text-center font-bold text-stone-900">{quantity}</span>
                      <button onClick={() => setQuantity(q => q + 1)} className="p-2 hover:text-amber-700 transition-colors">
                        <Plus size={18} />
                      </button>
                   </div>
                   <span className="text-xs text-stone-400 font-bold uppercase tracking-widest">
                      Total: {formatPrice(product.price * quantity)}
                   </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
               <button 
                onClick={() => addToCart(product, quantity, selectedFlavor, selectedSize)}
                className="flex-1 bg-stone-900 text-white rounded-full py-5 font-bold uppercase tracking-widest text-sm hover:bg-amber-700 transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95"
               >
                  <ShoppingBag size={20} />
                  <span>Add to Collection</span>
               </button>
               <button className="p-5 border-2 border-stone-100 rounded-full text-stone-900 hover:border-stone-900 transition-all flex items-center justify-center">
                  <Share2 size={24} />
               </button>
            </div>

            {/* Detailed Tabs */}
            <div className="border border-stone-200 rounded-3xl p-8 bg-white shadow-sm">
               <div className="flex space-x-8 border-b border-stone-100 mb-8 pb-4">
                  {['details', 'ingredients', 'nutrition'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={cn(
                        "text-[10px] uppercase font-bold tracking-widest transition-all",
                        activeTab === tab ? "text-amber-700 border-b border-amber-700" : "text-stone-400 hover:text-stone-900"
                      )}
                    >
                      {tab}
                    </button>
                  ))}
               </div>
               <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-stone-600 leading-relaxed h-[120px] overflow-y-auto pr-4"
                  >
                    {activeTab === 'details' && (
                      <div className="space-y-4">
                        <p>{product.description}</p>
                        <ul className="grid grid-cols-2 gap-2">
                           <li className="flex items-center space-x-2"><Star size={10} className="text-amber-500" /> <span>Diamond Standard</span></li>
                           <li className="flex items-center space-x-2"><Star size={10} className="text-amber-500" /> <span>Handcrafted</span></li>
                        </ul>
                      </div>
                    )}
                    {activeTab === 'ingredients' && (
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map(ing => (
                          <span key={ing} className="px-3 py-1 bg-stone-100 rounded-full text-[10px] font-bold uppercase tracking-wider text-stone-600">
                             {ing}
                          </span>
                        ))}
                      </div>
                    )}
                    {activeTab === 'nutrition' && (
                      <div className="grid grid-cols-2 gap-6">
                        <div className="flex justify-between border-b pb-2"><span>Calories</span> <b>{product.nutrition?.calories} kcal</b></div>
                        <div className="flex justify-between border-b pb-2"><span>Fat</span> <b>{product.nutrition?.fat}</b></div>
                        <div className="flex justify-between border-b pb-2"><span>Sugar</span> <b>{product.nutrition?.sugar}</b></div>
                        <div className="flex justify-between border-b pb-2"><span>Protein</span> <b>{product.nutrition?.protein}</b></div>
                      </div>
                    )}
                  </motion.div>
               </AnimatePresence>
            </div>
          </motion.div>
        </div>
        
        {/* Upsell / Related */}
        <div className="mt-32">
           <div className="flex justify-between items-end mb-12">
              <h2 className="text-3xl font-serif text-stone-900">Pairs Perfectly With.</h2>
              <Link to="/menu" className="text-xs font-bold uppercase tracking-widest text-amber-700">Explore All →</Link>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};
