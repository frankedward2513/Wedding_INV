import React from 'react';
import { WeddingConfig } from '../config/weddingData';
import { BotanicalCorner, FloralDivider } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';
import { Sparkles, Camera, Clock, Heart, Users } from 'lucide-react';

interface DressCodeSectionProps {
  config: WeddingConfig;
}

export const DressCodeSection: React.FC<DressCodeSectionProps> = ({ config }) => {
  const { dressCode } = config;

  return (
    <section id="attire" className="relative py-24 px-4 bg-[#F5EFE6]/60 overflow-hidden border-t border-b border-[#E8DCCF]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.9} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
            What to Wear &amp; Helpful Notes
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3E342B] font-normal">
            Dress Code &amp; Guidelines
          </h2>
          <FloralDivider className="my-4" />
          <p className="text-sm sm:text-base text-[#6C5E4E] font-serif italic">
            {dressCode.description}
          </p>
        </ScrollReveal>

        {/* Main Card */}
        <ScrollReveal direction="up" distance={45} duration={1} delay={150}>
          <div className="bg-[#FFFDF9] rounded-2xl p-8 sm:p-12 border border-[#C5A059]/30 shadow-xl relative">
            <BotanicalCorner position="top-left" size={50} className="text-[#C5A059]/40" />
            <BotanicalCorner position="top-right" size={50} className="text-[#C5A059]/40" />

            {/* Attire Headline */}
            <div className="text-center pb-8 border-b border-[#E8DCCF]/60">
              <span className="text-xs uppercase tracking-[0.25em] text-[#B58D3D] font-semibold">
                Formal Wedding Attire
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#3E342B] mt-1 mb-4">
                {dressCode.attireType}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto mt-6">
                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DCCF]/50">
                  <span className="text-[11px] uppercase tracking-wider text-[#B58D3D] font-semibold block mb-1">
                    Principal Sponsors
                  </span>
                  <p className="text-sm text-[#4E4133] leading-relaxed">
                    {dressCode.sponsorsAttire}
                  </p>
                </div>

                <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DCCF]/50">
                  <span className="text-[11px] uppercase tracking-wider text-[#B58D3D] font-semibold block mb-1">
                    Beloved Guests
                  </span>
                  <p className="text-sm text-[#4E4133] leading-relaxed">
                    {dressCode.guestsAttire}
                  </p>
                </div>
              </div>
            </div>

            {/* Color Palette Swatches */}
            <div className="py-10 border-b border-[#E8DCCF]/60 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#B58D3D]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#B58D3D] font-semibold">
                  Suggested Color Palette
                </span>
              </div>
              <p className="text-xs text-[#7A6E5F] max-w-md mx-auto mb-6">
                We encourage muted botanicals, soft pastels, and champagne tones to harmonize with the garden setting.
              </p>

              {/* Visual Color Circles */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
                {dressCode.palette.map((swatch, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center p-3 bg-[#FAF7F2] rounded-xl border border-[#E8DCCF]/60 hover:shadow-md transition-shadow"
                  >
                    <div
                      className="w-12 h-12 rounded-full border border-black/10 shadow-inner mb-2"
                      style={{ backgroundColor: swatch.color }}
                    />
                    <span className="font-serif text-sm font-medium text-[#3E342B]">
                      {swatch.name}
                    </span>
                    <span className="text-[10px] text-[#8C7A6B] mt-0.5">
                      {swatch.note}
                    </span>
                  </div>
                ))}
              </div>

              {/* Colors to Avoid Notice */}
              <div className="mt-8 p-4 bg-[#FBEFEF]/70 border border-[#EAC5C5] rounded-xl max-w-2xl mx-auto text-left">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#8B3632] block">
                  Kindly Note: Colors to Avoid
                </span>
                <ul className="text-xs text-[#6B3230] mt-1 space-y-0.5 list-disc list-inside">
                  {dressCode.colorsToAvoid.map((color, idx) => (
                    <li key={idx}>{color}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Guest Guidelines & Etiquette */}
            <div className="pt-8">
              <h4 className="font-serif text-2xl text-[#3E342B] text-center mb-6">
                Guest Guidelines &amp; Etiquette
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {dressCode.guidelines.map((guide, idx) => {
                  const getIcon = (title: string) => {
                    if (title.toLowerCase().includes('unplugged')) return <Camera className="w-5 h-5 text-[#B58D3D]" />;
                    if (title.toLowerCase().includes('arrival')) return <Clock className="w-5 h-5 text-[#B58D3D]" />;
                    if (title.toLowerCase().includes('adult')) return <Users className="w-5 h-5 text-[#B58D3D]" />;
                    return <Heart className="w-5 h-5 text-[#B58D3D]" />;
                  };

                  return (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DCCF]/50"
                    >
                      <div className="p-2.5 rounded-full bg-white border border-[#C5A059]/20 shadow-sm shrink-0">
                        {getIcon(guide.title)}
                      </div>
                      <div>
                        <h5 className="font-serif text-base font-semibold text-[#3E342B] mb-1">
                          {guide.title}
                        </h5>
                        <p className="text-xs sm:text-sm text-[#5C4D3E] leading-relaxed">
                          {guide.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
