import { RECEIVE_POKEMON } from '../actions/pokemon_actions';
import merge from 'lodash/merge';

const defaultState = {pokeDisplay: null, errors: {}, loading: {}};

const UIReducer = (state = defaultState, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POKEMON:
      return merge({}, state, {pokeDisplay: action.pokeDetails.pokemon.id});
    default:
      return state;
  }
};

export default UIReducer;
