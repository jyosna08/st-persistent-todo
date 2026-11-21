import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <p className="text-sm text-neutral-400 bg-neutral-950 border border-neutral-800 rounded-lg p-4 text-center">
        No tasks yet. Add one above to get started.
      </p>
    );
  }

  return (
    <ul className="space-y-2.5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </ul>
  );
}