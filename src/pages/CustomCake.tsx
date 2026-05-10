import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Cake, Calendar, Palette, Scale, AlertCircle, CheckCircle2, ChevronRight, Upload } from 'lucide-react';
import { cn } from '../lib/utils';

export const CustomCake: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/20"
        >
           <CheckCircle2 size={48} className="text-white" />
        </motion.div>
        <h2 className="text-4xl font-serif text-diamond-brown mb-4 font-black">Request Received.</h2>
        <p className="text-diamond-brown/60 mb-8 text-center max-w-sm font-medium leading-relaxed">
          Your Diamond Bespoke request has been sent to our master pastry chefs. We will contact you within 24 hours to discuss your masterpiece.
        </p>
        <button 
          onClick={() => setIsSubmitted(false)}
          className="bg-diamond-brown text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-diamond-gold transition-all shadow-xl"
        >
          Return to Bespoke
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          <div className="lg:col-span-7">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-diamond-gold font-black uppercase tracking-[0.3em] text-[10px] mb-4 block"
            >
              Diamond Bespoke
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-serif font-black text-diamond-brown leading-[0.85] mb-8"
            >
              Cakes Built <br/> <span className="text-diamond-gold">For Legends.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-diamond-brown/70 font-medium leading-relaxed max-w-xl"
            >
              Collaborate with our award-winning artisans to create a centerpiece that defines your event. From avant-garde architectural designs to timeless floral elegance.
            </motion.p>
          </div>
          <div className="lg:col-span-5 relative h-[400px]">
             <motion.div 
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               className="w-full h-full glass rounded-[3rem] overflow-hidden p-4"
             >
                <div className="w-full h-full rounded-[2.5rem] bg-diamond-beige/20 relative overflow-hidden flex items-center justify-center">
                  <span className="text-[12rem] opacity-20 filter grayscale">🎂</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-diamond-brown/40 to-transparent" />
                  <div className="absolute bottom-10 left-10 text-white">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-1">Featured Masterpiece</p>
                    <h3 className="text-2xl font-serif font-bold italic">The Midnight Gold</h3>
                  </div>
                </div>
             </motion.div>
          </div>
        </div>

        {/* Order Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="glass rounded-[3rem] p-8 md:p-16 space-y-12">
            
            {/* Section 1: Occasion & Date */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-diamond-gold mb-6">
                <Calendar size={24} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Chronology & Purpose</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/50 ml-4">Event Date</label>
                  <input 
                    required
                    type="date" 
                    className="w-full bg-white/50 border border-diamond-brown/10 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-diamond-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/50 ml-4">Occasion</label>
                  <select className="w-full bg-white/50 border border-diamond-brown/10 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-diamond-gold transition-colors appearance-none">
                    <option>Wedding</option>
                    <option>Corporate Gala</option>
                    <option>Birthday Milestone</option>
                    <option>Anniversary</option>
                    <option>Private Indulgence</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 2: Specifications */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-diamond-gold mb-6">
                <Scale size={24} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Specifications</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/50 ml-4">Servings (Est.)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="E.g. 50"
                    className="w-full bg-white/50 border border-diamond-brown/10 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-diamond-gold transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/50 ml-4">Flavor Profile</label>
                  <select className="w-full bg-white/50 border border-diamond-brown/10 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-diamond-gold transition-colors appearance-none">
                    <option>Signature Vanilla Gold</option>
                    <option>70% Belgian Dark Chocolate</option>
                    <option>Red Velvet Diamond</option>
                    <option>Pistachio Rose Heritage</option>
                    <option>Salted Caramel Silk</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 3: Design & Inspiration */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-diamond-gold mb-6">
                <Palette size={24} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Design Vision</h3>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-diamond-brown/50 ml-4">Design Brief</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe your aesthetic vision, color palette, or architectural themes..."
                    className="w-full bg-white/50 border border-diamond-brown/10 rounded-[2rem] px-8 py-6 text-xs font-medium leading-relaxed focus:outline-none focus:border-diamond-gold transition-colors"
                  />
                </div>
                <div className="p-10 border-2 border-dashed border-diamond-brown/10 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-diamond-gold/50 transition-colors cursor-pointer group">
                   <div className="w-16 h-16 glass rounded-full flex items-center justify-center text-diamond-brown group-hover:text-diamond-gold transition-colors">
                     <Upload size={24} />
                   </div>
                   <div>
                     <p className="text-xs font-black uppercase tracking-widest">Upload Inspiration</p>
                     <p className="text-[10px] text-diamond-brown/40 uppercase tracking-widest mt-1">Images, Moodboards, or Sketches (Max 10MB)</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Section 4: Dietary & Special Requirements */}
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-diamond-gold mb-6">
                <AlertCircle size={24} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">Special Requirements</h3>
              </div>
              <div className="space-y-6">
                <div className="flex flex-wrap gap-4">
                  {['Gluten-Free', 'Nut-Free', 'Vegan', 'Caffeine-Free'].map((tag) => (
                    <label key={tag} className="group relative flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="peer hidden" />
                      <div className="px-6 py-2 glass rounded-full text-[10px] font-black uppercase tracking-widest transition-all peer-checked:bg-diamond-brown peer-checked:text-white">
                        {tag}
                      </div>
                    </label>
                  ))}
                </div>
                <input 
                  type="text" 
                  placeholder="Additional Dietary Concerns..."
                  className="w-full bg-white/50 border border-diamond-brown/10 rounded-full px-8 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-diamond-gold transition-colors"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-8">
               <button 
                type="submit"
                className="w-full bg-diamond-brown text-white py-6 rounded-full font-black uppercase tracking-[0.3em] text-xs hover:bg-diamond-gold transition-all shadow-2xl flex items-center justify-center gap-4 group"
               >
                 <span>Initiate Diamond Request</span>
                 <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
               </button>
               <p className="text-center mt-6 text-[9px] uppercase font-black tracking-[0.2em] text-diamond-brown/30">
                 Our concierge will respond within one business cycle.
               </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
