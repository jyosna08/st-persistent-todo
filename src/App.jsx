import { useEffect, useReducer, useState } from 'react';
import { todoReducer } from './reducer/todoReducer';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const STORAGE_KEY = 'todo_app_items_v1';

function initTodos() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    }
  } catch {
    
  }
  return [];
}

export default function App() {
  const [todos, dispatch] = useReducer(todoReducer, [], initTodos);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      
    }
  }, [todos]);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.length - remainingCount;

  const visibleTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  function handleAddTodo(text) {
    dispatch({ type: 'ADD_TODO', payload: text });
  }

  function handleToggleTodo(id) {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }

  function handleDeleteTodo(id) {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }

  function handleClearCompleted() {
    dispatch({ type: 'CLEAR_COMPLETED' });
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-5">
        <h1 className="text-xl font-bold text-neutral-100">Todo List</h1>

        <TodoForm onAddTodo={handleAddTodo} />

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-b border-neutral-800 pb-3">
          <div className="flex gap-1.5">
            {['all', 'active', 'completed'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`text-xs px-3 py-1.5 rounded-lg capitalize border transition cursor-pointer ${
                  filter === tab
                    ? 'bg-neutral-800 border-blue-500 text-white'
                    : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <span className="text-xs text-neutral-400">
            {remainingCount} left
          </span>
        </div>

        <TodoList
          todos={visibleTodos}
          onToggleTodo={handleToggleTodo}
          onDeleteTodo={handleDeleteTodo}
        />

        {completedCount > 0 && (
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <span className="text-xs text-neutral-400">
              {completedCount} completed
            </span>
            <button
              type="button"
              onClick={handleClearCompleted}
              className="text-xs text-neutral-300 hover:text-white underline cursor-pointer"
            >
              Clear completed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}