import React from 'react'
import { withRouter, Link, Redirect } from 'react-router-dom'

class SessionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: ''}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  update(field){
    return (e) => {
      this.setState({[field]: e.target.value })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const user = Object.assign({}, this.state)
    this.props.processForm(user)
  }

  render() {
      return (
        <div>
          <br />
          <h3>{this.props.formType === 'login' ? 'Log In' : 'Sign Up'}</h3>
          <form onSubmit={this.handleSubmit}>
            <label>Username</label>
            <input type='text' onChange={this.update('username')} value={this.state.username}/>
            <br />
            <label>Password</label>
            <input type='text' onChange={this.update('password')} value={this.state.password}/>
            <br />
            <input type='submit' />
          </form>
          <br />
          or <Link to={`/#/${this.props.formType === 'login' ? 'signup' : 'login'}`}>{this.props.formType === 'login' ? 'Sign Up' : 'Log In'}</Link>
        <ul>
          {this.props.errors.map((er)=><li>{er}</li>)}
        </ul>
      </div>
    )
  }
}

export default withRouter(SessionForm)
