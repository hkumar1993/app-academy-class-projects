import React from 'react';
import { connect } from 'react-redux';
import { selectPokemonItem } from '../../reducers/selectors';
import ItemDetail from './item_detail';

const mapStateToProps = (state, ownProps) => {
  console.log('Own Props', ownProps);
  const itemId = ownProps.match.params.itemId;
  return {
    item: selectPokemonItem(state, itemId)
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemDetail);
