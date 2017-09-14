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
                  <li>
                    {poke.name}
                    <img src={poke.image_url} height="20px" />
                  </li>
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
