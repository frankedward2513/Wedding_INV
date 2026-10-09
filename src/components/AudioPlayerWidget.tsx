import React, { useState } from 'react';
import { Volume2, VolumeX, Disc3, Sparkles } from 'lucide-react';
import { WeddingConfig } from '../config/weddingData';

interface AudioPlayerWidgetProps {
  config: WeddingConfig;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onVolumeChange: (vol: number) => void;
}

export const AudioPlayerWidget: React.FC<AudioPlayerWidgetProps> = ({
  config,
  isPlaying,
  onTogglePlay,
  onVolumeChange,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [volume, setVolume] = useState(0.45);

  const handleVol = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    onVolumeChange(val);
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 transition-all select-none">
      <div
        className={`bg-[#FFFDF9]/90 backdrop-blur-md border border-[#C5A059]/40 rounded-full shadow-lg p-1.5 flex items-center transition-all duration-300 ${
          expanded ? 'pr-4 gap-3' : 'gap-1'
        }`}
      >
        {/* Play/Pause round button */}
        <button
          onClick={onTogglePlay}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-[#EED7CF] text-[#6C3E33] shadow-inner'
              : 'bg-[#FAF7F2] text-[#8C7A6B] hover:text-[#3E342B]'
          }`}
          title={isPlaying ? 'Pause Background Harp Music' : 'Play Background Harp Music'}
          aria-label="Toggle background music"
        >
          {isPlaying ? (
            <Disc3 className="w-5 h-5 text-[#B58D3D] animate-spin" style={{ animationDuration: '4s' }} />
          ) : (
            <VolumeX className="w-4 h-4 text-[#8C7A6B]" />
          )}
        </button>

        {/* Small badge or expander */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-left py-0.5 focus:outline-none"
          title="Click to view track details"
        >
          {expanded ? (
            <div className="flex flex-col pr-1">
              <span className="text-[11px] font-serif font-semibold text-[#3E342B] truncate max-w-[140px]">
                {config.music.title}
              </span>
              <span className="text-[9px] uppercase tracking-wider text-[#B58D3D] flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Romantic Strings</span>
              </span>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5 px-2 text-[11px] text-[#7A6E5F]">
              <span className="font-serif italic">Music</span>
              <Volume2 className="w-3 h-3 text-[#B58D3D]" />
            </div>
          )}
        </button>

        {/* Volume slider when expanded */}
        {expanded && (
          <div className="flex items-center gap-1.5 pl-1 border-l border-[#E8DCCF]">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVol}
              className="w-16 accent-[#B58D3D] h-1 bg-[#E8DCCF] rounded-lg cursor-pointer"
              title="Volume"
            />
          </div>
        )}
      </div>
    </div>
  );
};
