import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Main from './components/main.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<Main store={store} />, root);
});
