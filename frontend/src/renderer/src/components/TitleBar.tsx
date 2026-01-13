import { Minus, Square, X } from 'lucide-react';

export function TitleBar() {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-4 select-none">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 bg-gradient-to-br from-[#6b7c3f] to-[#556030] rounded-md flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-900">Timer</span>
      </div>
      
      <div className="flex items-center gap-1">
        <button className="w-10 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
          <Minus className="w-4 h-4 text-gray-700" />
        </button>
        <button className="w-10 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors">
          <Square className="w-3 h-3 text-gray-700" />
        </button>
        <button className="w-10 h-8 flex items-center justify-center hover:bg-red-50 rounded transition-colors group">
          <X className="w-4 h-4 text-gray-700 group-hover:text-red-600" />
        </button>
      </div>
    </div>
  );
}
