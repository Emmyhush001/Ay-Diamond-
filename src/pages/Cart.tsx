import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, ArrowRight, Minus, Plus, CreditCard, Gift, Truck, Star, Tag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/utils';

export const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');

  const handleApplyPromo = () => {
    setPromoError('');
    const code = promoCode.toUpperCase().trim();
    
    // Simple mock promo logic
    if (code === 'DIAMOND10') {
      const discountAmount = cartTotal * 0.1;
      setDiscount(discountAmount);
      setAppliedPromo(code);
      setPromoCode('');
    } else if (code === 'WELCOME5') {
      setDiscount(5000);
      setAppliedPromo(code);
      setPromoCode('');
    } else {
      setPromoError('Invalid promotional code');
    }
  };

  const removePromo = () => {
    setDiscount(0);
    setAppliedPromo(null);
  };

  const finalTotal = Math.max(0, cartTotal - discount + 2500);

  const handleCheckoutWhatsApp = () => {
    const promoInfo = appliedPromo ? `\nPromo: ${appliedPromo} (-${formatPrice(discount)})` : '';
    const message = `Order Details:\n${cart.map(item => {
      const options = [
        item.selectedFlavor ? `Flavor: ${item.selectedFlavor}` : null,
        item.selectedSize ? `Size: ${item.selectedSize}` : null
      ].filter(Boolean).join(', ');
      
      return `- ${item.name}${options ? ` (${options})` : ''} x${item.quantity} (${formatPrice(item.price * item.quantity)})`;
    }).join('\n')}${promoInfo}\n\nTotal: ${formatPrice(finalTotal)}`;
    window.open(`https://wa.me/2349161425463?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 px-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 shadow-sm">
           <ShoppingBag size={40} className="text-stone-300" strokeWidth={1} />
        </div>
        <h2 className="text-3xl font-serif text-stone-900 mb-4">Your collection is empty.</h2>
        <p className="text-stone-500 mb-8 text-center max-w-sm">
          Browse our digital boutique and add some premium sweetness to your day.
        </p>
        <Link to="/menu" className="bg-amber-700 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-amber-600 transition-all shadow-xl">
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-stone-50 min-h-screen py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items */}
          <div className="flex-1 space-y-8">
            <div className="flex items-center justify-between border-b border-stone-200 pb-8">
                <h1 className="text-4xl font-serif text-stone-900">Your Collection <span className="text-stone-300 font-sans ml-2 text-2xl font-light">({totalItems})</span></h1>
                <Link to="/menu" className="text-[10px] uppercase font-bold tracking-widest text-amber-700 border-b border-amber-700/30 hover:border-amber-700 transition-all">Keep Browsing</Link>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="bg-white rounded-3xl p-6 shadow-sm border border-stone-100 flex items-center space-x-6"
                  >
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-stone-50 flex-shrink-0 shadow-sm border border-stone-100">
                       <img src={item.image} className="w-full h-full object-cover transition-transform hover:scale-110" alt={item.name} referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <div className="flex justify-between items-start gap-4 mb-2">
                          <div className="min-w-0">
                             <h4 className="font-serif text-lg text-stone-900 truncate mb-1">{item.name}</h4>
                             <div className="flex flex-wrap gap-2">
                                {item.selectedFlavor && (
                                  <span className="px-2 py-0.5 bg-amber-50 text-amber-800 text-[9px] font-black uppercase tracking-widest rounded-md border border-amber-100">
                                    {item.selectedFlavor}
                                  </span>
                                )}
                                {item.selectedSize && (
                                  <span className="px-2 py-0.5 bg-stone-100 text-stone-600 text-[9px] font-black uppercase tracking-widest rounded-md border border-stone-200/50">
                                    {item.selectedSize}
                                  </span>
                                )}
                             </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-stone-300 hover:text-rose-500 transition-colors p-1 flex-shrink-0"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>
                       <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center border border-stone-100 rounded-full bg-stone-50 p-1">
                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:text-amber-700"><Minus size={14} /></button>
                             <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:text-amber-700"><Plus size={14} /></button>
                          </div>
                          <p className="font-bold text-stone-900">{formatPrice(item.price * item.quantity)}</p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Checkout Summary */}
          <div className="lg:w-[400px]">
             <div className="sticky top-32 bg-white rounded-[2.5rem] p-10 shadow-xl border border-stone-100 space-y-8">
                <h3 className="text-2xl font-serif text-stone-900">Order Summary</h3>
                
                <div className="space-y-4 text-sm">
                   <div className="flex justify-between text-stone-500">
                      <span>Subtotal</span>
                      <span className="font-bold text-stone-900">{formatPrice(cartTotal)}</span>
                   </div>
                   
                   {/* Promo Code Section */}
                   <div className="pt-4 border-t border-stone-100">
                      {!appliedPromo ? (
                        <div className="space-y-2">
                           <div className="flex space-x-2">
                              <div className="relative flex-1">
                                 <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={14} />
                                 <input 
                                   type="text" 
                                   placeholder="Promo Code"
                                   value={promoCode}
                                   onChange={(e) => setPromoCode(e.target.value)}
                                   onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                                   className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-bold outline-none focus:ring-2 ring-amber-700/10 focus:border-amber-700/30 transition-all uppercase placeholder:normal-case"
                                 />
                              </div>
                              <button 
                                onClick={handleApplyPromo}
                                className="px-4 py-2 bg-stone-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-stone-800 transition-all active:scale-95"
                              >
                                Apply
                              </button>
                           </div>
                           {promoError && (
                             <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-rose-500 font-bold ml-1">
                                {promoError}
                             </motion.p>
                           )}
                           <p className="text-[9px] text-stone-400 ml-1">Try <span className="text-amber-700 font-bold">DIAMOND10</span> for 10% off</p>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                           <div className="flex items-center space-x-2">
                              <Tag size={14} className="text-amber-700" />
                              <span className="text-xs font-black text-amber-700 uppercase tracking-widest">{appliedPromo} Applied</span>
                           </div>
                           <button 
                            onClick={removePromo}
                            className="text-amber-700 hover:bg-amber-100 p-1 rounded-full transition-colors"
                           >
                              <X size={14} />
                           </button>
                        </div>
                      )}
                   </div>

                   {discount > 0 && (
                     <div className="flex justify-between text-emerald-600 font-bold">
                        <span>Discount</span>
                        <span>-{formatPrice(discount)}</span>
                     </div>
                   )}

                   <div className="flex justify-between text-stone-500">
                      <span>Shipping (Lagos)</span>
                      <span className="font-bold text-stone-900">{formatPrice(2500)}</span>
                   </div>
                   <div className="flex justify-between text-stone-500 border-t border-stone-100 pt-4">
                      <span className="text-stone-900 font-bold uppercase tracking-widest text-xs">Total</span>
                      <span className="text-2xl font-bold text-amber-700">{formatPrice(finalTotal)}</span>
                   </div>
                </div>

                {/* Micro Toggles / Features */}
                <div className="p-6 bg-stone-50 rounded-2xl space-y-4">
                   <div className="flex items-center space-x-3 text-xs text-stone-600">
                      <Truck size={16} className="text-stone-400" />
                      <span>Ready for delivery in 45-60 mins</span>
                   </div>
                   <div className="flex items-center space-x-3 text-xs text-stone-600">
                      <Gift size={16} className="text-stone-400" />
                      <span>Complimentary luxury packaging</span>
                   </div>
                </div>

                <div className="space-y-4 pt-4">
                   <button className="w-full bg-stone-900 text-white rounded-full py-5 font-bold uppercase tracking-widest text-sm hover:bg-stone-800 transition-all flex items-center justify-center space-x-3 active:scale-95 shadow-xl">
                      <CreditCard size={18} />
                      <span>Secure Checkout</span>
                   </button>
                   <button 
                    onClick={handleCheckoutWhatsApp}
                    className="w-full bg-emerald-600 text-white rounded-full py-5 font-bold uppercase tracking-widest text-sm hover:bg-emerald-700 transition-all flex items-center justify-center space-x-3 active:scale-95"
                   >
                      <svg fill="currentColor" width="18" height="18" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.588-5.946 0-6.556 5.332-11.891 11.891-11.891 3.181 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.481 8.403 0 6.556-5.332 11.891-11.891 11.891-2.011 0-3.986-.51-5.736-1.478l-6.057 1.59zm6.097-3.638l.343.204c1.47.873 3.161 1.334 4.888 1.334 5.231 0 9.491-4.259 9.491-9.491 0-2.535-1.01-4.919-2.845-6.756-1.834-1.836-4.221-2.847-6.752-2.847-5.232 0-9.493 4.261-9.493 9.491 0 1.954.544 3.86 1.572 5.52l.224.363-.99 3.612 3.612-.947zm9.734-6.662c-.22-.11-1.3-.642-1.503-.715-.203-.074-.351-.11-.5.11-.149.221-.577.715-.705.86-.129.147-.258.165-.478.055-.221-.11-.933-.344-1.776-1.096-.657-.586-1.1-.1.309-1.341-.122.148-.258-.02-.479-.131-.22-.11-1.3-.641-1.53-.762-.23-.121-.383-.176-.554.08-.171.258-.66.86-.809 1.03-.15.171-.3.195-.519.085s-.946-.35-1.802-1.119c-.665-.597-1.114-1.335-1.245-1.556-.13-.221-.014-.341.096-.45.1-.1.22-.258.33-.388.11-.129.148-.221.223-.37.074-.147.037-.276-.018-.387-.056-.11-.5-.1.221-.685-.45-.184-.23-.277-.66-.351-.775-.074-.074-.149-.074-.3-.074s-.35.055-.533.258c-.182.203-1.018.995-1.018 2.426 0 1.431.54 2.813 1.066 3.551.52.738 2.037 3.111 4.935 4.363.689.298 1.227.476 1.646.609.693.22 1.324.19 1.823.115.556-.084 1.708-.698 1.951-1.371.243-.672.243-1.248.17-1.371-.073-.124-.268-.204-.488-.314z"/></svg>
                      <span>Checkout to WhatsApp</span>
                   </button>
                </div>

                <div className="pt-6 border-t border-stone-100 flex justify-center space-x-6">
                   <div className="flex flex-col items-center space-y-1">
                      <ShieldCheck size={16} className="text-stone-400" strokeWidth={3} />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Secure</span>
                   </div>
                   <div className="flex flex-col items-center space-y-1">
                      <Star size={16} className="text-stone-400" strokeWidth={3} />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400">Premium</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ShieldCheck = (props: any) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>
);
