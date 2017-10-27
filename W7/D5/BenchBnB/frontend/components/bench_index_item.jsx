import React from 'react'

const BenchIndexItem = ({ bench }) => {
  return (
    <li>
      description: {bench.description}
      <br/>
      lat: {bench.lat}
      <br/>
      long: {bench.lng}
      <br/>
    </li>
  )
}

export default BenchIndexItem
