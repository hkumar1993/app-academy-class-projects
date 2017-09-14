import React from 'react';
import { connect } from 'react-redux';
import { requestPokemon } from '../../actions/pokemon_actions';
import { selectAllPokemon } from '../../reducers/selectors';
import PokemonDetail from './pokemon_detail';

const mapStateToProps = state => ({
  pokemon: selectAllPokemon(state),
  // const pokemon = state.entities.pokemon[state.ui.pokeDisplay];
  //
  // return{
  //   pokemon,
  //   // items: selectPokeItems(state, pokemon),
  //   loading: state.ui.loading.detailLoading
  // };
});

const mapDispatchToProps = dispatch => ({
  requestPokemon: pokeId => dispatch(requestPokemon(pokeId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonDetail);
