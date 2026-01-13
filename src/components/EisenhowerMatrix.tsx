import { TodoItem, TodoItemRow } from './TodoItemRow';
import { InlineAddTodo } from './InlineAddTodo';

interface QuadrantProps {
  title: string;
  urgency: 'low' | 'high';
  importance: 'low' | 'high';
  items: TodoItem[];
  isAdding: boolean;
  selectedItemId: string | null;
  onAddClick: () => void;
  onAddSubmit: (title: string, pomodoroGoal: number, urgency: 'low' | 'high', importance: 'low' | 'high') => void;
  onAddCancel: () => void;
  onItemSelect: (id: string) => void;
  onItemComplete: (id: string) => void;
}

function Quadrant({
  title,
  urgency,
  importance,
  items,
  isAdding,
  selectedItemId,
  onAddClick,
  onAddSubmit,
  onAddCancel,
  onItemSelect,
  onItemComplete,
}: QuadrantProps) {
  const activeItems = items.filter((item) => !item.completed);
  const isLimitReached = activeItems.length >= 3;

  return (
    <div
      className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col min-h-[200px]"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isLimitReached && !isAdding) {
          onAddClick();
        }
      }}
    >
      <h3 className="text-sm font-medium text-gray-700 mb-3">{title}</h3>

      <div className="flex-1">
        {activeItems.length === 0 && !isAdding ? (
          <div className="flex items-center justify-center h-20 text-xs text-gray-400">
            Click to add
          </div>
        ) : (
          <div className="space-y-1">
            {activeItems.map((item) => (
              <TodoItemRow
                key={item.id}
                item={item}
                isSelected={selectedItemId === item.id}
                onSelect={onItemSelect}
                onComplete={onItemComplete}
              />
            ))}
          </div>
        )}

        {isAdding && (
          <InlineAddTodo
            onAdd={(title, pomodoroGoal) => onAddSubmit(title, pomodoroGoal, urgency, importance)}
            onCancel={onAddCancel}
          />
        )}

        {isLimitReached && !isAdding && (
          <div className="text-xs text-gray-400 mt-2">Max 3 items</div>
        )}
      </div>
    </div>
  );
}

interface EisenhowerMatrixProps {
  items: TodoItem[];
  selectedItemId: string | null;
  addingQuadrant: { urgency: 'low' | 'high'; importance: 'low' | 'high' } | null;
  onAddClick: (urgency: 'low' | 'high', importance: 'low' | 'high') => void;
  onAddSubmit: (title: string, pomodoroGoal: number, urgency: 'low' | 'high', importance: 'low' | 'high') => void;
  onAddCancel: () => void;
  onItemSelect: (id: string) => void;
  onItemComplete: (id: string) => void;
}

export function EisenhowerMatrix({
  items,
  selectedItemId,
  addingQuadrant,
  onAddClick,
  onAddSubmit,
  onAddCancel,
  onItemSelect,
  onItemComplete,
}: EisenhowerMatrixProps) {
  const urgentImportant = items.filter(
    (item) => item.urgency === 'high' && item.importance === 'high'
  );
  const notUrgentImportant = items.filter(
    (item) => item.urgency === 'low' && item.importance === 'high'
  );
  const urgentNotImportant = items.filter(
    (item) => item.urgency === 'high' && item.importance === 'low'
  );
  const notUrgentNotImportant = items.filter(
    (item) => item.urgency === 'low' && item.importance === 'low'
  );

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">To-Do</h2>
      </div>

      <div className="flex-1 relative px-8">
        {/* Axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between py-4">
          <span className="text-xs text-gray-500">High</span>
          <span className="text-xs text-gray-400 transform -rotate-90 origin-center whitespace-nowrap">
            Importance
          </span>
          <span className="text-xs text-gray-500">Low</span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-8 pb-2">
          <span className="text-xs text-gray-500">Low</span>
          <span className="text-xs text-gray-400">Urgency</span>
          <span className="text-xs text-gray-500">High</span>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-2 gap-6 h-full pb-8">
          {/* Top left: Not Urgent, Important */}
          <Quadrant
            title="Schedule"
            urgency="low"
            importance="high"
            items={notUrgentImportant}
            isAdding={addingQuadrant?.urgency === 'low' && addingQuadrant?.importance === 'high'}
            selectedItemId={selectedItemId}
            onAddClick={() => onAddClick('low', 'high')}
            onAddSubmit={onAddSubmit}
            onAddCancel={onAddCancel}
            onItemSelect={onItemSelect}
            onItemComplete={onItemComplete}
          />

          {/* Top right: Urgent, Important */}
          <Quadrant
            title="Do First"
            urgency="high"
            importance="high"
            items={urgentImportant}
            isAdding={addingQuadrant?.urgency === 'high' && addingQuadrant?.importance === 'high'}
            selectedItemId={selectedItemId}
            onAddClick={() => onAddClick('high', 'high')}
            onAddSubmit={onAddSubmit}
            onAddCancel={onAddCancel}
            onItemSelect={onItemSelect}
            onItemComplete={onItemComplete}
          />

          {/* Bottom left: Not Urgent, Not Important */}
          <Quadrant
            title="Eliminate"
            urgency="low"
            importance="low"
            items={notUrgentNotImportant}
            isAdding={addingQuadrant?.urgency === 'low' && addingQuadrant?.importance === 'low'}
            selectedItemId={selectedItemId}
            onAddClick={() => onAddClick('low', 'low')}
            onAddSubmit={onAddSubmit}
            onAddCancel={onAddCancel}
            onItemSelect={onItemSelect}
            onItemComplete={onItemComplete}
          />

          {/* Bottom right: Urgent, Not Important */}
          <Quadrant
            title="Delegate"
            urgency="high"
            importance="low"
            items={urgentNotImportant}
            isAdding={addingQuadrant?.urgency === 'high' && addingQuadrant?.importance === 'low'}
            selectedItemId={selectedItemId}
            onAddClick={() => onAddClick('high', 'low')}
            onAddSubmit={onAddSubmit}
            onAddCancel={onAddCancel}
            onItemSelect={onItemSelect}
            onItemComplete={onItemComplete}
          />
        </div>
      </div>
    </div>
  );
}
