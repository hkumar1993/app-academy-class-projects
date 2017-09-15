
import { RECEIVE_ALL_POKEMON } from '../actions/pokemon_actions';
import { merge } from 'lodash';

const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  console.log("Action", action);
  switch(action.type) {
    case RECEIVE_ALL_POKEMON:
    console.log('test: ', action.test);
      return action['pokemon'];
    default:
      return state;
  }
};

export default pokemonReducer;
