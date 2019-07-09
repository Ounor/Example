// @flow

import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
import Constants from '../Config/Constants'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  signUpRequest: ['username', 'password', 'email'],
  signUpSuccess: ['data'],
  signUpFailure: ['errors'],
  getUserRequest: ['authToken'],
  getUserSuccess: ['data'],
  getUserFailure: ['error'],
  signInRequest: ['email', 'password'],
  signInSuccess: ['data'],
  signInFailure: ['errors']
})

export const UserTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  id: null,
  name: null,
  email: null,
  balance: null,
  fetching: null,
  errors: null,
  transactionsList: null,
  authToken: null
})

/* ------------- Reducers ------------- */
export const signInRequest = (state) => {
  return state.merge({...state, fetching: true, errors: null, submit: false})
}
export const signInSuccess = (state, {data}) => {
  const {id_token} = data
  return state.merge({ ...state, fetching: false, error: null, authToken: id_token })
}
export const signInFailure = (state, errors) => state.merge({fetching: false, errors})

// ------- //

export const signUpRequest = (state) => {
  return state.merge({...state, fetching: true, errors: null, submit: false})
}
export const signUpSuccess = (state, {data}) => {
  const {id_token} = data
  return state.merge({ ...state, fetching: false, error: null, authToken: id_token })
}
export const signUpFailure = (state, errors) => state.merge({fetching: false, errors})

// ------- //

export const getUserRequest = (state) => {
  return state.merge({...state, fetching: true, errors: null, submit: false})
}
export const getUserSuccess = (state, {data}) => {
  return state.merge({ ...state, fetching: false, error: null, ...data })
}
export const getUserFailure = (state, errors) => state.merge({fetching: false, errors})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SIGN_UP_REQUEST]: signUpRequest,
  [Types.SIGN_UP_SUCCESS]: signUpSuccess,
  [Types.SIGN_UP_FAILURE]: signUpFailure,
  [Types.GET_USER_REQUEST]: getUserRequest,
  [Types.GET_USER_SUCCESS]: getUserSuccess,
  [Types.GET_USER_FAILURE]: getUserFailure,
  [Types.SIGN_IN_REQUEST]: signInRequest,
  [Types.SIGN_IN_SUCCESS]: signInSuccess,
  [Types.SIGN_IN_FAILURE]: signInFailure
})

/* ------------- Selectors ------------- */

export const userSelector = (state) => state.user.authToken
