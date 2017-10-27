import React from 'react'
import BenchMap from './bench_map'
import BenchIndex from './bench_index'

class Search extends React.Component {
  constructor(props) {
    super(props)
    console.log('Inside Search');
  }

  render(){
    return (
      <div id='search'>
        <BenchMap />
        <BenchIndex benches={this.props.benches} fetchBenches={this.props.fetchBenches}/>
      </div>
    )
  }
}

export default Search
