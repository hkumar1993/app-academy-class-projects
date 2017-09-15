import { RECIEVE_ERRORS, CLEAR_ERRORS } from '../actions/error_actions.js';

const initialState = [];
const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECIEVE_ERRORS:
      return action.errors;
    case CLEAR_ERRORS:
      return initialState;
    default:
      return state;
  }
};
