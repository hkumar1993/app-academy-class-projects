import { RECEIVE_CURRENT_USER, RECEIVE_SESSION_ERRORS } from '../actions/session_actions'

const _emptyErrors = []

const SessionErrorsReducer = (state = _emptyErrors, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      return _emptyErrors

    case RECEIVE_SESSION_ERRORS:
      return action.errors

    default:
      return state
  }
}

export default SessionErrorsReducer
