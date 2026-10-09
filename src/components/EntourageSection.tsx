import React from 'react';
import { WeddingConfig } from '../config/weddingData';
import { BotanicalCorner, FloralDivider } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';

interface EntourageSectionProps {
  config: WeddingConfig;
}

export const EntourageSection: React.FC<EntourageSectionProps> = ({ config }) => {
  const { entourage } = config;

  return (
    <section id="entourage" className="relative py-24 px-4 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.9} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
            The Wedding Party
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3E342B] font-normal">
            Wedding Entourage
          </h2>
          <FloralDivider className="my-4" />
          <p className="text-sm sm:text-base text-[#6C5E4E] font-serif italic">
            Surrounded by our most cherished family and lifelong friends who have guided and blessed our journey.
          </p>
        </ScrollReveal>

        {/* Entourage Card with Deckle Edge feel */}
        <ScrollReveal direction="up" distance={45} duration={1} delay={150}>
          <div className="bg-[#FFFDF9] rounded-2xl p-8 sm:p-14 border border-[#C5A059]/30 shadow-xl relative">
            <BotanicalCorner position="top-left" size={60} className="text-[#C5A059]/40" />
            <BotanicalCorner position="top-right" size={60} className="text-[#C5A059]/40" />
            <BotanicalCorner position="bottom-left" size={60} className="text-[#C5A059]/40" />
            <BotanicalCorner position="bottom-right" size={60} className="text-[#C5A059]/40" />

            {/* 1. Parents Row */}
            <ScrollReveal direction="up" distance={30} duration={0.9} delay={50}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center pb-10 border-b border-[#E8DCCF]/60">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58D3D] font-semibold block mb-2">
                    Parents of the Bride
                  </span>
                  <div className="space-y-1">
                    {entourage.parentsBride.map((name, i) => (
                      <p key={i} className="font-serif text-lg sm:text-xl text-[#3E342B]">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58D3D] font-semibold block mb-2">
                    Parents of the Groom
                  </span>
                  <div className="space-y-1">
                    {entourage.parentsGroom.map((name, i) => (
                      <p key={i} className="font-serif text-lg sm:text-xl text-[#3E342B]">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 2. Principal Sponsors */}
            <ScrollReveal direction="up" distance={30} duration={0.9} delay={80}>
              <div className="py-10 border-b border-[#E8DCCF]/60 text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58D3D] font-semibold block mb-4">
                  Principal Sponsors (Witnesses of Honor)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                  {entourage.principalSponsors.map((item, idx) => (
                    <div key={idx} className="p-3 bg-[#FAF7F2]/60 rounded-lg border border-[#E8DCCF]/40">
                      <p className="font-serif text-base sm:text-lg text-[#3E342B]">
                        {item.sponsor}
                      </p>
                      {item.spouse && (
                        <p className="font-serif text-sm sm:text-base text-[#6C5E4E] italic">
                          &amp; {item.spouse}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* 3. Maid of Honor & Best Man */}
            <ScrollReveal direction="up" distance={30} duration={0.9} delay={80}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center py-10 border-b border-[#E8DCCF]/60">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58D3D] font-semibold block mb-2">
                    Maid of Honor
                  </span>
                  <p className="font-serif text-xl sm:text-2xl text-[#3E342B] font-medium">
                    {entourage.maidOfHonor}
                  </p>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58D3D] font-semibold block mb-2">
                    Best Man
                  </span>
                  <p className="font-serif text-xl sm:text-2xl text-[#3E342B] font-medium">
                    {entourage.bestMan}
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* 4. Bridesmaids & Groomsmen */}
            <ScrollReveal direction="up" distance={30} duration={0.9} delay={80}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center py-10 border-b border-[#E8DCCF]/60">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58D3D] font-semibold block mb-3">
                    Bridesmaids
                  </span>
                  <div className="space-y-1.5">
                    {entourage.bridesmaids.map((name, i) => (
                      <p key={i} className="font-serif text-base sm:text-lg text-[#4E4133]">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58D3D] font-semibold block mb-3">
                    Groomsmen
                  </span>
                  <div className="space-y-1.5">
                    {entourage.groomsmen.map((name, i) => (
                      <p key={i} className="font-serif text-base sm:text-lg text-[#4E4133]">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* 5. Bearers & Flower Girls */}
            <ScrollReveal direction="up" distance={30} duration={0.9} delay={80}>
              <div className="pt-10 text-center">
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#B58D3D] font-semibold block mb-4">
                  Little Attendants &amp; Bearers
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-[#FAF7F2]/60 rounded-lg border border-[#E8DCCF]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                      Flower Girls
                    </span>
                    <p className="font-serif text-base text-[#3E342B] mt-1">
                      {entourage.flowerGirls.join(' & ')}
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF7F2]/60 rounded-lg border border-[#E8DCCF]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                      Ring Bearer
                    </span>
                    <p className="font-serif text-base text-[#3E342B] mt-1">
                      {entourage.ringBearer}
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF7F2]/60 rounded-lg border border-[#E8DCCF]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                      Bible Bearer
                    </span>
                    <p className="font-serif text-base text-[#3E342B] mt-1">
                      {entourage.bibleBearer}
                    </p>
                  </div>

                  <div className="p-3 bg-[#FAF7F2]/60 rounded-lg border border-[#E8DCCF]/40">
                    <span className="text-[10px] uppercase tracking-wider text-[#8C7A6B] block">
                      Coin Bearer
                    </span>
                    <p className="font-serif text-base text-[#3E342B] mt-1">
                      {entourage.coinBearer}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
