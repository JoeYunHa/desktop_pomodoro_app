import { X } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: {
    sound: boolean;
    notifications: boolean;
    alwaysOnTop: boolean;
    startOnLaunch: boolean;
  };
  onSettingChange: (key: string, value: boolean) => void;
}

export function SettingsPanel({ isOpen, onClose, settings, onSettingChange }: SettingsPanelProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-0 right-0 h-full w-80 bg-white border-l border-gray-200 shadow-xl z-50 flex flex-col">
      <div className="h-12 border-b border-gray-200 flex items-center justify-between px-4">
        <span className="text-sm font-medium text-gray-900">Settings</span>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          <SettingToggle
            label="Sound"
            description="Play sound when timer ends"
            checked={settings.sound}
            onChange={(checked) => onSettingChange('sound', checked)}
          />
          
          <SettingToggle
            label="Desktop notifications"
            description="Show notification when timer ends"
            checked={settings.notifications}
            onChange={(checked) => onSettingChange('notifications', checked)}
          />
          
          <SettingToggle
            label="Always on top"
            description="Keep timer window above other windows"
            checked={settings.alwaysOnTop}
            onChange={(checked) => onSettingChange('alwaysOnTop', checked)}
          />
          
          <SettingToggle
            label="Start on launch"
            description="Open app when system starts"
            checked={settings.startOnLaunch}
            onChange={(checked) => onSettingChange('startOnLaunch', checked)}
          />
        </div>
      </div>
    </div>
  );
}

interface SettingToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function SettingToggle({ label, description, checked, onChange }: SettingToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <div className="text-sm font-medium text-gray-900">{label}</div>
        <div className="text-xs text-gray-500 mt-1">{description}</div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#6b7c3f] focus:ring-offset-2 ${
          checked ? 'bg-[#6b7c3f]' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}
