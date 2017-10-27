import React from 'react'
import { fetchBenches } from '../actions/bench_actions'
import { connect } from 'react-redux'
import Search from './search'

const mapStateToProps = state => ({
  benches: state.entities.benches
})

const mapDispatchToProps = dispatch => ({
  fetchBenches: () => dispatch(fetchBenches())
})

export default connect(mapStateToProps, mapDispatchToProps)(Search)
