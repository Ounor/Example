// @flow

import {createReducer, createActions} from 'reduxsauce'
import Immutable from 'seamless-immutable'
// import Constants from '../Config/Constants'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  signUpRequest: ['username', 'password', 'email'],
  signUpSuccess: ['data'],
  signUpFailure: ['error'],
  getUserRequest: ['authToken'],
  getUserSuccess: ['data'],
  getUserFailure: ['error'],
  signInRequest: ['email', 'password'],
  signInSuccess: ['data'],
  signInFailure: ['error'],
  getUsersRequest: ['filter', 'authToken'],
  getUsersSuccess: ['data'],
  getUsersFailure: ['error'],
  makeTransactionRequest: ['name', 'amount', 'authToken'],
  makeTransactionSuccess: ['data'],
  makeTransactionFailure: ['error'],
  getTransactionsSuccess: ['data'],
  getTransactionsFailure: ['error'],
  selectUser: ['data'],
  clearErrors: null,
  clearUsers: null,
  loginOut: null
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
  userList: null,
  transactionsList: {
    data: {}
  },
  authToken: null,
  selectedUser: {
    id: null,
    name: null
  }
})

/* ------------- Reducers ------------- */
export const signInRequest = (state) => {
  return state.merge({...state, fetching: true, errors: null, submit: false})
}
export const signInSuccess = (state, {data}) => {
  const {id_token} = data
  return state.merge({ ...state, fetching: false, errors: null, authToken: id_token })
}
export const signInFailure = (state, error) => {
  const errors = error.error.message
  return state.merge({fetching: false, errors: errors})
}

// ------- //

export const signUpRequest = (state) => {
  return state.merge({...state, fetching: true, errors: null, submit: false})
}
export const signUpSuccess = (state, {data}) => {
  const {id_token} = data
  return state.merge({ ...state, fetching: false, errors: null, authToken: id_token })
}
export const signUpFailure = (state, error) => {
  const errors = error.error.message
  return state.merge({fetching: false, errors: errors})
}
// ------- //

export const getUserRequest = (state) => {
  return state.merge({...state, fetching: true, errors: null, submit: false})
}
export const getUserSuccess = (state, {data}) => {
  return state.merge({ ...state, fetching: false, errors: null, ...data })
}
export const getUserFailure = (state, error) => {
  const errors = error.error.message
  return state.merge({fetching: false, errors: errors})
}
// ------- //

export const getUsersRequest = (state) => {
  return state.merge({...state, fetching: true, errors: null, submit: false})
}
export const getUsersSuccess = (state, {data}) => {
  return state.merge({ ...state, fetching: false, errors: null, userList: {data} })
}
export const getUsersFailure = (state, error) => {
  const errors = error.error.message
  return state.merge({fetching: false, errors: errors})
}

// ------- //
export const makeTransactionRequest = (state) => {
  return state.merge({...state, fetching: true, errors: null, submit: false})
}
export const makeTransactionSuccess = (state, {data}) => {
  return state.merge({ ...state, fetching: false, errors: null, transaction: {...data} })
}
export const makeTransactionFailure = (state, error) => {
  return state.merge({fetching: false, errors: error})
}

// ------- //

export const getTransactionsSuccess = (state, {data}) => {
  return state.merge({ ...state, fetching: false, errors: null, transactionsList: {data} })
}
export const getTransactionsFailure = (state, error) => {
  return state.merge({fetching: false, errors: error})
}

// ------- //

export const selectUser = (state, {data}) => {
  return state.merge({...state, selectedUser: data})
}
export const clearErrors = (state) => {
  return state.merge({...state, errors: null})
}
export const clearUsers = (state) => {
  return state.merge({...state, userList: null})
}
export const loginOut = (state) => {
  return state.merge(INITIAL_STATE)
}

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
  [Types.SIGN_IN_FAILURE]: signInFailure,
  [Types.GET_USERS_REQUEST]: getUsersRequest,
  [Types.GET_USERS_SUCCESS]: getUsersSuccess,
  [Types.GET_USERS_FAILURE]: getUsersFailure,
  [Types.MAKE_TRANSACTION_REQUEST]: makeTransactionRequest,
  [Types.MAKE_TRANSACTION_SUCCESS]: makeTransactionSuccess,
  [Types.MAKE_TRANSACTION_FAILURE]: makeTransactionFailure,
  [Types.GET_TRANSACTIONS_SUCCESS]: getTransactionsSuccess,
  [Types.GET_TRANSACTIONS_FAILURE]: getTransactionsFailure,
  [Types.CLEAR_ERRORS]: clearErrors,
  [Types.CLEAR_USERS]: clearUsers,
  [Types.SELECT_USER]: selectUser,
  [Types.LOGIN_OUT]: loginOut
})

/* ------------- Selectors ------------- */

export const userSelector = (state) => state.user.authToken
