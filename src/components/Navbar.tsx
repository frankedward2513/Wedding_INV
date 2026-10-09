import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../config/weddingData';
import { Volume2, VolumeX, MailOpen, X } from 'lucide-react';
import { BotanicalCorner, FloralDivider } from './BotanicalElements';

interface NavbarProps {
  config: WeddingConfig;
  isPlayingMusic: boolean;
  onToggleMusic: () => void;
  onReopenEnvelope: () => void;
  onOpenCustomizer?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  config,
  isPlayingMusic,
  onToggleMusic,
  onReopenEnvelope,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { label: 'Our Story', href: '#story' },
    { label: 'Details', href: '#details' },
    { label: 'Entourage', href: '#entourage' },
    { label: 'Dress Code', href: '#attire' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Gifts', href: '#gifts' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E8DCCF]/70 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-6 sm:gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#"
            className="font-serif text-xl sm:text-2xl text-[#3E342B] tracking-tight font-medium hover:text-[#B58D3D] transition-colors whitespace-nowrap shrink-0"
          >
            {config.couple.displayName}
          </a>

          {/* Zone 2: Desktop Navigation Links (hidden on mobile/tablet, visible on lg) */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-[#6C5E4E]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#3E342B] hover:underline underline-offset-8 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions & Mobile Hamburger (3 lines) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop / Tablet: Quick Envelope re-open (hidden on mobile to keep mobile header clean) */}
            <button
              onClick={onReopenEnvelope}
              title="View Invitation Envelope"
              className="hidden md:inline-flex p-2 text-[#7A6E5F] hover:text-[#3E342B] hover:bg-white/70 rounded-full transition-colors border border-[#C5A059]/20"
              aria-label="View Invitation Envelope"
            >
              <MailOpen className="w-4 h-4 text-[#B58D3D]" />
            </button>

            {/* Background Audio toggle (hidden on small mobile, floating music widget is at bottom-left) */}
            <button
              onClick={onToggleMusic}
              title={isPlayingMusic ? 'Mute romantic harp music' : 'Play romantic harp music'}
              className={`hidden sm:inline-flex p-2 rounded-full border transition-colors ${
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

            {/* Primary Action Button: RSVP (desktop) */}
            <a
              href="#rsvp"
              className="hidden sm:inline-flex px-4 sm:px-5 py-2 text-xs uppercase tracking-[0.15em] font-semibold text-[#FFFDF9] bg-[#5C4D3E] hover:bg-[#44382B] rounded-lg shadow-xs hover:shadow transition-all whitespace-nowrap shrink-0"
            >
              RSVP
            </a>

            {/* Mobile 3-Lines Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col justify-center items-center gap-[5px] w-10 h-10 p-2 rounded-lg bg-[#FFFDF9] border border-[#C5A059]/40 text-[#4A3E31] hover:bg-white shadow-xs focus:outline-none transition-all active:scale-95"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {/* 3 lines for hamburger */}
              <span
                className={`block w-5 h-[2px] bg-[#4A3E31] transition-transform duration-300 origin-center ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block w-5 h-[2px] bg-[#4A3E31] transition-opacity duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`block w-5 h-[2px] bg-[#4A3E31] transition-transform duration-300 origin-center ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer / Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-between bg-[#FAF7F2] bg-radial from-[#FFFDF9] via-[#FAF7F2] to-[#F2E8DC] p-6 animate-in fade-in duration-300 overflow-y-auto">
          {/* Header row in mobile menu */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8DCCF]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B] block">
                Wedding Celebration
              </span>
              <span className="font-serif text-2xl text-[#3E342B]">
                {config.couple.displayName}
              </span>
            </div>

            <button
              onClick={closeMenu}
              className="p-2.5 rounded-full bg-white border border-[#C5A059]/30 text-[#4A3E31] hover:bg-[#FAF7F2] shadow-xs"
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-[#5C4D3E]" />
            </button>
          </div>

          {/* Center: Mobile Navigation Links */}
          <div className="py-8 my-auto flex flex-col items-center justify-center space-y-6 text-center relative">
            <BotanicalCorner position="top-left" size={40} className="text-[#C5A059]/40 -top-4 -left-2" />
            <BotanicalCorner position="bottom-right" size={40} className="text-[#C5A059]/40 -bottom-4 -right-2" />

            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-serif text-2xl sm:text-3xl text-[#3E342B] hover:text-[#B58D3D] transition-colors py-1 block"
              >
                {link.label}
              </a>
            ))}

            <FloralDivider className="my-2 max-w-[200px]" />

            {/* Prominent Mobile RSVP Button */}
            <a
              href="#rsvp"
              onClick={closeMenu}
              className="w-full max-w-xs py-3.5 px-6 text-center bg-[#5C4D3E] hover:bg-[#43372B] text-white text-xs uppercase tracking-[0.2em] font-semibold rounded-xl shadow-md transition-all"
            >
              Confirm RSVP
            </a>
          </div>

          {/* Footer Controls in mobile menu */}
          <div className="pt-4 border-t border-[#E8DCCF] flex items-center justify-center text-xs text-[#6C5E4E]">
            <button
              onClick={() => {
                closeMenu();
                onReopenEnvelope();
              }}
              className="inline-flex items-center gap-1.5 py-2 px-4 bg-white border border-[#DFC488]/40 rounded-lg text-xs hover:bg-[#FAF7F2] transition-colors"
            >
              <MailOpen className="w-3.5 h-3.5 text-[#B58D3D]" />
              <span>View Invitation Card</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
