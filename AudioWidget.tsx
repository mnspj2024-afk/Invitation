import React, { useState } from 'react';
import { Volume2, VolumeX, Play, Pause, Disc3 } from 'lucide-react';
import { audioEngine } from '../utils/audioPlayer';

interface AudioWidgetProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
}

export const AudioWidget: React.FC<AudioWidgetProps> = ({ isPlaying, onTogglePlay }) => {
  const [volume, setVolume] = useState<number>(0.45);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
      audioEngine.setVolume(0);
    } else {
      setIsMuted(false);
      audioEngine.setVolume(val);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume > 0 ? volume : 0.45);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <div 
        className={`flex items-center gap-2.5 bg-[#FBF7F0]/95 backdrop-blur-md border border-[#D5C7B5] shadow-lg px-3 py-2 rounded-full transition-all duration-300 text-[#4A3B32] ${
          isExpanded ? 'pr-4' : ''
        }`}
      >
        <button
          onClick={onTogglePlay}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isPlaying 
              ? 'bg-[#5B705F] text-[#FAF6F0] shadow-sm hover:bg-[#4E6252]' 
              : 'bg-[#D9CEBF] text-[#4A3B32] hover:bg-[#C8BAA7]'
          }`}
          aria-label={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik Latar'}
        >
          {isPlaying ? (
            <Disc3 className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-left hidden sm:block focus:outline-none"
        >
          <div className="text-[11px] font-semibold text-[#5B705F] uppercase tracking-wider leading-none">
            {isPlaying ? 'Musik Aktif' : 'Musik Latar'}
          </div>
          <div className="text-xs font-serif text-[#4A3B32] font-medium leading-tight truncate max-w-[140px]">
            Villa Sentul Breeze
          </div>
        </button>

        {isExpanded && (
          <div className="flex items-center gap-2 pl-2 border-l border-[#D5C7B5]/60 animate-fadeIn">
            <button
              onClick={handleToggleMute}
              className="p-1 hover:text-[#5B705F] transition-colors"
              aria-label={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-700" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1.5 accent-[#5B705F] bg-[#D9CEBF] rounded-lg cursor-pointer"
              aria-label="Volume Musik"
            />
          </div>
        )}
      </div>
    </div>
  );
};
