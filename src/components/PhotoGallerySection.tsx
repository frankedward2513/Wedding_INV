import React, { useState, useEffect } from 'react';
import { WeddingConfig, GalleryPhoto } from '../config/weddingData';
import { BotanicalCorner, FloralDivider } from './BotanicalElements';
import { ScrollReveal } from './ScrollReveal';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface PhotoGallerySectionProps {
  config: WeddingConfig;
}

export const PhotoGallerySection: React.FC<PhotoGallerySectionProps> = ({ config }) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const photos = config.gallery;

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const nextPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % photos.length);
  };

  const prevPhoto = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + photos.length) % photos.length);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  return (
    <section id="gallery" className="relative py-24 px-4 bg-[#FAF7F2] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <ScrollReveal direction="up" distance={30} duration={0.9} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8C7A6B] font-semibold block mb-2">
            Captured Moments
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#3E342B] font-normal">
            Photo Gallery
          </h2>
          <FloralDivider className="my-4" />
          <p className="text-sm sm:text-base text-[#6C5E4E] font-serif italic">
            Glimpses of the memories we treasure, from the beginning of our journey to the threshold of our wedding day.
          </p>
        </ScrollReveal>

        {/* Responsive Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {photos.map((photo, idx) => (
            <ScrollReveal
              key={photo.id}
              direction="up"
              distance={35}
              duration={0.8}
              delay={idx * 120}
            >
              <div
                onClick={() => openLightbox(idx)}
                className="group relative cursor-pointer bg-[#FFFDF9] rounded-xl p-2.5 border border-[#C5A059]/30 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <BotanicalCorner position="top-left" size={28} className="text-[#C5A059]/40" />
                <BotanicalCorner position="bottom-right" size={28} className="text-[#C5A059]/40" />

                <div className="relative overflow-hidden rounded-lg aspect-[4/5] bg-[#EFE8DC]">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover object-center filter saturate-[0.95] group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Hover Scrim Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-lg font-medium">{photo.title}</h4>
                        <p className="text-xs text-white/80 line-clamp-1">{photo.caption}</p>
                      </div>
                      <div className="p-1.5 rounded-full bg-white/20 backdrop-blur-sm">
                        <Maximize2 className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Photo Caption below */}
                <div className="pt-2.5 px-1 text-center">
                  <p className="font-serif text-base text-[#3E342B] font-medium">{photo.title}</p>
                  <p className="text-[11px] text-[#8C7A6B] truncate">{photo.caption}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 transition-all">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevPhoto();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-50"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextPhoto();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/25 transition-colors z-50"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Lightbox Content Container */}
          <div
            className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-lg overflow-hidden border border-[#C5A059]/40 shadow-2xl max-h-[75vh]">
              <img
                src={photos[activePhotoIndex].url}
                alt={photos[activePhotoIndex].title}
                className="max-h-[75vh] w-auto object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lightbox Caption */}
            <div className="mt-4 text-center text-white max-w-xl">
              <h3 className="font-serif text-xl sm:text-2xl font-light">
                {photos[activePhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-serif italic mt-1">
                {photos[activePhotoIndex].caption}
              </p>
              <span className="text-[11px] text-[#C5A059] block mt-1">
                {activePhotoIndex + 1} / {photos.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
