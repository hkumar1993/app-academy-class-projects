import React from 'react'
import BenchIndexItem from './bench_index_item'

class BenchIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.fetchBenches()
  }

  render() {
    const benches = Object.keys(this.props.benches).map(id => this.props.benches[id]);
    console.log(benches);
    return (
      <ul>
        {
          benches.map(bench => <BenchIndexItem bench={bench} key={bench.id}/>)
        }
      </ul>
    )
  }
}

export default BenchIndex
