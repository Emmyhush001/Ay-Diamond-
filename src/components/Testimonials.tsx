import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { REVIEWS } from '../data/mockData';

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-diamond-gold/10 text-diamond-gold rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-diamond-gold/20"
          >
            Voice of the Connoisseurs
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-black text-diamond-brown"
          >
            Sweet <span className="text-diamond-gold">Testimonies</span>
          </motion.h2>
        </div>

        <div className="relative glass rounded-[3rem] p-8 md:p-16 min-h-[400px] flex flex-col items-center justify-center text-center">
          <div className="absolute top-10 left-10 md:top-16 md:left-16 text-diamond-gold/20">
            <Quote size={80} strokeWidth={1} />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 space-y-8"
            >
              <div className="flex justify-center gap-1 text-diamond-gold mb-6">
                {[...Array(REVIEWS[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl font-serif text-diamond-brown leading-relaxed italic">
                "{REVIEWS[currentIndex].comment}"
              </p>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-diamond-gold flex items-center justify-center text-white font-serif text-xl font-bold italic shadow-xl mb-4 border-2 border-white/50">
                   {REVIEWS[currentIndex].userName.charAt(0)}
                </div>
                <h4 className="text-sm font-black uppercase tracking-widest text-diamond-brown">
                  {REVIEWS[currentIndex].userName}
                </h4>
                <p className="text-[10px] font-bold text-diamond-brown/40 uppercase tracking-[0.3em]">
                   Verified Connoisseur
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="absolute inset-x-0 bottom-8 flex justify-center items-center gap-6">
             <button 
               onClick={prev}
               className="p-3 glass rounded-full text-diamond-brown hover:bg-diamond-brown hover:text-white transition-all transform active:scale-90"
             >
               <ChevronLeft size={20} />
             </button>
             
             {/* Indicators */}
             <div className="flex gap-2">
                {REVIEWS.map((_, i) => (
                  <div 
                    key={i}
                    className={`h-1.5 transition-all duration-300 rounded-full ${i === currentIndex ? 'w-8 bg-diamond-brown' : 'w-1.5 bg-diamond-brown/10'}`}
                  />
                ))}
             </div>

             <button 
               onClick={next}
               className="p-3 glass rounded-full text-diamond-brown hover:bg-diamond-brown hover:text-white transition-all transform active:scale-90"
             >
               <ChevronRight size={20} />
             </button>
          </div>
        </div>
      </div>
    </section>
  );
};
