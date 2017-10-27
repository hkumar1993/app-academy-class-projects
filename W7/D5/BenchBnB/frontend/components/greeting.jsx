import React from 'react'
import { Link } from 'react-router-dom'

class Greeting extends React.Component {
  constructor(props) {
    super(props)
  }

  render(){
    if(this.props.currentUser){
      return (
        <div>
          <h3>Welcome {this.props.currentUser.username}</h3>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/signup'>Sign Up</Link>
          <Link to='/login'>Log In</Link>
        </div>
      )
    }
  }
}

export default Greeting
