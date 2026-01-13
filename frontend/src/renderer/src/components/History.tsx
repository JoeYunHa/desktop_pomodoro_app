import { Clock, CheckCircle2 } from 'lucide-react';

interface HistoryItem {
  id: string;
  type: 'pomodoro' | 'todo';
  title: string;
  completedAt: Date;
  duration?: number; // in minutes, for pomodoros
}

interface HistoryProps {
  items: HistoryItem[];
}

export function History({ items }: HistoryProps) {
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="h-full flex flex-col p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">History</h2>

      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-4">📊</div>
          <div className="text-lg font-medium text-gray-900 mb-2">No history yet</div>
          <div className="text-sm text-gray-500">
            Completed timers and to-dos will appear here
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.type === 'pomodoro' 
                      ? 'bg-[#6b7c3f] bg-opacity-10' 
                      : 'bg-green-100'
                  }`}>
                    {item.type === 'pomodoro' ? (
                      <Clock className="w-5 h-5 text-[#6b7c3f]" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                      <span className="text-xs text-gray-500">{formatDate(item.completedAt)}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.type === 'pomodoro' 
                        ? `${item.duration} minute session`
                        : 'To-do completed'
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
