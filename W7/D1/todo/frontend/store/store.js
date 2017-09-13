import { createStore } from 'redux';
import rootReducer from '../reducers/root_reducer';

// const configureStore = createStore(rootReducer, {});

const configureStore = (initialState = {} ) => {
  const store = createStore(rootReducer, initialState);
  return store;
};


export default configureStore;
