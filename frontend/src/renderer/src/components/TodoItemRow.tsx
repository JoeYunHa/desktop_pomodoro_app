export interface TodoItem {
  id: string;
  title: string;
  pomodoroGoal: number;
  urgency: 'low' | 'high';
  importance: 'low' | 'high';
  completed?: boolean;
}

interface TodoItemRowProps {
  item: TodoItem;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onComplete: (id: string) => void;
}

export function TodoItemRow({ item, isSelected, onSelect, onComplete }: TodoItemRowProps) {
  return (
    <div
      className={`flex items-center gap-2 py-2 px-3 rounded transition-colors cursor-pointer ${
        isSelected ? 'bg-[#6b7c3f] bg-opacity-5' : 'hover:bg-gray-50'
      }`}
      onClick={() => onSelect(item.id)}
    >
      <input
        type="checkbox"
        checked={item.completed || false}
        onChange={(e) => {
          e.stopPropagation();
          onComplete(item.id);
        }}
        className="w-4 h-4 rounded border-gray-300 text-[#6b7c3f] focus:ring-[#6b7c3f] cursor-pointer"
      />
      
      <span className={`flex-1 text-sm truncate ${item.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
        {item.title}
      </span>
      
      <span className="text-xs font-medium text-[#6b7c3f] border border-[#6b7c3f] px-2 py-0.5 rounded">
        P×{item.pomodoroGoal}
      </span>
    </div>
  );
}
