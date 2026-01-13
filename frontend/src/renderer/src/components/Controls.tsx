import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

interface ControlsProps {
  isActive: boolean;
  soundEnabled: boolean;
  onToggle: () => void;
  onReset: () => void;
  onSoundToggle: () => void;
}

export function Controls({
  isActive,
  soundEnabled,
  onToggle,
  onReset,
  onSoundToggle,
}: ControlsProps) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onReset}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          title="Reset (R)"
        >
          <RotateCcw className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={onToggle}
          className="w-20 h-20 flex items-center justify-center rounded-full bg-[#6b7c3f] hover:bg-[#556030] shadow-lg hover:shadow-xl transition-all"
          title={isActive ? 'Pause (Space)' : 'Start (Space)'}
        >
          {isActive ? (
            <Pause className="w-8 h-8 text-white" fill="white" />
          ) : (
            <Play className="w-8 h-8 text-white ml-1" fill="white" />
          )}
        </button>
        
        <button
          onClick={onSoundToggle}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          title="Toggle sound"
        >
          {soundEnabled ? (
            <Volume2 className="w-5 h-5 text-gray-600" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      
      <div className="flex items-center gap-4 text-xs text-gray-500">
        <span>Space = Start/Pause</span>
        <span>|</span>
        <span>R = Reset</span>
      </div>
    </div>
  );
}
