import React from 'react';
import {PokemonIndexItem} from './pokemon_index_item';
import PokemonDetailContainer from './pokemon_detail_container';
import { Route } from 'react-router-dom';

class PokemonIndex extends React.Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    this.props.requestAllPokemon();
  }

  render() {
    const pokemon = this.props.pokemon;
    return (
      <div className="pokedex">
        <div className="menu">
          <ul>
            {
              pokemon.map((poke)=>(
                <PokemonIndexItem key={poke.name} poke={poke} />
              )
            )
          }
        </ul>
        </div>
        <Route path="/pokemon/:id" component={PokemonDetailContainer} />
      </div>
    );
  }
}

export default PokemonIndex;
