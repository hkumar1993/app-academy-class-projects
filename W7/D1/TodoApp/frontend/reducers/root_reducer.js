import { combineReducers } from 'redux';
import todosReducer from './todos_reducer';
// import otherReducer from '';

const rootReducer = combineReducers({
  todos: todosReducer
});

export default rootReducer;
