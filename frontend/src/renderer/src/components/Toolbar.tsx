import { Settings } from 'lucide-react';

interface ToolbarProps {
  activeTab: 'timer' | 'todo' | 'history';
  onTabChange: (tab: 'timer' | 'todo' | 'history') => void;
  onSettingsClick: () => void;
}

export function Toolbar({ activeTab, onTabChange, onSettingsClick }: ToolbarProps) {
  return (
    <div className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => onTabChange('timer')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            activeTab === 'timer'
              ? 'bg-[#6b7c3f] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Timer
        </button>
        <button
          onClick={() => onTabChange('todo')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            activeTab === 'todo'
              ? 'bg-[#6b7c3f] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          To-Do
        </button>
        <button
          onClick={() => onTabChange('history')}
          className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
            activeTab === 'history'
              ? 'bg-[#6b7c3f] text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          History
        </button>
      </div>
      
      <button
        onClick={onSettingsClick}
        className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Settings className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
