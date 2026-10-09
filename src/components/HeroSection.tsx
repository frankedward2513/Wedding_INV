import React, { useState, useEffect } from 'react';
import { WeddingConfig } from '../config/weddingData';
import { Butterfly, BotanicalCorner, FloralDivider } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';
import { Calendar, MapPin, ChevronDown, Heart } from 'lucide-react';

interface HeroSectionProps {
  config: WeddingConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  // Live countdown timer state
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(config.schedule.weddingDateISO).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [config.schedule.weddingDateISO]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-24 pb-12 overflow-hidden bg-[#FAF7F2]">
      {/* Background Hero Image with measured romantic gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_garden_arch_1791553445795.jpg"
          alt="Romantic flower garden arch"
          className="w-full h-full object-cover object-center filter brightness-[0.88] saturate-[0.92]"
          referrerPolicy="no-referrer"
        />
        {/* Soft atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/90 via-[#FAF7F2]/60 to-[#FAF7F2]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#FAF7F2]/40 to-[#FAF7F2]/90" />
      </div>

      {/* Decorative floating butterflies in hero */}
      <div className="absolute top-28 left-[10%] hidden md:block z-10 animate-gentle-float">
        <Butterfly size={34} color="gold" />
      </div>
      <div className="absolute top-44 right-[12%] hidden md:block z-10 animate-gentle-float" style={{ animationDelay: '1.2s' }}>
        <Butterfly size={30} color="blush" />
      </div>

      {/* Top ornamental flourish */}
      <ScrollReveal direction="up" distance={30} duration={1} className="relative z-10 text-center max-w-3xl mx-auto px-4 mt-6">
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="w-8 h-[1px] bg-[#C5A059]/60" />
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#7A6E5F] font-medium">
            {config.couple.welcomeKicker}
          </span>
          <span className="w-8 h-[1px] bg-[#C5A059]/60" />
        </div>

        {/* Couple's Names in script typography */}
        <h1 className="font-script text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-[#332A22] leading-tight my-2 drop-shadow-sm">
          {config.couple.brideFirstName}{' '}
          <span className="font-serif italic font-light text-4xl sm:text-5xl md:text-6xl text-[#B58D3D] mx-2">
            &amp;
          </span>{' '}
          {config.couple.groomFirstName}
        </h1>

        <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#5C4D3E] italic max-w-xl mx-auto mt-2 leading-relaxed">
          {config.couple.welcomeSubtitle}
        </p>

        <FloralDivider className="my-5" />

        {/* Date and Venue summary */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#4E4133] font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#B58D3D]" />
            <span className="font-serif text-base text-[#332A22]">{config.schedule.displayDate}</span>
          </div>
          <span className="hidden sm:inline text-[#C5A059]">•</span>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#B58D3D]" />
            <span>{config.venues.ceremony.name} · {config.venues.ceremony.cityState}</span>
          </div>
        </div>

        {/* Scripture / Quote */}
        {config.couple.invitationVerse && (
          <p className="mt-6 text-xs sm:text-sm text-[#7A6E5F] font-serif italic max-w-lg mx-auto">
            {config.couple.invitationVerse}
          </p>
        )}
      </ScrollReveal>

      {/* Live Wedding Countdown Strip */}
      <ScrollReveal direction="up" distance={40} duration={1} delay={200} className="relative z-10 w-full max-w-3xl mx-auto px-4 my-8">
        <div className="bg-[#FFFDF9]/85 backdrop-blur-md border border-[#C5A059]/30 rounded-2xl p-6 sm:p-8 shadow-xl text-center relative overflow-hidden">
          <BotanicalCorner position="top-left" size={40} className="text-[#C5A059]/50" />
          <BotanicalCorner position="top-right" size={40} className="text-[#C5A059]/50" />
          <BotanicalCorner position="bottom-left" size={40} className="text-[#C5A059]/50" />
          <BotanicalCorner position="bottom-right" size={40} className="text-[#C5A059]/50" />

          <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7A6B] font-semibold block mb-4">
            Counting Down to Our Forever
          </span>

          <div className="grid grid-cols-4 gap-2 sm:gap-6 max-w-lg mx-auto">
            {/* Days */}
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#3E342B] tabular-nums">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7A6E5F] mt-1 font-medium">
                Days
              </span>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#3E342B] tabular-nums">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7A6E5F] mt-1 font-medium">
                Hours
              </span>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#3E342B] tabular-nums">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7A6E5F] mt-1 font-medium">
                Minutes
              </span>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <span className="font-serif text-3xl sm:text-5xl font-semibold text-[#B58D3D] tabular-nums">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-[#7A6E5F] mt-1 font-medium">
                Seconds
              </span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <a
              href="#rsvp"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5C4D3E] hover:bg-[#43372B] text-white text-xs uppercase tracking-[0.18em] font-semibold rounded-lg shadow-sm hover:shadow transition-all"
            >
              <Heart className="w-3.5 h-3.5 text-[#EED7CF] fill-[#EED7CF]" />
              <span>Confirm Your Attendance</span>
            </a>
          </div>
        </div>
      </ScrollReveal>

      {/* Gentle Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center text-[#8C7A6B] hover:text-[#3E342B] transition-colors mt-2">
        <span className="text-[10px] uppercase tracking-[0.25em] font-medium mb-1">
          Scroll to Explore Our Story
        </span>
        <a href="#story" aria-label="Scroll to story section">
          <ChevronDown className="w-5 h-5 animate-bounce text-[#B58D3D]" />
        </a>
      </div>
    </section>
  );
};
