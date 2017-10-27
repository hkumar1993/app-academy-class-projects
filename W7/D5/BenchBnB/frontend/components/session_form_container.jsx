import React from 'react'
import { login, signup } from '../actions/session_actions'
import { connect } from 'react-redux'
import SessionForm from './session_form'

const mapStateToProps = (state, ownProps) => {
    console.log(ownProps);
    const loggedIn = !!state.session.currentUser
    const errors = state.errors.session
    return {
      loggedIn,
      errors,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  console.log(ownProps);
  const formType = ownProps.location.pathname.slice(1)
  const action = formType === 'login' ? login : signup
  return {
    processForm: user => dispatch(action(user)),
    formType
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm)
