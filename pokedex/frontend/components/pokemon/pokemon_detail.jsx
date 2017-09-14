import React from 'react';

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
    console.log('Current Poke', this.props.pokemon[this.props.match.params.id - 1]);
    let poke = this.props.pokemon[this.props.match.params.id - 1];
    if(!poke){
      return null
    }
    // const curre ntPokemon = this.props.singlePokemon;
    // console.log(this.props);
    // console.log(currentPokemon);
    return(
      <div className="pokemon-details">
        <h1>{poke.name}</h1>
        <img src={poke.image_url} />
      </div>
    );
  }
}

export default PokemonDetail;
