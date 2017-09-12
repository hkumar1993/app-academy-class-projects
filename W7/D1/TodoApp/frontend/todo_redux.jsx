import React from 'react';
import ReactDOM from 'react-dom';
import { receiveTodos, receiveTodo } from './actions/todo_actions';
import configureStore from './store/store';
import Root from './components/root';
import allTodos from './reducers/selectors';

window.receiveTodo = receiveTodo;
window.receiveTodos = receiveTodos;
window.allTodos = allTodos;


document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  window.store = store;
  console.log(store);
  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store}  />, root);
});
