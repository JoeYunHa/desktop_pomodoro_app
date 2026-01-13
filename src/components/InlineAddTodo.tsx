import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface InlineAddTodoProps {
  onAdd: (title: string, pomodoroGoal: number) => void;
  onCancel: () => void;
}

export function InlineAddTodo({ onAdd, onCancel }: InlineAddTodoProps) {
  const [title, setTitle] = useState('');
  const [pomodoroGoal, setPomodoroGoal] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title, pomodoroGoal);
      setTitle('');
      setPomodoroGoal(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-2 pt-2 border-t border-gray-200">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title..."
        autoFocus
        className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-[#6b7c3f] focus:border-[#6b7c3f]"
      />
      
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-600">P</span>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPomodoroGoal(Math.max(1, pomodoroGoal - 1))}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Minus className="w-3 h-3 text-gray-600" />
            </button>
            <span className="text-sm font-medium text-gray-900 w-6 text-center">{pomodoroGoal}</span>
            <button
              type="button"
              onClick={() => setPomodoroGoal(Math.min(10, pomodoroGoal + 1))}
              className="w-6 h-6 flex items-center justify-center rounded bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Plus className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="text-xs text-gray-600 hover:text-gray-900 px-2 py-1"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!title.trim()}
            className="text-xs font-medium text-white bg-[#6b7c3f] hover:bg-[#556030] px-3 py-1.5 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
