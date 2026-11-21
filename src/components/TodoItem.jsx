export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="bg-neutral-950 border border-neutral-800 rounded-lg px-4 py-3 flex items-center justify-between gap-3">
      <label className="flex items-center gap-3 flex-1 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-4 h-4 accent-blue-500 cursor-pointer"
        />
        <span
          className={`text-sm ${
            todo.completed ? 'line-through text-neutral-500' : 'text-neutral-100'
          }`}
        >
          {todo.text}
        </span>
      </label>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="text-xs text-neutral-400 hover:text-red-400 transition cursor-pointer"
      >
        Delete
      </button>
    </li>
  );
}