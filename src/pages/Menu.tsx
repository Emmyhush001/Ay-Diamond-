import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, SlidersHorizontal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/mockData';
import { Category } from '../types';
import { ProductCard } from '../components/ProductCard';
import { PromoBanner } from '../components/PromoBanner';
import { cn } from '../lib/utils';

export const Menu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', ...Object.values(Category)];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Header */}
      <section className="bg-white border-b border-stone-100 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-amber-700 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block"
          >
            Digital Patisserie
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-serif text-stone-900 mb-12"
          >
            The Collection.
          </motion.h1>

          <div className="max-w-3xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-amber-700 transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search for your next obsession..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-stone-50 border border-stone-100 rounded-full py-6 pl-16 pr-8 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:bg-white transition-all shadow-sm focus:shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Categories & Filter Bar */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-stone-100 py-4 scrollbar-hide overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category as any)}
              className={cn(
                "whitespace-nowrap px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                activeCategory === category 
                  ? "bg-amber-700 text-white shadow-lg" 
                  : "text-stone-500 hover:bg-stone-100 hover:text-stone-900"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Promotion Section */}
      <section className="pt-12 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PromoBanner 
              variant="dark"
              title="Indulge in our"
              highlight="Diamond Wedding Package"
              subtitle="Planning a grand celebration? Our bespoke dessert towers and gold-leaf cakes are designed to steal the show. Get a free consultation today."
              ctaText="Enquire Now"
              ctaLink="/catering"
            />
        </div>
      </section>

      {/* Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    layout
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40"
              >
                <div className="inline-block p-6 rounded-full bg-stone-100 mb-6 text-stone-400">
                   <SlidersHorizontal size={40} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-serif text-stone-900 mb-2">No matching gems found.</h3>
                <p className="text-stone-500 mb-8">Try adjusting your filters or search keywords.</p>
                <button 
                  onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
                  className="text-amber-700 font-bold uppercase tracking-widest text-xs border-b-2 border-amber-700 pb-1"
                >
                  Clear All Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Bottom CTA for Event Catering */}
      <section className="bg-stone-900 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-white text-3xl font-serif mb-8">Host an unforgettable celebration.</h2>
              <Link to="/catering" className="inline-flex items-center space-x-3 bg-white text-stone-900 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-600 hover:text-white transition-all shadow-2xl group">
                  <span>Explore Catering Packages</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
      </section>
    </div>
  );
};
