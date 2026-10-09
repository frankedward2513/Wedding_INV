import React, { useState } from 'react';
import { WeddingConfig } from '../config/weddingData';
import { Butterfly, BotanicalCorner } from './BotanicalElements';
import { Heart, ArrowRight } from 'lucide-react';

interface OpeningEnvelopeProps {
  config: WeddingConfig;
  onOpened: () => void;
  onStartMusic?: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  config,
  onOpened,
  onStartMusic,
}) => {
  // animation stages: 'sealed' | 'breaking-seal' | 'flap-open' | 'card-out' | 'fading'
  const [stage, setStage] = useState<'sealed' | 'breaking-seal' | 'flap-open' | 'card-out' | 'fading'>('sealed');

  const handleOpen = () => {
    if (stage !== 'sealed') return;
    
    // Optional audio initiation
    if (onStartMusic) {
      try {
        onStartMusic();
      } catch {
        // user gesture handling
      }
    }

    setStage('breaking-seal');

    setTimeout(() => {
      setStage('flap-open');
    }, 450);

    setTimeout(() => {
      setStage('card-out');
    }, 950);

    setTimeout(() => {
      setStage('fading');
    }, 2800);

    setTimeout(() => {
      onOpened();
    }, 3400);
  };

  const handleSkip = () => {
    setStage('fading');
    setTimeout(() => {
      onOpened();
    }, 350);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F7F3EC] bg-radial from-[#FFFDF9] via-[#F8F3EC] to-[#EFE7DC] px-4 transition-opacity duration-700 ${
        stage === 'fading' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient background glow & botanical vines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft radial aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8D7CA]/35 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

        {/* Decorative corner flourishes */}
        <BotanicalCorner position="top-left" size={110} className="m-4 text-[#C5A059]" />
        <BotanicalCorner position="top-right" size={110} className="m-4 text-[#C5A059]" />
        <BotanicalCorner position="bottom-left" size={110} className="m-4 text-[#C5A059]" />
        <BotanicalCorner position="bottom-right" size={110} className="m-4 text-[#C5A059]" />

        {/* Delicate floating butterflies around envelope */}
        <div className="absolute top-1/4 left-1/6 animate-gentle-float">
          <Butterfly size={32} color="gold" />
        </div>
        <div className="absolute top-2/3 right-1/6 animate-gentle-float" style={{ animationDelay: '1.5s' }}>
          <Butterfly size={26} color="blush" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-gentle-float" style={{ animationDelay: '0.8s' }}>
          <Butterfly size={24} color="sage" />
        </div>
      </div>

      {/* Skip Intro button */}
      <div className="absolute top-6 right-6 z-30">
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wider uppercase text-[#7A6E5F] hover:text-[#3B322A] bg-white/70 hover:bg-white/95 backdrop-blur-sm border border-[#C5A059]/30 rounded-full transition-all shadow-sm"
        >
          <span>Skip to Invitation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Envelope Stage Container */}
      <div className="relative flex flex-col items-center justify-center max-w-lg w-full">
        {/* Top Header Text */}
        <div className="text-center mb-6 z-20">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-medium block mb-1">
            You Are Cordially Invited
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#3E342B] font-normal tracking-wide">
            {config.couple.displayName}
          </h1>
        </div>

        {/* 3D Envelope Wrapper */}
        <div
          onClick={handleOpen}
          className={`relative cursor-pointer group select-none transition-transform duration-500 ${
            stage === 'sealed' ? 'hover:scale-[1.02] active:scale-[0.99]' : ''
          }`}
          style={{ width: 'min(90vw, 420px)', height: '270px' }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpen();
          }}
          aria-label="Wedding invitation envelope. Tap to open invitation."
        >
          {/* Envelope Shadow */}
          <div className="absolute inset-0 bg-[#36271A]/15 rounded-md filter blur-xl transform translate-y-6 scale-95" />

          {/* Envelope Pocket Base Container */}
          <div className="absolute inset-0 bg-[#FAF7F2] border border-[#DFC488]/40 rounded-lg overflow-hidden shadow-2xl">
            {/* Interior floral liner */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#F2E8DC] to-[#FAF7F2] opacity-80" />
            <div
              className="absolute inset-2 border border-[#C5A059]/25 rounded opacity-40 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#C5A059 0.5px, transparent 0.5px)`,
                backgroundSize: '12px 12px',
              }}
            />
          </div>

          {/* Invitation Card that slides UP */}
          <div
            className={`absolute left-3 right-3 bg-[#FFFDF9] border border-[#C5A059]/50 rounded-md p-6 text-center shadow-lg transition-all duration-1000 ease-out z-10 ${
              stage === 'card-out' || stage === 'fading'
                ? '-translate-y-36 sm:-translate-y-44 scale-105 shadow-2xl opacity-100'
                : 'translate-y-3 opacity-90'
            }`}
            style={{
              height: '240px',
              boxShadow: '0 10px 30px rgba(70, 50, 30, 0.15)',
            }}
          >
            <div className="h-full border border-[#C5A059]/30 p-4 flex flex-col justify-between relative bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EE]">
              <BotanicalCorner position="top-left" size={35} className="text-[#C5A059]/70" />
              <BotanicalCorner position="top-right" size={35} className="text-[#C5A059]/70" />

              <div className="text-center pt-1">
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#8C7A6B]">
                  Together With Their Families
                </span>
                <p className="font-script text-3xl sm:text-4xl text-[#3E342B] my-1">
                  {config.couple.displayName}
                </p>
                <p className="text-xs text-[#7A6E5F] font-serif italic">
                  request the honor of your presence
                </p>
              </div>

              <div className="border-t border-b border-[#C5A059]/30 py-1.5 my-1 text-center">
                <p className="font-serif text-sm text-[#3E342B] font-semibold tracking-wider">
                  {config.schedule.displayDate}
                </p>
                <p className="text-[11px] text-[#7A6E5F]">
                  {config.schedule.ceremonyTime} · {config.venues.ceremony.name}
                </p>
              </div>

              <div className="text-[10px] tracking-widest text-[#B58D3D] uppercase font-medium">
                Reception to follow
              </div>
            </div>
          </div>

          {/* Envelope Side Flaps (Left & Right triangles) */}
          <div className="absolute inset-0 pointer-events-none z-15">
            {/* Left flap */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#F5EFE6] border-r border-[#DFC488]/30 shadow-sm"
              style={{
                width: '50%',
                clipPath: 'polygon(0 0, 0 100%, 100% 50%)',
              }}
            />
            {/* Right flap */}
            <div
              className="absolute right-0 top-0 bottom-0 bg-[#F5EFE6] border-l border-[#DFC488]/30 shadow-sm"
              style={{
                width: '50%',
                clipPath: 'polygon(100% 0, 100% 100%, 0 50%)',
              }}
            />
            {/* Bottom flap */}
            <div
              className="absolute left-0 right-0 bottom-0 bg-[#F8F3EC] border-t border-[#DFC488]/40 shadow-md"
              style={{
                height: '62%',
                clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
              }}
            />
          </div>

          {/* 3D Top Flap */}
          <div
            className="absolute left-0 right-0 top-0 z-20 origin-top preserve-3d transition-transform duration-700 ease-in-out"
            style={{
              height: '52%',
              transform:
                stage === 'flap-open' || stage === 'card-out' || stage === 'fading'
                  ? 'rotateX(180deg)'
                  : 'rotateX(0deg)',
              transformOrigin: 'top center',
            }}
          >
            {/* Flap Outer Face */}
            <div
              className="w-full h-full bg-[#FAF7F2] border-b border-[#DFC488]/50 shadow-md"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background: 'linear-gradient(180deg, #F9F4EB 0%, #EFE8DC 100%)',
              }}
            />
          </div>

          {/* Decorative Wax Seal (Centered on envelope) */}
          <div
            className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-25 transition-all duration-500 ${
              stage === 'breaking-seal'
                ? 'scale-125 opacity-70 filter brightness-125'
                : stage === 'flap-open' || stage === 'card-out' || stage === 'fading'
                ? 'opacity-0 scale-50 pointer-events-none'
                : 'scale-100 opacity-100 hover:scale-105'
            }`}
          >
            {/* Wax seal realistic layered disc */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center relative shadow-xl"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #D4AF37 0%, #A67C1E 65%, #6B4E10 100%)',
                boxShadow: '0 8px 16px rgba(60, 40, 10, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.4)',
                border: '1px solid rgba(255, 220, 140, 0.4)',
              }}
            >
              {/* Organic melted wax edge irregularities */}
              <div
                className="absolute inset-1 rounded-full border border-[#DFC488]/40 opacity-70"
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
              {/* Couple's Initials Monogram */}
              <span
                className="font-serif text-lg font-bold text-[#FFF6DF] tracking-tighter drop-shadow-md select-none"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
              >
                {config.couple.initials}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions / Tap indicator */}
        <div className="mt-8 text-center z-20">
          <button
            onClick={handleOpen}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#5C4D3E] border border-[#C5A059]/40 shadow-md transition-all hover:shadow-lg active:scale-95"
          >
            <Heart className="w-4 h-4 text-[#B58D3D] fill-[#EED7CF] group-hover:scale-110 transition-transform" />
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#5C4D3E]">
              {stage === 'sealed' ? 'Tap to Open Our Invitation' : 'Opening Invitation...'}
            </span>
          </button>
          <p className="text-[11px] text-[#8C7A6B] mt-2 font-serif italic">
            Experience our sacred vows, love story, &amp; celebration details
          </p>
        </div>
      </div>
    </div>
  );
};
