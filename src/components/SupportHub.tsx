import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, ChevronRight, MessageCircle, Phone, Mail, Search } from 'lucide-react';
import { cn } from '../lib/utils';

const FAQS = [
  {
    question: "Do you offer same-day delivery?",
    answer: "Yes, for orders placed before 10 AM within Lagos. Other regions take 24-48 hours."
  },
  {
    question: "Are your ingredients organic?",
    answer: "We source the finest ingredients globally, prioritizing organic and artisanal producers."
  },
  {
    question: "Can I customize a cake for an event?",
    answer: "Absolutely! Our Diamond Bespoke service allows full customization for weddings and events."
  },
  {
    question: "Is there a pickup location?",
    answer: "Yes, you can visit our flagship store in Lekki Phase 1, Lagos."
  }
];

export const SupportHub: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 left-0 w-[90vw] max-w-[400px] glass rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl border-white/40"
          >
            {/* Header */}
            <div className="p-8 bg-diamond-brown text-white">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-serif font-black tracking-tight">Support Hub</h3>
                    <p className="text-[10px] text-diamond-gold font-black uppercase tracking-[0.2em] mt-1">Diamond Customer Service</p>
                  </div>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
               </div>
               <p className="text-sm text-white/70">How can we make your day sweeter today?</p>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto max-h-[400px] p-6 space-y-6 scrollbar-hide">
               {/* Search */}
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-diamond-brown/30" size={16} />
                  <input 
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/50 border border-diamond-brown/10 rounded-full py-3 pl-12 pr-6 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-diamond-gold transition-colors"
                  />
               </div>

               {/* FAQs */}
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-diamond-brown/40 px-2">Frequently Asked</h4>
                  <div className="space-y-2">
                    {filteredFaqs.length > 0 ? (
                      filteredFaqs.map((faq, i) => (
                        <details key={i} className="group glass-light rounded-2xl p-4 cursor-pointer">
                          <summary className="list-none flex justify-between items-center text-xs font-black text-diamond-brown uppercase tracking-tight">
                            <span>{faq.question}</span>
                            <ChevronRight size={14} className="group-open:rotate-90 transition-transform" />
                          </summary>
                          <p className="mt-3 text-xs text-diamond-brown/70 leading-relaxed font-medium">
                            {faq.answer}
                          </p>
                        </details>
                      ))
                    ) : (
                      <p className="text-center py-4 text-xs font-bold text-diamond-brown/30 uppercase tracking-widest">No matching answers</p>
                    )}
                  </div>
               </div>

               {/* Contact Options */}
               <div className="space-y-4 pt-4 border-t border-diamond-brown/5">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-diamond-brown/40 px-2">Direct Contact</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <a 
                      href="https://wa.me/2349161425463" 
                      target="_blank"
                      className="flex flex-col items-center justify-center p-4 glass rounded-3xl hover:bg-diamond-brown hover:text-white transition-all group"
                    >
                      <MessageCircle size={24} className="mb-2 text-emerald-500 group-hover:text-white" />
                      <span className="text-[10px] font-black uppercase tracking-widest">WhatsApp</span>
                    </a>
                    <a 
                      href="mailto:Emayeayomide@gmail.com"
                      className="flex flex-col items-center justify-center p-4 glass rounded-3xl hover:bg-diamond-brown hover:text-white transition-all group"
                    >
                      <Mail size={24} className="mb-2 text-diamond-gold group-hover:text-white" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Email</span>
                    </a>
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="p-4 text-center border-t border-diamond-brown/5">
               <p className="text-[8px] font-black uppercase tracking-[0.4em] text-diamond-brown/30">Diamond Standard Support</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-5 rounded-full shadow-2xl transition-all duration-500 flex items-center justify-center relative",
          isOpen ? "bg-diamond-brown text-white" : "bg-white text-diamond-brown glass border-white"
        )}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-diamond-gold rounded-full animate-ping" />
        )}
      </motion.button>
    </div>
  );
};
