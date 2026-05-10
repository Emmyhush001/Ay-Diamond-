import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

interface PromoBannerProps {
  title: string;
  highlight: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  className?: string;
  variant?: 'gold' | 'dark' | 'glass';
}

export const PromoBanner: React.FC<PromoBannerProps> = ({
  title,
  highlight,
  subtitle,
  ctaText,
  ctaLink,
  className,
  variant = 'gold'
}) => {
  const variants = {
    gold: "bg-gradient-to-r from-diamond-gold via-amber-600 to-diamond-gold text-white",
    dark: "bg-diamond-brown text-white",
    glass: "glass border-white/20 text-diamond-brown"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-[3rem] p-8 md:p-12 shadow-2xl",
        variants[variant],
        className
      )}
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-64 h-64 bg-black/5 blur-[80px] rounded-full" />
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-white/30">
            <Tag size={12} className="text-white" />
            Limited Time Offer
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-black leading-tight mb-4">
            {title} <span className={cn("italic font-normal block md:inline", variant === 'gold' ? "text-stone-900/40" : "text-diamond-gold")}>{highlight}</span>
          </h2>
          <p className="text-lg font-medium opacity-80 max-w-xl mx-auto lg:mx-0">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 min-w-[200px]">
          <Link 
            to={ctaLink}
            className={cn(
              "group relative flex items-center gap-3 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all",
              variant === 'gold' 
                ? "bg-stone-900 text-white hover:bg-stone-800" 
                : "bg-diamond-gold text-diamond-brown hover:bg-white hover:text-diamond-brown"
            )}
          >
            {ctaText}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest opacity-60">
            <Sparkles size={12} />
            Exclusive to AY Diamond
          </div>
        </div>
      </div>

      {/* Floating Sparkles Decor */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-12 right-12 text-white/40 hidden md:block"
      >
        <Sparkles size={48} />
      </motion.div>
    </motion.div>
  );
};
