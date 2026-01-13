import { useState, useEffect } from 'react';
import { TitleBar } from './components/TitleBar';
import { Toolbar } from './components/Toolbar';
import { TimerDisplay } from './components/TimerDisplay';
import { Controls } from './components/Controls';
import { Presets } from './components/Presets';
import { SettingsPanel } from './components/SettingsPanel';
import { EisenhowerMatrix } from './components/EisenhowerMatrix';
import { TodoItem } from './components/TodoItemRow';
import { History } from './components/History';
import { Play } from 'lucide-react';

interface Preset {
  id: string;
  name: string;
  seconds: number;
}

interface HistoryItem {
  id: string;
  type: 'pomodoro' | 'todo';
  title: string;
  completedAt: Date;
  duration?: number;
}

const DEFAULT_PRESETS: Preset[] = [
  { id: '1', name: '1 min', seconds: 60 },
  { id: '2', name: '5 min', seconds: 300 },
  { id: '3', name: '10 min', seconds: 600 },
  { id: '4', name: '25 min', seconds: 1500 },
  { id: '5', name: '45 min', seconds: 2700 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<'timer' | 'todo' | 'history'>('timer');
  const [settingsPanelOpen, setSettingsPanelOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1500);
  const [maxTime, setMaxTime] = useState(1500);
  const [isActive, setIsActive] = useState(false);
  const [activePresetId, setActivePresetId] = useState('4');
  const [settings, setSettings] = useState({
    sound: true,
    notifications: true,
    alwaysOnTop: false,
    startOnLaunch: false,
  });

  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      pomodoroGoal: 3,
      urgency: 'high',
      importance: 'high',
    },
    {
      id: '2',
      title: 'Review team feedback',
      pomodoroGoal: 2,
      urgency: 'low',
      importance: 'high',
    },
  ]);

  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [addingQuadrant, setAddingQuadrant] = useState<{
    urgency: 'low' | 'high';
    importance: 'low' | 'high';
  } | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  // Timer effect
  useEffect(() => {
    let interval: number | undefined;

    if (isActive && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);

      // Add to history
      const currentPreset = DEFAULT_PRESETS.find((p) => p.id === activePresetId);
      setHistory([
        {
          id: Date.now().toString(),
          type: 'pomodoro',
          title: currentPreset ? `${currentPreset.name} timer` : 'Timer',
          completedAt: new Date(),
          duration: Math.floor(maxTime / 60),
        },
        ...history,
      ]);

      if (settings.sound) {
        console.log('Timer complete!');
      }
      if (settings.notifications) {
        console.log('Show notification');
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, settings.sound, settings.notifications, maxTime, activePresetId, history]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && activeTab === 'timer') {
        e.preventDefault();
        setIsActive(!isActive);
      } else if (e.code === 'KeyR' && activeTab === 'timer') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isActive, maxTime, activeTab]);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(maxTime);
  };

  const handleSoundToggle = () => {
    setSettings({ ...settings, sound: !settings.sound });
  };

  const handleSelectPreset = (preset: Preset) => {
    setActivePresetId(preset.id);
    setMaxTime(preset.seconds);
    setTimeLeft(preset.seconds);
    setIsActive(false);
  };

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleAddTodoClick = (urgency: 'low' | 'high', importance: 'low' | 'high') => {
    setAddingQuadrant({ urgency, importance });
  };

  const handleAddTodoSubmit = (
    title: string,
    pomodoroGoal: number,
    urgency: 'low' | 'high',
    importance: 'low' | 'high'
  ) => {
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      title,
      pomodoroGoal,
      urgency,
      importance,
    };
    setTodos([...todos, newTodo]);
    setAddingQuadrant(null);
  };

  const handleAddTodoCancel = () => {
    setAddingQuadrant(null);
  };

  const handleSelectTodo = (id: string) => {
    setSelectedTodoId(selectedTodoId === id ? null : id);
  };

  const handleCompleteTodo = (id: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      setTodos(
        todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );

      // Add to history if completing
      if (!todo.completed) {
        setHistory([
          {
            id: Date.now().toString(),
            type: 'todo',
            title: todo.title,
            completedAt: new Date(),
          },
          ...history,
        ]);
      }
    }

    if (selectedTodoId === id) {
      setSelectedTodoId(null);
    }
  };

  const handleStartPomodoro = () => {
    if (selectedTodoId) {
      setActiveTab('timer');
      setIsActive(true);
    }
  };

  const currentPreset = DEFAULT_PRESETS.find((p) => p.id === activePresetId);
  const selectedTodo = todos.find((t) => t.id === selectedTodoId);

  return (
    <div
      className="relative h-screen w-screen bg-gray-50 flex flex-col overflow-hidden"
      style={{ width: '1100px', height: '720px', margin: '0 auto' }}
    >
      <TitleBar />
      <Toolbar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSettingsClick={() => setSettingsPanelOpen(!settingsPanelOpen)}
      />

      <div className="flex-1 overflow-hidden relative">
        <div
          className={`h-full transition-all duration-300 ${
            settingsPanelOpen ? 'mr-80' : 'mr-0'
          }`}
        >
          {activeTab === 'timer' && (
            <div className="h-full flex flex-col items-center justify-center px-8 py-12 gap-8">
              <TimerDisplay
                time={timeLeft}
                maxTime={maxTime}
                presetName={
                  currentPreset?.name ? `Pomodoro ${currentPreset.name}` : undefined
                }
              />

              <Controls
                isActive={isActive}
                soundEnabled={settings.sound}
                onToggle={handleToggle}
                onReset={handleReset}
                onSoundToggle={handleSoundToggle}
              />

              <Presets
                presets={DEFAULT_PRESETS}
                activePresetId={activePresetId}
                onSelectPreset={handleSelectPreset}
                onAddPreset={() => console.log('Add preset')}
                onEditPresets={() => console.log('Edit presets')}
              />
            </div>
          )}

          {activeTab === 'todo' && (
            <div className="h-full relative">
              <EisenhowerMatrix
                items={todos}
                selectedItemId={selectedTodoId}
                addingQuadrant={addingQuadrant}
                onAddClick={handleAddTodoClick}
                onAddSubmit={handleAddTodoSubmit}
                onAddCancel={handleAddTodoCancel}
                onItemSelect={handleSelectTodo}
                onItemComplete={handleCompleteTodo}
              />

              {selectedTodo && !selectedTodo.completed && (
                <div className="absolute bottom-8 right-8">
                  <button
                    onClick={handleStartPomodoro}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#6b7c3f] hover:bg-[#556030] rounded-lg shadow-lg transition-all"
                  >
                    <Play className="w-4 h-4" />
                    Start Pomodoro
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && <History items={history} />}
        </div>

        <SettingsPanel
          isOpen={settingsPanelOpen}
          onClose={() => setSettingsPanelOpen(false)}
          settings={settings}
          onSettingChange={handleSettingChange}
        />
      </div>
    </div>
  );
}
