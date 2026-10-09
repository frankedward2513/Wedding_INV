import React from 'react';
import { WeddingConfig } from '../config/weddingData';
import { Butterfly, BotanicalCorner, FloralDivider } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';
import { ArrowUp, Heart } from 'lucide-react';

interface FooterSectionProps {
  config: WeddingConfig;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ config }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#FAF7F2] py-20 px-4 text-center overflow-hidden border-t border-[#E8DCCF]">
      {/* Subtle corner botanicals */}
      <BotanicalCorner position="top-left" size={60} className="text-[#C5A059]/30" />
      <BotanicalCorner position="top-right" size={60} className="text-[#C5A059]/30" />

      {/* Gentle floating butterfly */}
      <div className="absolute top-12 left-1/4 hidden sm:block animate-gentle-float">
        <Butterfly size={24} color="gold" />
      </div>
      <div className="absolute top-16 right-1/4 hidden sm:block animate-gentle-float" style={{ animationDelay: '1.4s' }}>
        <Butterfly size={22} color="blush" />
      </div>

      <ScrollReveal direction="up" distance={30} duration={1} className="max-w-2xl mx-auto relative z-10">
        <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
          With All Our Love &amp; Gratitude
        </span>

        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#3E342B] font-light mb-4">
          We Can&apos;t Wait to Celebrate With You
        </h3>

        {/* Couple's Names in script */}
        <p className="font-script text-5xl sm:text-6xl text-[#3E342B] my-3">
          {config.couple.displayName}
        </p>

        <p className="text-sm uppercase tracking-[0.2em] text-[#B58D3D] font-serif font-medium">
          {config.schedule.displayDate} · {config.venues.ceremony.cityState}
        </p>

        <FloralDivider className="my-6 max-w-xs mx-auto" />

        <p className="text-xs text-[#8C7A6B] font-serif italic mb-8">
          {config.couple.hashtag}
        </p>

        {/* Back to top button */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-[#FFFDF9] hover:bg-white text-[#5C4D3E] border border-[#C5A059]/40 rounded-full text-xs uppercase tracking-wider font-semibold shadow-sm hover:shadow transition-all"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#B58D3D] group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Quiet copyright */}
        <div className="mt-12 text-[11px] text-[#A69788]">
          <p className="flex items-center justify-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-[#B86F64] fill-[#B86F64]" />
            <span>for our wedding celebration · All rights reserved</span>
          </p>
        </div>
      </ScrollReveal>
    </footer>
  );
};
