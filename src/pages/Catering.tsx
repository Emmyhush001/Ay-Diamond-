import React from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, Star, Clock, Users, Gift, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Catering: React.FC = () => {
  const packages = [
    {
      title: "The Ruby Soirée",
      price: "150,000",
      ideal: "Small Gatherings (15-20 Guests)",
      features: ["20 Signature Cupcakes", "15 Hand-dipped Doughnuts", "3L Bulk Gelato", "Premium Presentation Set"]
    },
    {
      title: "The Sapphire Wedding",
      price: "450,000",
      ideal: "Wedding Receptions (50-100 Guests)",
      features: ["3-Tier Diamond Signature Cake", "100 Mini Dessert Shooters", "Gourmet Sundae Bar", "On-site Server (3 Hours)"]
    },
    {
      title: "The Diamond Corporate",
      price: "850,000",
      ideal: "Gala & Business Events (200+ Guests)",
      features: ["Unlimited Milkshake Bar", "250 Assorted Pastries", "Bespoke Logo Branding", "Full Event Coordination"]
    }
  ];

  return (
    <div className="bg-stone-50 min-h-screen">
      {/* Hero */}
      <section className="relative h-[70vh] flex items-center justify-center text-center px-4 overflow-hidden">
         <div className="absolute inset-0 z-0 scale-105">
            <img src="https://images.unsplash.com/photo-1464349153735-7db50ed83c84?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover brightness-50" alt="Catering" referrerPolicy="no-referrer" />
         </div>
         <div className="relative z-10 max-w-4xl space-y-6">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="inline-block text-amber-500 font-bold uppercase tracking-[0.4em] text-xs"
            >
               Event & Wedding Catering
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-serif text-white uppercase italic"
            >
               Unforgettable Presence.
            </motion.h1>
            <p className="text-stone-300 text-lg max-w-2xl mx-auto">
               Elevate your special moments with our world-class dessert architecture. From corporate galas to intimate weddings.
            </p>
         </div>
      </section>

      {/* Packages */}
      <section className="py-32">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
               <h2 className="text-4xl font-serif text-stone-900 mb-4">Our Prestige Packages.</h2>
               <p className="text-stone-500">Tailored to fit your event size and aesthetic requirements.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {packages.map((pkg, i) => (
                 <motion.div 
                   key={i}
                   whileHover={{ y: -10 }}
                   className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-stone-100 flex flex-col items-center text-center relative overflow-hidden"
                 >
                    {i === 1 && (
                      <div className="absolute top-0 right-0 bg-amber-700 text-white px-6 py-2 rounded-bl-3xl text-[10px] font-bold uppercase tracking-widest">
                         Most Popular
                      </div>
                    )}
                    <div className="w-16 h-16 bg-stone-50 text-amber-700 rounded-full flex items-center justify-center mb-8">
                       <Gem size={28} strokeWidth={1} />
                    </div>
                    <h3 className="text-2xl font-serif text-stone-900 mb-2">{pkg.title}</h3>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-8">{pkg.ideal}</p>
                    <div className="text-3xl font-bold text-stone-900 mb-10">
                       <span className="text-lg align-top mr-1 underline decoration-amber-700 text-amber-800">₦</span>
                       {pkg.price}
                    </div>
                    <ul className="space-y-4 mb-12 flex-1 text-sm text-stone-600">
                       {pkg.features.map((f, j) => (
                         <li key={j} className="flex items-center space-x-2">
                            <Star size={12} className="text-amber-500 flex-shrink-0" />
                            <span>{f}</span>
                         </li>
                       ))}
                    </ul>
                    <button className="w-full bg-stone-900 text-white rounded-full py-4 font-bold uppercase tracking-widest text-xs hover:bg-amber-700 transition-all">
                       Reserve Package
                    </button>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* Process */}
      <section className="py-32 bg-stone-900 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                  <div className="space-y-6">
                      <div className="text-5xl font-serif text-stone-700">01</div>
                      <h4 className="text-xl font-serif">Consultation</h4>
                      <p className="text-stone-400 text-sm">We meet to understand your palette, event theme, and guest demographics.</p>
                  </div>
                  <div className="space-y-6">
                      <div className="text-5xl font-serif text-stone-700">02</div>
                      <h4 className="text-xl font-serif">The Tasting</h4>
                      <p className="text-stone-400 text-sm">An exclusive private session where you sample our artisanal collection.</p>
                  </div>
                  <div className="space-y-6">
                      <div className="text-5xl font-serif text-stone-700">03</div>
                      <h4 className="text-xl font-serif">Execution</h4>
                      <p className="text-stone-400 text-sm">Our team arrives on-site to build a diamond-standard dessert experience.</p>
                  </div>
              </div>
          </div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl opacity-30" />
      </section>

      {/* Final Form CTA */}
      <section className="py-32 bg-white">
          <div className="max-w-3xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-serif text-stone-900 mb-6">Tell us about your event.</h2>
              <p className="text-stone-500 mb-12">Our events director will contact you within 24 hours to begin your journey.</p>
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
                  <div className="text-left space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Date of Event</label>
                      <input type="date" className="w-full bg-stone-50 border border-stone-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-amber-700/20" />
                  </div>
                  <div className="text-left space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Guest Count</label>
                      <input type="number" placeholder="e.g. 100" className="w-full bg-stone-50 border border-stone-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-amber-700/20" />
                  </div>
                  <div className="sm:col-span-2 space-y-2 text-left">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Email Address</label>
                      <input type="email" placeholder="hello@example.com" className="w-full bg-stone-50 border border-stone-100 rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-amber-700/20" />
                  </div>
                  <button className="sm:col-span-2 bg-amber-700 text-white rounded-full py-5 font-bold uppercase tracking-widest text-sm hover:bg-amber-600 transition-all flex items-center justify-center space-x-3 shadow-xl">
                      <span>Begin Inquiry</span>
                      <ArrowRight size={18} />
                  </button>
              </form>
          </div>
      </section>
    </div>
  );
};
