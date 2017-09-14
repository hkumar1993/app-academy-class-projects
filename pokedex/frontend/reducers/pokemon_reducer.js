
import { RECEIVE_ALL_POKEMON, RECEIVE_POKEMON } from '../actions/pokemon_actions';
import { merge } from 'lodash';

const pokemonReducer = (state = {}, action) => {
  Object.freeze(state);
  console.log("Action", action);
  switch(action.type) {
    case RECEIVE_ALL_POKEMON:
    console.log('test: ', action.test);
      return merge({}, state, action.pokemon);
    case RECEIVE_POKEMON:
      const pokemon = action.pokeDetails.pokemon;
      const items = action.pokeDetails.items;
      const itemIds = items.map(item => item.id);
      pokemon["item_ids"] = itemIds;
      const id = pokemon.id;
      const newState = merge({},state);
      newState[id] = pokemon;
      return newState;
    default:
      return state;
  }
};

export default pokemonReducer;
