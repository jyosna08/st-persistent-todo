export function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO': {
      const trimmedText = action.payload.trim();
      if (!trimmedText) {
        return state;
      }

      const newTodo = {
        id: Date.now(),
        text: trimmedText,
        completed: false,
      };

      return [newTodo, ...state];
    }

    case 'TOGGLE_TODO': {
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    }

    case 'DELETE_TODO': {
      return state.filter((todo) => todo.id !== action.payload);
    }

    case 'CLEAR_COMPLETED': {
      return state.filter((todo) => !todo.completed);
    }

    default:
      return state;
  }
}