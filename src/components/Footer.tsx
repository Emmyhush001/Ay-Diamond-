import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 glass-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col">
              <span className="text-2xl font-serif font-black tracking-widest text-white">
                DIAMOND
              </span>
              <span className="text-[10px] uppercase font-black tracking-[0.4em] text-diamond-gold">
                Pastries & Ice Cream
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-white/50 font-medium tracking-widest uppercase text-[10px]">
              Lagos' premier destination for luxury sweetness. Handcrafted excellence in every bite.
            </p>
            <div className="flex space-x-4">
              <Instagram className="cursor-pointer hover:text-diamond-gold transition-colors" size={18} strokeWidth={2} />
              <Facebook className="cursor-pointer hover:text-diamond-gold transition-colors" size={18} strokeWidth={2} />
              <Twitter className="cursor-pointer hover:text-diamond-gold transition-colors" size={18} strokeWidth={2} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-diamond-gold text-[10px] font-black uppercase tracking-[0.3em]">Experience</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
              <li><Link to="/menu" className="text-white/50 hover:text-white transition-colors">Digital Menu</Link></li>
              <li><Link to="/bespoke" className="text-white/50 hover:text-white transition-colors">Custom Cakes</Link></li>
              <li><Link to="/catering" className="text-white/50 hover:text-white transition-colors">Event Catering</Link></li>
              <li><Link to="/about" className="text-white/50 hover:text-white transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-white/50 hover:text-white transition-colors">Locations</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-diamond-gold text-[10px] font-black uppercase tracking-[0.3em]">Contact Us</h4>
            <ul className="space-y-4 text-[10px] font-bold uppercase tracking-widest">
              <li className="flex items-center space-x-3">
                <Phone size={14} className="text-diamond-gold" />
                <span>+234 916 142 5463</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={14} className="text-diamond-gold" />
                <span>Emayeayomide@gmail.com</span>
              </li>
              <li className="flex items-center space-x-3 text-white/40">
                <MapPin size={14} className="text-diamond-gold" />
                <span>Okoafor Badagry Lagos, Nigeria</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-diamond-gold text-[10px] font-black uppercase tracking-[0.3em]">Join the Circle</h4>
            <p className="text-[9px] text-white/30 uppercase tracking-widest font-black">
                Get notified of limited edition releases.
            </p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-white/10 py-3 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-diamond-gold transition-colors placeholder:text-white/20"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 font-black text-[10px] uppercase text-diamond-gold hover:text-white transition-colors">
                JOIN
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] uppercase tracking-widest text-white/30 font-black">
          <p>© {new Date().getFullYear()} AY Diamond Pastries & Ice Cream. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <span className="cursor-pointer hover:text-white transition-colors">Privacy Policy</span>
            <span className="cursor-pointer hover:text-white transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
