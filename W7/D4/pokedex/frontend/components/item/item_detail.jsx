import React from 'react';

class ItemDetail extends React.Component{
  constructor(props) {
    super(props);
    console.log('ItemProps',props);
  }



  render(){
    const item = this.props.item;
    return (
      <div>
        {item.name}
        <ul>
          <li>Happiness: {item.happiness}</li>
          <li>Price: ${item.price}</li>
        </ul>
      </div>
    );
  }
}

export default ItemDetail;
