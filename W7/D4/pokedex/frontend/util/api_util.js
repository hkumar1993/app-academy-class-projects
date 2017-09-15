
export const fetchAllPokemon = () => (
  $.ajax({
    method: 'GET',
    url: 'api/pokemon'
  })
);

export const fetchPokemon = (pokeid) => (
  $.ajax({
    method: 'GET',
    url: `api/pokemon/${pokeid}`
  })
);
