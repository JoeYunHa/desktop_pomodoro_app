interface TimerDisplayProps {
  time: number; // in seconds
  maxTime: number; // in seconds
  presetName?: string;
}

export function TimerDisplay({ time, maxTime, presetName }: TimerDisplayProps) {
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((maxTime - time) / maxTime) * 100;
  const angle = (progress / 100) * 360;

  // Create SVG path for pie chart fill
  const createPiePath = (percentage: number) => {
    const angle = (percentage / 100) * 360;
    const radius = 140;
    const centerX = 160;
    const centerY = 160;
    
    // Convert angle to radians (starting from top, going clockwise)
    const radians = ((angle - 90) * Math.PI) / 180;
    
    // Calculate end point
    const endX = centerX + radius * Math.cos(radians);
    const endY = centerY + radius * Math.sin(radians);
    
    // Large arc flag (1 if angle > 180)
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    if (percentage === 0) {
      return '';
    }
    
    if (percentage >= 100) {
      // Full circle
      return `M ${centerX},${centerY} m 0,-${radius} a ${radius},${radius} 0 1,1 0,${radius * 2} a ${radius},${radius} 0 1,1 0,-${radius * 2}`;
    }
    
    // Create pie slice
    return `
      M ${centerX},${centerY}
      L ${centerX},${centerY - radius}
      A ${radius},${radius} 0 ${largeArcFlag},1 ${endX},${endY}
      Z
    `;
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative">
        <svg width="320" height="320" className="transform -rotate-0">
          {/* Background circle */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="#e5e7eb"
            strokeWidth="2"
            fill="white"
          />
          
          {/* Filled progress (pie chart style) */}
          <path
            d={createPiePath(progress)}
            fill="#6b7c3f"
            opacity="1"
          />
          
          {/* Progress ring border */}
          <circle
            cx="160"
            cy="160"
            r="140"
            stroke="#6b7c3f"
            strokeWidth="3"
            fill="none"
            strokeDasharray={`${(progress / 100) * (2 * Math.PI * 140)} ${2 * Math.PI * 140}`}
            strokeDashoffset={0}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
            transform="rotate(-90 160 160)"
          />
          
          {/* Center dot */}
          <circle
            cx="160"
            cy="160"
            r="6"
            fill="#6b7c3f"
          />
        </svg>
      </div>
      
      {/* Time display below */}
      <div className="text-center">
        <div className="text-6xl font-light text-gray-900 tabular-nums tracking-tight mb-2">
          {formatTime(time)}
        </div>
        {presetName && (
          <div className="text-sm text-gray-500 font-medium">
            {presetName}
          </div>
        )}
      </div>
    </div>
  );
}