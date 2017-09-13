import { requestTodos, newTodo, upTodo, delTodo } from '../util/todo_api_util';
import { receiveErrors, clearErrors } from './error_actions';

export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_TODO = 'RECEIVE_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';

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

export function removeTodo(todo) {
  return {
    type: REMOVE_TODO,
    todo
  };
}

export const fetchTodos = () => {
  return (dispatch) => {
      requestTodos().then((results)=>(
        dispatch(receiveTodos(results))
      ));
  };
};

export const createTodo = (todo) => {
  return (dispatch) => {
        return newTodo(todo).then(
          (result)=>{
            dispatch(clearErrors());
            dispatch(receiveTodo(result));
          },
          err => dispatch(receiveErrors(err.responseJSON)));
  };
};

export const updateTodo = (todo) => {
  return (dispatch) => {
        return upTodo(todo).then(
          (result)=>{
            dispatch(clearErrors());
            dispatch(receiveTodo(result));
          },
          err => dispatch(receiveErrors(err.responseJSON)));
  };
};

export const deleteTodo = (todo) => {
  return (dispatch) => {
        return delTodo(todo).then(
          (result)=>{
            dispatch(clearErrors());
            dispatch(removeTodo(todo));
          },
          err => dispatch(receiveErrors(err.responseJSON)));
  };
};
