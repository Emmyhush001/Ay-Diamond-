import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star, ChevronRight, Truck, ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../data/mockData';
import { ProductCard } from '../components/ProductCard';
import { FloatingParticles } from '../components/FloatingParticles';
import { Testimonials } from '../components/Testimonials';
import { PromoBanner } from '../components/PromoBanner';

export const Home: React.FC = () => {
  const bestSellers = PRODUCTS.filter(p => p.isPopular);

  return (
    <div className="flex flex-col relative z-10">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        <FloatingParticles />
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 pr-0 lg:pr-12"
          >
            <div className="inline-block px-4 py-1.5 bg-diamond-gold/10 text-diamond-gold rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 border border-diamond-gold/20">
               The 2024 Collection
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-black leading-[0.85] text-diamond-brown mb-10">
              Luxury <span className="text-diamond-gold">Desserts</span> <br/> 
              <span className="italic font-normal">Made to Melt Hearts.</span>
            </h1>
            <p className="text-lg text-diamond-brown/70 font-medium leading-relaxed mb-12 max-w-lg">
              Experience the diamond standard of sweetness. Handcrafted in Lagos with world-class ingredients and obsessive attention to detail.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <Link to="/menu" className="w-full sm:w-auto px-10 py-5 bg-diamond-brown text-white rounded-full font-bold shadow-2xl hover:scale-105 transition-transform text-xs uppercase tracking-widest text-center">
                Shop the Collection
              </Link>
              <Link to="/catering" className="w-full sm:w-auto px-10 py-5 bg-white/50 backdrop-blur-md border border-diamond-brown/10 text-diamond-brown rounded-full font-bold shadow-lg hover:bg-white/80 transition-all text-xs uppercase tracking-widest text-center">
                Book Event Catering
              </Link>
            </div>
          </motion.div>

          {/* Visual Showcase (Frosted UI representation) */}
          <div className="lg:col-span-6 relative h-[500px] lg:h-[600px] hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[500px] rounded-[40px] bg-gradient-to-b from-white/80 to-white/40 p-4 shadow-[0_50px_100px_-20px_rgba(62,39,35,0.15)] border border-white/60 overflow-hidden backdrop-blur-sm"
            >
              <div className="w-full h-full rounded-[30px] bg-diamond-beige/30 relative overflow-hidden flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=800"
                  className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40"
                  alt="Hero Background"
                  referrerPolicy="no-referrer"
                />
                <div className="text-center z-10">
                  <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative text-9xl mb-4"
                  >
                    🍰
                  </motion.div>
                  <div className="font-serif text-3xl font-bold text-diamond-brown">Gold-Leaf Velvet</div>
                  <div className="mt-2 text-[10px] tracking-widest uppercase text-diamond-gold font-black">Signature Masterpiece</div>
                </div>
                
                {/* Floating Badge */}
                <div className="absolute top-8 right-8 w-20 h-20 rounded-full bg-white/60 backdrop-blur-xl border border-white flex flex-col items-center justify-center text-diamond-brown shadow-lg">
                  <span className="text-[10px] uppercase font-black">Just</span>
                  <span className="text-xl font-serif font-black">Fresh</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Bubble 1 */}
            <motion.div 
              animate={{ y: [0, 20, 0], rotate: [12, 15, 12] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-[10%] right-[5%] w-32 h-32 rounded-3xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl flex flex-col items-center justify-center p-4 text-center"
            >
               <div className="text-3xl mb-1">🍦</div>
               <div className="text-[10px] font-bold uppercase text-diamond-brown/60 leading-none">Velvet Scoop</div>
               <div className="text-sm font-black text-diamond-brown">₦4,500</div>
            </motion.div>

            {/* Floating Bubble 2 */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [-12, -8, -12] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-[10%] left-[5%] w-36 h-36 rounded-full bg-diamond-brown text-white shadow-2xl flex flex-col items-center justify-center p-4 text-center"
            >
               <div className="text-2xl mb-1 italic font-serif">Top-Rated</div>
               <div className="text-[8px] tracking-[0.2em] font-medium opacity-70 uppercase">1,200+ REVIEWS</div>
               <div className="flex mt-2 gap-0.5 text-diamond-gold">
                  { [...Array(5)].map((_, i) => <Star key={i} size={10} fill="currentColor" />) }
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Trust Bar */}
      <section className="py-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="glass rounded-[2rem] p-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                      { icon: Star, label: "Premium Ingredients", sub: "Global Sourcing" },
                      { icon: Truck, label: "Fast Delivery", sub: "Lagos Territory" },
                      { icon: ShieldCheck, label: "Trusted Quality", sub: "Since 2021" },
                      { icon: Heart, label: "Handcrafted", sub: "Diamond Precision" },
                  ].map((item, i) => (
                      <div key={i} className="flex flex-col items-center text-center space-y-2">
                          <item.icon className="text-diamond-gold" size={24} strokeWidth={2} />
                          <h4 className="text-diamond-brown font-black text-[10px] uppercase tracking-widest">{item.label}</h4>
                          <p className="text-diamond-brown/40 text-[8px] uppercase tracking-[0.2em] font-bold">{item.sub}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <PromoBanner 
                variant="gold"
                title="Savor the Season with"
                highlight="20% Off Your First Order"
                subtitle="Join the diamond circle and experience luxury desserts delivered right to your doorstep. Use code WELCOME20 at checkout."
                ctaText="Claim Your Discount"
                ctaLink="/menu"
              />
          </div>
      </section>

      {/* Featured Section */}
      <section className="py-32 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 space-y-6 md:space-y-0">
            <div className="max-w-xl">
              <span className="text-amber-700 font-bold uppercase tracking-widest text-xs mb-4 block">Our Icons</span>
              <h2 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
                Diamond Gems <br />
                <span className="text-stone-400 italic">The Best Sellers</span>
              </h2>
            </div>
            <Link to="/menu" className="group flex items-center space-x-2 text-stone-900 font-bold uppercase tracking-widest text-sm border-b-2 border-amber-700/30 pb-2 hover:border-amber-700 transition-all">
              <span>View Full Menu</span>
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual Addiction Section (Mosaic) */}
      <section className="py-32 bg-white flex flex-col items-center">
          <div className="max-w-2xl text-center px-4 mb-20">
              <h2 className="text-4xl font-serif text-stone-900 mb-6">Designed to be Instagrammed.</h2>
              <p className="text-stone-500 leading-relaxed">
                  Our desserts aren't just food; they're experiences. Every layer, glaze, and topping is placed with aesthetic perfection in mind.
              </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full h-[600px] px-4">
              <div className="col-span-2 row-span-2 overflow-hidden rounded-3xl group">
                  <img src="https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mosaic 1" referrerPolicy="no-referrer" />
              </div>
              <div className="overflow-hidden rounded-3xl group">
                  <img src="https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mosaic 2" referrerPolicy="no-referrer" />
              </div>
              <div className="overflow-hidden rounded-3xl group">
                  <img src="https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mosaic 3" referrerPolicy="no-referrer" />
              </div>
              <div className="col-span-2 overflow-hidden rounded-3xl group">
                  <img src="https://images.unsplash.com/photo-1514843319018-8740c0f86641?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Mosaic 4" referrerPolicy="no-referrer" />
              </div>
          </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
             <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1920" alt="Cafe" className="w-full h-full object-cover brightness-50" referrerPolicy="no-referrer" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center text-white">
              <h2 className="text-4xl md:text-7xl font-serif mb-12">One bite and <br /> you're obsessed.</h2>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <Link to="/menu" className="bg-amber-700 text-white px-12 py-6 rounded-full font-bold tracking-widest uppercase text-sm hover:bg-amber-600 transition-all shadow-2xl">
                      Order Your Bliss
                  </Link>
                  <Link to="/contact" className="bg-white/20 backdrop-blur-md text-white px-12 py-6 rounded-full font-bold tracking-widest uppercase text-sm border border-white/30 hover:bg-white/30 transition-all">
                      Find a Boutique
                  </Link>
              </div>
          </div>
      </section>
    </div>
  );
};
