import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import { thunk } from '../middleware/thunk';

// const configureStore = createStore(rootReducer, {});

const configureStore = (initialState = {} ) => {
  const store = createStore(rootReducer, initialState, applyMiddleware(thunk));
  return store;
};


export default configureStore;
