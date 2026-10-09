import React from 'react';
import { WeddingConfig } from '../config/weddingData';
import { BotanicalCorner, FloralDivider, Butterfly } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';
import { Calendar, MapPin, Heart } from 'lucide-react';

interface OurStorySectionProps {
  config: WeddingConfig;
}

export const OurStorySection: React.FC<OurStorySectionProps> = ({ config }) => {
  return (
    <section id="story" className="relative py-24 px-4 bg-[#FAF7F2] overflow-hidden">
      {/* Background accents */}
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.9} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
            The Journey of Our Hearts
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3E342B] font-normal">
            Our Love Story
          </h2>
          <FloralDivider className="my-4" />
          <p className="text-sm sm:text-base text-[#6C5E4E] font-serif italic leading-relaxed">
            Every step we took led us to each other. Here are the quiet moments and grand adventures that brought us to this sacred celebration.
          </p>
        </ScrollReveal>

        {/* Timeline Container */}
        <div className="relative">
          {/* Vertical Golden Center Line (hidden on very small screens, visible on md+) */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-[1px] bg-gradient-to-b from-[#C5A059]/10 via-[#C5A059]/40 to-[#C5A059]/10" />

          {/* Timeline Milestones */}
          <div className="space-y-16 md:space-y-24">
            {config.loveStory.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <ScrollReveal
                  key={milestone.id}
                  direction="up"
                  distance={45}
                  duration={1}
                  threshold={0.12}
                  className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Center Timeline Node with gold heart */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#FFFDF9] border border-[#C5A059] flex items-center justify-center shadow-md">
                      <Heart className="w-3.5 h-3.5 text-[#B58D3D] fill-[#B58D3D]" />
                    </div>
                  </div>

                  {/* Image Column */}
                  <div className="w-full md:w-1/2">
                    <div className="relative group max-w-md mx-auto">
                      {/* Photo Frame with subtle deckle card styling */}
                      <div className="relative overflow-hidden rounded-xl bg-[#FFFDF9] p-3 shadow-xl border border-[#C5A059]/30 transition-transform duration-500 group-hover:scale-[1.01]">
                        <BotanicalCorner position="top-left" size={36} className="text-[#C5A059]/50" />
                        <BotanicalCorner position="bottom-right" size={36} className="text-[#C5A059]/50" />

                        <div className="overflow-hidden rounded-lg aspect-[4/3]">
                          <img
                            src={milestone.image}
                            alt={milestone.title}
                            className="w-full h-full object-cover object-center filter saturate-[0.95] group-hover:scale-105 transition-transform duration-700"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Location footnote */}
                        <div className="mt-3 flex items-center justify-between text-[11px] text-[#7A6E5F] px-1 font-serif">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-[#B58D3D]" />
                            {milestone.location}
                          </span>
                          <span className="flex items-center gap-1 text-[#B58D3D] font-semibold">
                            <Heart className="w-3.5 h-3.5 fill-[#B58D3D] text-[#B58D3D]" />
                            <span>Chapter {idx + 1}</span>
                          </span>
                        </div>
                      </div>

                      {/* Small decorative butterfly on first and proposal milestones */}
                      {idx === 0 && (
                        <div className="absolute -top-4 -right-4 z-20">
                          <Butterfly size={26} color="gold" />
                        </div>
                      )}
                      {milestone.id === 'proposal' && (
                        <div className="absolute -bottom-4 -left-4 z-20">
                          <Butterfly size={28} color="blush" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Text Column */}
                  <div className={`w-full md:w-1/2 text-center ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="max-w-md mx-auto">
                      <div className={`flex items-center gap-2 justify-center ${isEven ? 'md:justify-end' : 'md:justify-start'} mb-2.5 flex-wrap`}>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FAF3EC] border border-[#DFC488]/40 text-xs font-semibold text-[#B58D3D] tracking-wider uppercase shadow-xs">
                          <Heart className="w-3.5 h-3.5 fill-[#B58D3D] text-[#B58D3D]" />
                          <span>Chapter {idx + 1}</span>
                        </span>
                        <div className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-[#7A6E5F] font-medium">
                          <Calendar className="w-3 h-3 text-[#B58D3D]" />
                          <span>{milestone.date}</span>
                        </div>
                      </div>

                      <h3 className="font-serif text-2xl sm:text-3xl text-[#3E342B] font-medium mb-3">
                        {milestone.title}
                      </h3>

                      <p className="text-sm sm:text-base text-[#5C4D3E] leading-relaxed font-normal">
                        {milestone.story}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
