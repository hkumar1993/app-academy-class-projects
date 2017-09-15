import { RECEIVE_POKEMON } from '../actions/pokemon_actions';

const itemReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_POKEMON:
      const items = action.pokeDetails.items;
      const itemsObject = {};
      items.forEach((item) => {
        itemsObject[item.id] = item;
      });
      return itemsObject;
    default:
      return state;
  }
};

export default itemReducer;
