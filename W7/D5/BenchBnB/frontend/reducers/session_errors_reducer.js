import React from 'react';
import { RECEIVE_CURRENT_USER, RECEIVE_ERRORS } from '../actions/session_actions';

const _emptyErrors = [];

const SessionErrorsReducer = (state = _emptyErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_ERRORS:
      const errors = action.errors;
      return errors
    case RECEIVE_CURRENT_USER:
      return _emptyErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
