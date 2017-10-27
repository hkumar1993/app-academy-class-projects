import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root'
import * as APIUtil from './actions/session_actions';
import { fetchBenches } from './actions/bench_actions'


document.addEventListener("DOMContentLoaded", ()=>{
  window.login = APIUtil.login
  window.signup = APIUtil.signup
  window.logout = APIUtil.logout
  window.fetchBenches = fetchBenches
  let preLoadedState = {}
  if(window.currentUser) {
    preLoadedState = Object.assign({}, preLoadedState, { session: { currentUser: window.currentUser }});
    delete window.currentUser
  }
  const store = configureStore(preLoadedState);
  // we don't put the store directly on the window because
  // it can be confusing when debugging, sometimes giving you access to state
  // when you shouldn't
  window.getState = store.getState;
  window.dispatch = store.dispatch; // just for testing!

  const root = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, root)
});
