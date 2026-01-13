import { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  pomodoros: number;
}

interface TaskListProps {
  tasks: Task[];
  onAddTask: (text: string) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  onIncrementPomodoro: (id: string) => void;
}

export function TaskList({
  tasks,
  onAddTask,
  onToggleTask,
  onDeleteTask,
}: TaskListProps) {
  const [newTaskText, setNewTaskText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskText.trim()) {
      onAddTask(newTaskText);
      setNewTaskText('');
    }
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white pixel-font tracking-wider">TASKS</h2>
        {totalCount > 0 && (
          <div className="text-sm text-zinc-400 pixel-font">
            {completedCount} / {totalCount} COMPLETED
          </div>
        )}
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="What are you working on?"
            className="flex-1 bg-zinc-800 border-4 border-zinc-700 rounded px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 pixel-font"
          />
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 border-4 border-red-700 text-white px-6 py-3 rounded transition-all flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:translate-x-[2px] hover:translate-y-[2px] pixel-font"
          >
            <Plus className="w-5 h-5" />
            ADD
          </button>
        </div>
      </form>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-12 text-zinc-500 pixel-font">
            <p>NO TASKS YET. ADD ONE TO GET STARTED!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-zinc-800 border-4 border-zinc-700 rounded p-4 flex items-center gap-3 group hover:border-zinc-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]"
            >
              {/* Checkbox */}
              <button
                onClick={() => onToggleTask(task.id)}
                className={`flex-shrink-0 w-7 h-7 border-4 flex items-center justify-center transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] ${
                  task.completed
                    ? 'bg-red-500 border-red-700'
                    : 'bg-zinc-900 border-zinc-600 hover:border-red-500'
                }`}
              >
                {task.completed && <Check className="w-5 h-5 text-white" strokeWidth={3} />}
              </button>

              {/* Task Text */}
              <div className="flex-1">
                <p
                  className={`text-white pixel-font ${
                    task.completed ? 'line-through text-zinc-500' : ''
                  }`}
                >
                  {task.text}
                </p>
                {task.pomodoros > 0 && (
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: task.pomodoros }).map((_, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 bg-red-500 border-2 border-red-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                      />
                    ))}
                    <span className="text-xs text-zinc-400 ml-1 pixel-font">
                      {task.pomodoros} POMODORO{task.pomodoros !== 1 ? 'S' : ''}
                    </span>
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => onDeleteTask(task.id)}
                className="flex-shrink-0 text-zinc-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}