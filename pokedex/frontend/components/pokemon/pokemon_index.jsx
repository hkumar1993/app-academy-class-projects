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
          <li>Testing</li>
        </ul>
      </div>
    );
  }
}

export default PokemonIndex;
