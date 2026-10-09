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
  // animation stages: 'sealed' | 'breaking-seal' | 'flap-open' | 'card-rising' | 'card-out' | 'fading'
  const [stage, setStage] = useState<'sealed' | 'breaking-seal' | 'flap-open' | 'card-rising' | 'card-out' | 'fading'>('sealed');

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

    // 1. Top flap folds open
    setTimeout(() => {
      setStage('flap-open');
    }, 400);

    // 2. Card emerges from inside the pocket
    setTimeout(() => {
      setStage('card-rising');
    }, 950);

    // 3. Card fully steps forward and hovers into full view
    setTimeout(() => {
      setStage('card-out');
    }, 2100);

    // 4. Smooth transition to main site
    setTimeout(() => {
      setStage('fading');
    }, 3600);

    setTimeout(() => {
      onOpened();
    }, 4200);
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
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-medium tracking-wider uppercase text-[#7A6E5F] hover:text-[#3E342B] bg-white/70 hover:bg-white/95 backdrop-blur-sm border border-[#C5A059]/30 rounded-full transition-all shadow-sm"
        >
          <span>Skip to Invitation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Main Envelope Stage Container */}
      <div className="relative flex flex-col items-center justify-center max-w-lg w-full">
        {/* Top Header Text - fades gently as card emerges */}
        <div
          className={`text-center mb-6 z-20 transition-all duration-700 ${
            stage === 'card-rising' || stage === 'card-out' || stage === 'fading'
              ? 'opacity-0 -translate-y-4 pointer-events-none'
              : 'opacity-100'
          }`}
        >
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

          {/* 1. Envelope Back Interior Container (z-index 1) */}
          <div className="absolute inset-0 bg-[#F5ECE0] border border-[#DFC488]/40 rounded-lg overflow-hidden shadow-2xl z-[1]">
            {/* Interior floral liner */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#EBDCCB] to-[#F7EFE4] opacity-90" />
            <div
              className="absolute inset-2 border border-[#C5A059]/25 rounded opacity-35 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#C5A059 0.5px, transparent 0.5px)`,
                backgroundSize: '12px 12px',
              }}
            />
          </div>

          {/* 2. 3D Top Flap - Folds back BEHIND the envelope (z-[25] when sealed, drops to z-[0] behind everything when opened so it NEVER blocks the card) */}
          <div
            className={`absolute left-0 right-0 top-0 origin-top pointer-events-none transition-all duration-700 ease-in-out ${
              stage === 'sealed' || stage === 'breaking-seal' ? 'z-[25]' : 'z-[0]'
            }`}
            style={{
              height: '52%',
              transform:
                stage === 'flap-open' || stage === 'card-rising' || stage === 'card-out' || stage === 'fading'
                  ? 'rotateX(180deg)'
                  : 'rotateX(0deg)',
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Flap Outer Face (when closed) / Inner Back (when opened) */}
            <div
              className="w-full h-full shadow-md"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                background:
                  stage === 'flap-open' || stage === 'card-rising' || stage === 'card-out' || stage === 'fading'
                    ? 'linear-gradient(180deg, #E6DACB 0%, #D8C8B5 100%)'
                    : 'linear-gradient(180deg, #FAF6EE 0%, #EFE8DC 100%)',
                borderBottom: '1px solid rgba(223, 196, 136, 0.4)',
              }}
            />
          </div>

          {/* 3. Invitation Card - Sits truly inside the pocket (z-[10]) behind the front pocket flaps (z-[20]), and slides UP out of the envelope */}
          <div
            className={`absolute left-4 right-4 bg-[#FFFDF9] border border-[#C5A059]/50 rounded-md p-5 sm:p-6 text-center shadow-lg transition-all duration-1000 ease-out ${
              stage === 'card-out' || stage === 'fading'
                ? '-translate-y-36 sm:-translate-y-44 scale-105 shadow-2xl opacity-100 z-[30]'
                : stage === 'card-rising'
                ? '-translate-y-32 sm:-translate-y-40 scale-100 shadow-xl opacity-100 z-[10]'
                : 'translate-y-6 opacity-95 z-[10]'
            }`}
            style={{
              height: '240px',
              boxShadow:
                stage === 'card-out' || stage === 'fading'
                  ? '0 20px 45px rgba(70, 50, 30, 0.25)'
                  : '0 8px 18px rgba(70, 50, 30, 0.1)',
            }}
          >
            <div className="h-full border border-[#C5A059]/30 p-3 sm:p-4 flex flex-col justify-between relative bg-gradient-to-b from-[#FFFDF9] to-[#FAF5EE]">
              <BotanicalCorner position="top-left" size={32} className="text-[#C5A059]/70" />
              <BotanicalCorner position="top-right" size={32} className="text-[#C5A059]/70" />

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

              <div className="text-[10px] tracking-widest text-[#B58D3D] uppercase font-medium flex items-center justify-center gap-1.5">
                <Heart className="w-2.5 h-2.5 fill-[#B58D3D] text-[#B58D3D]" />
                <span>Reception to follow</span>
                <Heart className="w-2.5 h-2.5 fill-[#B58D3D] text-[#B58D3D]" />
              </div>
            </div>
          </div>

          {/* 4. Envelope Front Pocket Flaps (Left, Right, Bottom) - z-[20] (Card is tucked INSIDE behind these flaps and slides up from within!) */}
          <div className="absolute inset-0 pointer-events-none z-[20]">
            {/* Left flap */}
            <div
              className="absolute left-0 top-0 bottom-0 bg-[#F5EFE6] border-r border-[#DFC488]/30 shadow-xs"
              style={{
                width: '50%',
                clipPath: 'polygon(0 0, 0 100%, 100% 50%)',
              }}
            />
            {/* Right flap */}
            <div
              className="absolute right-0 top-0 bottom-0 bg-[#F5EFE6] border-l border-[#DFC488]/30 shadow-xs"
              style={{
                width: '50%',
                clipPath: 'polygon(100% 0, 100% 100%, 0 50%)',
              }}
            />
            {/* Bottom flap */}
            <div
              className="absolute left-0 right-0 bottom-0 bg-[#FAF7F2] border-t border-[#DFC488]/40 shadow-md"
              style={{
                height: '62%',
                clipPath: 'polygon(0 100%, 100% 100%, 50% 0)',
                background: 'linear-gradient(0deg, #F4ECE0 0%, #FAF7F2 100%)',
              }}
            />
          </div>

          {/* 5. Decorative Wax Seal with Heart Emblem (Centered on top flap) - z-[35] */}
          <div
            className={`absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-[35] transition-all duration-500 ${
              stage === 'breaking-seal'
                ? 'scale-125 opacity-70 filter brightness-125'
                : stage !== 'sealed'
                ? 'opacity-0 scale-50 pointer-events-none'
                : 'scale-100 opacity-100 hover:scale-105'
            }`}
          >
            {/* Wax seal realistic layered disc */}
            <div
              className="w-16 h-16 rounded-full flex flex-col items-center justify-center relative shadow-xl cursor-pointer"
              style={{
                background: 'radial-gradient(circle at 35% 35%, #D4AF37 0%, #A67C1E 65%, #6B4E10 100%)',
                boxShadow: '0 8px 18px rgba(60, 40, 10, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.45)',
                border: '1px solid rgba(255, 220, 140, 0.5)',
              }}
            >
              {/* Organic melted wax edge irregularities */}
              <div
                className="absolute inset-1 rounded-full border border-[#DFC488]/40 opacity-70"
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                }}
              />
              {/* Couple's Initials Monogram with embossed Heart */}
              <Heart className="w-3.5 h-3.5 text-[#FFF6DF] fill-[#FFF6DF] drop-shadow-sm mb-0.5" />
              <span
                className="font-serif text-sm font-bold text-[#FFF6DF] tracking-tighter drop-shadow-md select-none leading-none"
                style={{ textShadow: '0 1px 2px rgba(0,0,0,0.6)' }}
              >
                {config.couple.initials}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions / Tap indicator */}
        <div
          className={`mt-8 text-center z-20 transition-all duration-500 ${
            stage === 'card-rising' || stage === 'card-out' || stage === 'fading'
              ? 'opacity-0 pointer-events-none'
              : 'opacity-100'
          }`}
        >
          <button
            onClick={handleOpen}
            className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#FAF7F2] hover:bg-white text-[#5C4D3E] border border-[#C5A059]/40 shadow-md transition-all hover:shadow-lg active:scale-95"
          >
            <Heart className="w-4 h-4 text-[#B58D3D] fill-[#B58D3D] animate-pulse group-hover:scale-125 transition-transform" />
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
