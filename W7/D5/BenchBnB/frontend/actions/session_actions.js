import React from 'react';
import { postUser, postSession, deleteSession } from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveCurrentUser = (currentUser) => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: currentUser
});

export const receiveErrors = (errors) => ({
  type: RECEIVE_ERRORS,
  errors
});

export const login = (user) => (dispatch) => {
  console.log('inside login');
  console.log('User in action: ', user);
  postSession(user).
    then((currentUser) => dispatch(receiveCurrentUser(currentUser))).
    fail(({responseJSON: {errors}})=>dispatch(receiveErrors(errors)));
    // fail(({repsonseJSON: {errors}}) => dispatch(receiveErrors(errors)))
}

export const logout = () => (dispatch) => {
  deleteSession().
    then(() => dispatch(receiveCurrentUser(null))).
    fail(({responseJSON: {errors}})=>dispatch(receiveErrors(errors)));
    // fail(({repsonseJSON: {errors}}) => dispatch(receiveErrors(errors)))
}

export const signup = (user) => (dispatch) => {
  postUser(user).
    then((currentUser) => dispatch(receiveCurrentUser(currentUser))).
    fail(({responseJSON: {errors}})=>dispatch(receiveErrors(errors)));
    // fail(({repsonseJSON: {errors}}) => dispatch(receiveErrors(errors)))
}
