import React, { useState } from 'react';
import { WeddingConfig } from '../config/weddingData';
import { BotanicalCorner, FloralDivider } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';
import { Gift, Copy, Check, ExternalLink, QrCode } from 'lucide-react';

interface GiftGuideSectionProps {
  config: WeddingConfig;
}

export const GiftGuideSection: React.FC<GiftGuideSectionProps> = ({ config }) => {
  const { gifts } = config;
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedHandle, setCopiedHandle] = useState(false);

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(gifts.bankTransfer.accountNumber);
    setCopiedAccount(true);
    setTimeout(() => setCopiedAccount(false), 2000);
  };

  const handleCopyHandle = () => {
    navigator.clipboard.writeText(gifts.eWallet.handle);
    setCopiedHandle(true);
    setTimeout(() => setCopiedHandle(false), 2000);
  };

  return (
    <section id="gifts" className="relative py-24 px-4 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.9} className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
            Blessings &amp; Well Wishes
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3E342B] font-normal">
            Gift Guide &amp; Registry
          </h2>
          <FloralDivider className="my-4" />
          <p className="text-sm sm:text-base text-[#6C5E4E] font-serif italic leading-relaxed">
            {gifts.message}
          </p>
        </ScrollReveal>

        {/* Gift Options Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 1. Bank Transfer / Honeymoon Fund */}
          <ScrollReveal direction="up" distance={40} duration={1} delay={100}>
            <div className="h-full bg-[#FFFDF9] rounded-2xl p-8 border border-[#C5A059]/30 shadow-xl relative flex flex-col justify-between">
              <BotanicalCorner position="top-left" size={40} className="text-[#C5A059]/40" />
              <BotanicalCorner position="bottom-right" size={40} className="text-[#C5A059]/40" />

              <div>
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059]/30 text-[#B58D3D] flex items-center justify-center mb-5 shadow-xs">
                  <Gift className="w-6 h-6" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B58D3D] font-semibold block mb-1">
                  Honeymoon &amp; Nest Fund
                </span>
                <h3 className="font-serif text-2xl text-[#3E342B] mb-4">
                  Bank Transfer
                </h3>

                <div className="space-y-3 bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DCCF]/60 text-xs text-[#5C4D3E]">
                  <div className="flex justify-between">
                    <span className="text-[#8C7A6B]">Bank:</span>
                    <span className="font-medium text-[#3E342B]">{gifts.bankTransfer.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C7A6B]">Account Name:</span>
                    <span className="font-medium text-[#3E342B]">{gifts.bankTransfer.accountName}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-[#E8DCCF]/60">
                    <span className="text-[#8C7A6B]">Account Number:</span>
                    <span className="font-mono font-medium text-[#3E342B]">{gifts.bankTransfer.accountNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8C7A6B]">Routing / Code:</span>
                    <span className="font-mono text-[#3E342B]">{gifts.bankTransfer.routingOrBic}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8DCCF]/60">
                <button
                  onClick={handleCopyAccount}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-[#FAF7F2] hover:bg-white text-[#5C4D3E] border border-[#C5A059]/40 text-xs uppercase tracking-wider font-semibold rounded-lg shadow-xs transition-all"
                >
                  {copiedAccount ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Account Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#B58D3D]" />
                      <span>Copy Account Number</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* 2. E-Wallet & Registry */}
          <ScrollReveal direction="up" distance={40} duration={1} delay={250}>
            <div className="h-full bg-[#FFFDF9] rounded-2xl p-8 border border-[#C5A059]/30 shadow-xl relative flex flex-col justify-between">
              <BotanicalCorner position="top-left" size={40} className="text-[#C5A059]/40" />
              <BotanicalCorner position="bottom-right" size={40} className="text-[#C5A059]/40" />

              <div>
                <div className="w-12 h-12 rounded-full bg-[#FAF7F2] border border-[#C5A059]/30 text-[#B58D3D] flex items-center justify-center mb-5 shadow-xs">
                  <QrCode className="w-6 h-6" />
                </div>

                <span className="text-[11px] uppercase tracking-[0.2em] text-[#B58D3D] font-semibold block mb-1">
                  Digital Blessings
                </span>
                <h3 className="font-serif text-2xl text-[#3E342B] mb-4">
                  E-Wallet &amp; Registry
                </h3>

                <div className="space-y-4">
                  <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DCCF]/60 text-xs text-[#5C4D3E]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[#8C7A6B]">{gifts.eWallet.service}:</span>
                      <span className="font-medium text-[#3E342B]">{gifts.eWallet.handle}</span>
                    </div>
                    {gifts.eWallet.qrNote && (
                      <p className="text-[11px] text-[#8C7A6B] italic mt-1">
                        {gifts.eWallet.qrNote}
                      </p>
                    )}
                    <button
                      onClick={handleCopyHandle}
                      className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 bg-white text-[#5C4D3E] border border-[#DFC488]/40 rounded-md text-[11px] font-medium"
                    >
                      {copiedHandle ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Handle Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3 text-[#B58D3D]" />
                          <span>Copy Handle</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Registry Link */}
                  {gifts.registryUrl && (
                    <div className="p-4 bg-[#FAF7F2] rounded-xl border border-[#E8DCCF]/60">
                      <span className="text-[11px] uppercase tracking-wider text-[#8C7A6B] block mb-1">
                        Online Home Registry
                      </span>
                      <p className="text-xs text-[#5C4D3E] mb-3">
                        Curated wishlist for our new family sanctuary.
                      </p>
                      <a
                        href={gifts.registryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#B58D3D] hover:underline font-semibold"
                      >
                        <span>Visit Crate &amp; Barrel Registry</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-6 pt-4 border-t border-[#E8DCCF]/60 text-center text-xs text-[#8C7A6B] font-serif italic">
                Thank you for keeping us in your prayers and warm thoughts.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
