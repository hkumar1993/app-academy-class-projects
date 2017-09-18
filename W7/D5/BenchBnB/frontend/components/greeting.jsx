import React from 'react'

class Greeting extends React.Component {
  constructor(props){
    super(props)
  }

  render(){
    if (this.props.currentUser){
      return (
        <div>
          <h3>Welcome { currentUser.username }</h3>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/#/signup'>Sign Up</Link>
          <Link to='/#/login'>Log In</Link>
        </div>
      )
    }
  }
}

export default Greeting
