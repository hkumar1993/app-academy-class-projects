export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_TODO = 'RECEIVE_TODO';

export function receiveTodos(todos) {
  return {
    type: RECEIVE_TODOS,
    todos
  };
}

export function receiveTodo(todo) {
  return {
    type: RECEIVE_TODO,
    todo
  };
}
