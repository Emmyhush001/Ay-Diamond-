import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Sparkles, ChefHat } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
         <div className="absolute inset-0 z-0">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover brightness-50" alt="Kitchen" referrerPolicy="no-referrer" />
         </div>
         <div className="relative z-10 text-center text-white">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-serif mb-6"
            >
                Crafting Perfection.
            </motion.h1>
            <p className="text-amber-200 font-bold uppercase tracking-[0.4em] text-xs">Our Diamond Philosophy</p>
         </div>
      </section>

      {/* Story */}
      <section className="py-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
               <div className="space-y-10">
                  <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">Driven by obsession, <br /> <span className="text-stone-400 italic">defined by quality.</span></h2>
                  <p className="text-stone-600 text-lg leading-relaxed">
                      Founded in 2021 by a team of pastry visionaries in Lagos, AY Diamond was born from a simple yet radical idea: that every dessert should be a luxury asset.
                  </p>
                  <p className="text-stone-600 text-lg leading-relaxed">
                      We don't just bake; we architect. From the precise temperature of our tempering chocolate to the specific hydration levels of our brioche dough, we obsess over every micron of flavor and texture.
                  </p>
                  <div className="grid grid-cols-2 gap-8 pt-10">
                      <div className="space-y-2">
                          <h4 className="text-stone-900 font-bold text-2xl font-serif">100%</h4>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400">Natural Ingredients</p>
                      </div>
                      <div className="space-y-2">
                          <h4 className="text-stone-900 font-bold text-2xl font-serif">50k+</h4>
                          <p className="text-[10px] uppercase tracking-widest text-stone-400">Smiles Delivered</p>
                      </div>
                  </div>
               </div>
               <div className="relative">
                  <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl relative z-10">
                      <img src="https://images.unsplash.com/photo-1560184897-67f4a3f9a7fa?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Chef" referrerPolicy="no-referrer" />
                  </div>
                  <div className="absolute -top-12 -right-12 w-64 h-64 bg-amber-50 rounded-full -z-0" />
                  <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-stone-100 rounded-full -z-0" />
               </div>
            </div>
         </div>
      </section>

      {/* Pillars */}
      <section className="py-32 bg-stone-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  {[
                      { icon: Sparkles, title: "Artisanal Execution", desc: "Every item is handcrafted daily with precision tools and artisanal techniques." },
                      { icon: Heart, title: "Emotional Flavor", desc: "We design flavors to trigger memories, comfort, and pure visceral joy." },
                      { icon: ChefHat, title: "Expert Mastery", desc: "Our chefs come with decades of experience in high-end European patisseries." },
                  ].map((pillar, i) => (
                      <div key={i} className="text-center space-y-6">
                          <div className="inline-flex p-6 rounded-full bg-white shadow-xl text-amber-700">
                             <pillar.icon size={32} strokeWidth={1} />
                          </div>
                          <h3 className="text-2xl font-serif text-stone-900">{pillar.title}</h3>
                          <p className="text-stone-500 leading-relaxed text-sm">{pillar.desc}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>
    </div>
  );
};
