import values from 'lodash/values';

export const selectAllPokemon = (state) => (
  values(state.entities.pokemon)
);

export const selectPokeItems = (state) => (
  values(state.entities.items)
);

export const selectPokemonItem =  (state, itemId) => (
  state.entities.items[itemId]
);
