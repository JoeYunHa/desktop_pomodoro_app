import { Plus } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  seconds: number;
}

interface PresetsProps {
  presets: Preset[];
  activePresetId?: string;
  onSelectPreset: (preset: Preset) => void;
  onAddPreset: () => void;
  onEditPresets: () => void;
}

export function Presets({
  presets,
  activePresetId,
  onSelectPreset,
  onAddPreset,
  onEditPresets,
}: PresetsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center flex-wrap justify-center gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelectPreset(preset)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
              activePresetId === preset.id
                ? 'bg-[#6b7c3f] text-white border border-[#556030]'
                : 'bg-gray-100 text-gray-700 border border-transparent hover:bg-gray-200'
            }`}
          >
            {preset.name}
          </button>
        ))}
        
        <button
          onClick={onAddPreset}
          className="px-4 py-2 text-sm font-medium rounded-full bg-gray-100 text-gray-700 border border-transparent hover:bg-gray-200 transition-all flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add preset
        </button>
      </div>
      
      <button
        onClick={onEditPresets}
        className="text-sm text-[#6b7c3f] hover:text-[#556030] font-medium"
      >
        Edit presets
      </button>
    </div>
  );
}
