import { RECEIVE_TODOS, RECEIVE_TODO, REMOVE_TODO } from '../actions/todo_actions';
import merge from 'lodash/merge';

const initialState = {};
// {
//   1: {
//     id: 1,
//     title: 'wash car',
//     body: 'with soap',
//     done: false
//   },
//   2: {
//     id: 2,
//     title: 'wash dog',
//     body: 'with shampoo',
//     done: true
//   },
// };

const todosReducer = (state = initialState, action) => {
  Object.freeze(state);
  let obj = {};
  switch (action.type) {
    case RECEIVE_TODOS:
      const newState = {};
      action.todos.forEach((el)=>{
        newState[el.id] = el;
      });
      return newState;

    case RECEIVE_TODO:
      obj = {};
      obj[action.todo.id] = action.todo;
      return merge({}, state, obj);

    case REMOVE_TODO:
      obj = {};
      for (let key in state) {
        if(key == action.todo.id){
          continue;
        } else {
          obj[key] = state[key];
        }
      }
      return obj;

    default:
      return state;
  }
};


export default todosReducer;
