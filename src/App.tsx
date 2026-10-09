/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { initialWeddingConfig, WeddingConfig } from './config/weddingData';
import { romanticAudio } from './utils/audioSynthesizer';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { Navbar } from './components/Navbar';
import { FloatingParticlesLayer } from './components/FloatingParticlesLayer';
import { HeroSection } from './components/HeroSection';
import { OurStorySection } from './components/OurStorySection';
import { WeddingDetailsSection } from './components/WeddingDetailsSection';
import { EntourageSection } from './components/EntourageSection';
import { DressCodeSection } from './components/DressCodeSection';
import { PhotoGallerySection } from './components/PhotoGallerySection';
import { RsvpSection } from './components/RsvpSection';
import { GiftGuideSection } from './components/GiftGuideSection';
import { FooterSection } from './components/FooterSection';
import { AudioPlayerWidget } from './components/AudioPlayerWidget';

const CONFIG_STORAGE_KEY = 'aura_bloom_wedding_config_manila_v1';

export default function App() {
  // Main wedding configuration state with local storage persistence
  const [config] = useState<WeddingConfig>(() => {
    try {
      const stored = localStorage.getItem(CONFIG_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Ensure not using old California defaults
        if (parsed?.venues?.ceremony?.cityState?.includes('Carmel')) {
          return initialWeddingConfig;
        }
        return parsed;
      }
    } catch {
      // fallback to initial
    }
    return initialWeddingConfig;
  });

  // Envelope opening state: shows envelope modal on first visit
  const [hasOpenedEnvelope, setHasOpenedEnvelope] = useState<boolean>(false);

  // Background romantic ambient music state
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);

  // Floating particles (petals & butterflies) enabled state
  const [particlesEnabled, setParticlesEnabled] = useState<boolean>(true);

  // Toggle music playback
  const handleToggleMusic = () => {
    if (isPlayingMusic) {
      romanticAudio.pause();
      setIsPlayingMusic(false);
    } else {
      romanticAudio.play();
      setIsPlayingMusic(true);
    }
  };

  const handleStartMusic = () => {
    if (!isPlayingMusic) {
      romanticAudio.play();
      setIsPlayingMusic(true);
    }
  };

  const handleVolumeChange = (vol: number) => {
    romanticAudio.setVolume(vol);
  };

  // Respect prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setParticlesEnabled(false);
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#4A4238] font-sans selection:bg-[#E8D7CA] selection:text-[#3B322A]">
      {/* 1. Opening 3D Envelope Modal */}
      {!hasOpenedEnvelope && (
        <OpeningEnvelope
          config={config}
          onOpened={() => setHasOpenedEnvelope(true)}
          onStartMusic={handleStartMusic}
        />
      )}

      {/* 2. Top Navigation Bar */}
      <Navbar
        config={config}
        isPlayingMusic={isPlayingMusic}
        onToggleMusic={handleToggleMusic}
        onReopenEnvelope={() => setHasOpenedEnvelope(false)}
      />

      {/* 3. Floating Petals & Fluttering Butterflies Background Layer */}
      <FloatingParticlesLayer enabled={particlesEnabled} />

      {/* 4. Main Page Content */}
      <main>
        {/* Hero Section */}
        <HeroSection config={config} />

        {/* Our Love Story Timeline */}
        <OurStorySection config={config} />

        {/* Ceremony & Reception Wedding Details */}
        <WeddingDetailsSection config={config} />

        {/* Wedding Entourage */}
        <EntourageSection config={config} />

        {/* Dress Code & Guidelines */}
        <DressCodeSection config={config} />

        {/* Photo Gallery & Lightbox */}
        <PhotoGallerySection config={config} />

        {/* Interactive RSVP Form */}
        <RsvpSection config={config} />

        {/* Gift Guide & Registry */}
        <GiftGuideSection config={config} />
      </main>

      {/* 5. Footer Section */}
      <FooterSection config={config} />

      {/* 6. Floating Audio Player Controller */}
      <AudioPlayerWidget
        config={config}
        isPlaying={isPlayingMusic}
        onTogglePlay={handleToggleMusic}
        onVolumeChange={handleVolumeChange}
      />
    </div>
  );
}
