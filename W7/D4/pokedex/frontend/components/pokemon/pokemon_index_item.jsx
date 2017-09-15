import React from 'react';
import { Link } from 'react-router-dom';

export const PokemonIndexItem = (props) => {
  const poke = props.poke;
  const pokeLink = `/pokemon/${poke.id}`;
  return (
    <li>
      <Link to={pokeLink}>
        {poke.name}
        <img src={poke.image_url} height="20px" />
      </Link>
    </li>
  );
};
