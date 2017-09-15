import React from 'react';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const _emptyUser = {
  currentUser: null
};

const SessionReducer = (state = _emptyUser, action) => {
  console.log('Action: ', action);
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser ? action.currentUser.current_user : null;
      return Object.assign({}, state, {currentUser})
    default:
      return state;
  }
};

export default SessionReducer;
