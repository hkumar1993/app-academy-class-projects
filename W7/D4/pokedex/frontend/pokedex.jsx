import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Main from './components/main.jsx';
import { HashRouter, Route } from 'react-router-dom';
import { fetchPokemon } from './util/api_util';
import { requestPokemon } from './actions/pokemon_actions';

document.addEventListener('DOMContentLoaded', () => {
  const store = configureStore();
  const root = document.getElementById('root');
  ReactDOM.render(<Main store={store} />, root);
  window.store = store;
  window.requestPokemon = requestPokemon;
  window.fetchPokemon = fetchPokemon;
});
