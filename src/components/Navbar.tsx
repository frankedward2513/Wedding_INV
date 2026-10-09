import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../config/weddingData';
import { Volume2, VolumeX, SlidersHorizontal, MailOpen } from 'lucide-react';

interface NavbarProps {
  config: WeddingConfig;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onOpenCustomizer: () => void;
  onReopenEnvelope: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  isPlayingMusic,
  onToggleMusic,
  onOpenCustomizer,
  onReopenEnvelope,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F2]/90 backdrop-blur-md shadow-sm border-b border-[#E8DCCF]/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <a
          href="#"
          className="font-serif text-xl sm:text-2xl text-[#3E342B] tracking-tight font-medium hover:text-[#B58D3D] transition-colors whitespace-nowrap shrink-0"
        >
          {config.couple.displayName}
        </a>

        {/* Zone 2: 4-5 Clean single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-[#6C5E4E]">
          <a href="#story" className="hover:text-[#3E342B] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
            Our Story
          </a>
          <a href="#details" className="hover:text-[#3E342B] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
            Details
          </a>
          <a href="#entourage" className="hover:text-[#3E342B] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
            Entourage
          </a>
          <a href="#attire" className="hover:text-[#3E342B] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
            Dress Code
          </a>
          <a href="#gallery" className="hover:text-[#3E342B] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
            Gallery
          </a>
          <a href="#gifts" className="hover:text-[#3E342B] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0">
            Gifts
          </a>
        </nav>

        {/* Zone 3: Primary Action & Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Envelope re-open icon button */}
          <button
            onClick={onReopenEnvelope}
            title="View Invitation Envelope Card"
            className="p-2 text-[#7A6E5F] hover:text-[#3E342B] hover:bg-white/70 rounded-full transition-colors border border-[#C5A059]/20"
            aria-label="View Invitation Envelope"
          >
            <MailOpen className="w-4 h-4 text-[#B58D3D]" />
          </button>

          {/* Background Audio toggle */}
          <button
            onClick={onToggleMusic}
            title={isPlayingMusic ? 'Mute romantic harp music' : 'Play romantic harp music'}
            className={`p-2 rounded-full border transition-colors ${
              isPlayingMusic
                ? 'bg-[#EED7CF]/50 text-[#6C5046] border-[#C5A059]/40'
                : 'text-[#7A6E5F] hover:text-[#3E342B] hover:bg-white/70 border-[#C5A059]/20'
            }`}
            aria-label={isPlayingMusic ? 'Mute Music' : 'Play Music'}
          >
            {isPlayingMusic ? (
              <Volume2 className="w-4 h-4 text-[#B58D3D] animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Quick Customizer toggle */}
          <button
            onClick={onOpenCustomizer}
            title="Customize couple details & date"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#6C5E4E] hover:text-[#3E342B] bg-[#FFFDF9] border border-[#C5A059]/30 rounded-lg hover:border-[#C5A059] transition-all"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B58D3D]" />
            <span className="whitespace-nowrap">Customize</span>
          </button>

          {/* Primary CTA Button: RSVP */}
          <a
            href="#rsvp"
            className="px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#FFFDF9] bg-[#5C4D3E] hover:bg-[#44382B] rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0"
          >
            RSVP
          </a>
        </div>
      </div>
    </header>
  );
};
