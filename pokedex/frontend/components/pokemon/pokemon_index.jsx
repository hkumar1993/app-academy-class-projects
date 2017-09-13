import React from 'react';

class PokemonIndex extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.requestAllPokemon();
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.props.pokemon.map((poke)=>{
              return (
                <div>
                  <li>{poke.name}</li>
                  <img src={poke.image_url} height="20px" />
                </div>
              );
            })
          }
        </ul>
      </div>
    );
  }
}

export default PokemonIndex;
