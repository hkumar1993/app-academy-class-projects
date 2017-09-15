import React from 'react';
import ItemDetailContainer from '../item/item_detail_container';
import { Route, Link } from 'react-router-dom'

class PokemonDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {pokemon: null};
  }

  componentDidMount() {
    const params = this.props.match.params;
    this.props.requestPokemon(params.id);
  }

  componentWillReceiveProps(newProps){
    const params = newProps.match.params;
    if(params.id !== this.props.match.params.id){
      newProps.requestPokemon(params.id);
    }
  }

  render() {
    console.log('Detail props', this.props);
    // console.log('Current Poke', this.props.pokemon[this.props.match.params.id - 1]);
    const url = this.props.match.url;
    const poke = this.props.pokemon;
    const items = this.props.items;
    if(!poke){
      return null;
    }
    // const curre ntPokemon = this.props.singlePokemon;
    // console.log(this.props);
    // console.log(currentPokemon);
    return(
      <div className="pokemon-details">
        <h1>{poke.name}</h1>
        <img src={poke.image_url} />
        <h2>Attack: {poke.attack}</h2>
        <h2>Defense: {poke.defense}</h2>
        <ul>
          {
            poke.moves.map(move=><li key={move}>{move}</li>)
          }
        </ul>
        <div>
          <ul className="pokeItems">
            {
              items.map((item)=>{
                return (
                <li key={item.name}>
                  <Link to={`${url}/item/${item.id}`}>
                    <img src={item.image_url} height="30px"/>
                  </Link>
                </li>
                );
              })
            }
          </ul>
          <Route path="/pokemon/:pokemonId/item/:itemId" component={ItemDetailContainer} />
        </div>
      </div>
    );
  }
}

export default PokemonDetail;
