import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Send, Instagram, Facebook, Clock } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });

  return (
    <div className="bg-stone-50 min-h-screen pb-32">
      <section className="bg-white pt-32 pb-20 border-b border-stone-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <span className="text-amber-700 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Get In Touch</span>
              <h1 className="text-5xl md:text-7xl font-serif text-stone-900">Contact Us.</h1>
          </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Form */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-[2rem] p-12 shadow-sm border border-stone-100"
              >
                  <h2 className="text-3xl font-serif text-stone-900 mb-8">Send a Message</h2>
                  <form className="space-y-6">
                      <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Full Name</label>
                          <input 
                            type="text" 
                            className="w-full bg-stone-50 border border-stone-100 rounded-xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all"
                            placeholder="John Doe"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Email Address</label>
                          <input 
                            type="email" 
                            className="w-full bg-stone-50 border border-stone-100 rounded-xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all"
                            placeholder="john@example.com"
                          />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Inquiry Type</label>
                          <select className="w-full bg-stone-50 border border-stone-100 rounded-xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all appearance-none cursor-pointer">
                              <option>General Inquiry</option>
                              <option>Event Catering</option>
                              <option>Bulk Order</option>
                              <option>Partnership</option>
                          </select>
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Your Message</label>
                          <textarea 
                            rows={5}
                            className="w-full bg-stone-50 border border-stone-100 rounded-xl px-6 py-4 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-700/20 transition-all"
                            placeholder="Tell us what you're craving..."
                          />
                      </div>
                      <button className="w-full bg-stone-900 text-white rounded-full py-5 font-bold uppercase tracking-widest text-sm hover:bg-amber-700 transition-all flex items-center justify-center space-x-3 shadow-xl active:scale-95">
                          <span>Send Message</span>
                          <Send size={18} />
                      </button>
                  </form>
              </motion.div>

              {/* Contact Info */}
              <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-stone-100">
                          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mb-6">
                              <Phone size={24} />
                          </div>
                          <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">Call Us</h4>
                          <p className="text-xl font-serif text-stone-900">+234 916 142 5463</p>
                      </div>
                      <div className="bg-white p-8 rounded-[1.5rem] shadow-sm border border-stone-100">
                          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mb-6">
                              <Mail size={24} />
                          </div>
                          <h4 className="text-[10px] uppercase font-bold tracking-widest text-stone-400 mb-2">Email Us</h4>
                          <p className="text-xl font-serif text-stone-900">Emayeayomide@gmail.com</p>
                      </div>
                  </div>

                  <div className="bg-stone-900 text-white p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
                      <div className="relative z-10 space-y-8">
                          <h3 className="text-3xl font-serif">Visit our Boutique.</h3>
                          <div className="space-y-6">
                              <div className="flex items-start space-x-4">
                                  <MapPin className="text-amber-500 mt-1" size={20} />
                                  <div>
                                      <p className="font-bold">Okoafor flagship</p>
                                      <p className="text-stone-400 text-sm">Okoafor Badagry Lagos</p>
                                  </div>
                              </div>
                              <div className="flex items-start space-x-4">
                                  <Clock className="text-amber-500 mt-1" size={20} />
                                  <div>
                                      <p className="font-bold">Boutique Hours</p>
                                      <p className="text-stone-400 text-sm">Mon - Sat: 8:00 AM - 10:00 PM</p>
                                      <p className="text-stone-400 text-sm">Sun: 12:00 PM - 9:00 PM</p>
                                  </div>
                              </div>
                          </div>
                          <div className="pt-8 border-t border-stone-800 flex space-x-6">
                             <Instagram className="cursor-pointer hover:text-amber-500" />
                             <Facebook className="cursor-pointer hover:text-amber-500" />
                          </div>
                      </div>
                      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                  </div>
                  
                  {/* Google Maps Mockup */}
                  <div className="aspect-video bg-stone-200 rounded-[2rem] overflow-hidden grayscale contrast-[1.2]">
                      <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Map" referrerPolicy="no-referrer" />
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
};
