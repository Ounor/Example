// @flow

import {put, call} from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import { NavigationActions } from 'react-navigation'
import type {Saga} from 'redux-saga'

export function * signInRequest (
  api: Object,
  {email, password}: Object
): Saga<void> {
  const response =
    yield call(api.signIn, email, password)
  if (response.ok) {
    yield put(UserActions.signInSuccess(response.data))
    const userInfo = yield call(api.getUser, response.data.id_token)
    if (userInfo.ok) {
      const data = userInfo.data.user_info_token
      yield put(UserActions.getUserSuccess(data))
      const transactions = yield call(api.getTransactions, response.data.id_token)
      if (transactions.ok) {
        yield put(UserActions.getTransactionsSuccess(transactions.data.trans_token))
        yield put(NavigationActions.navigate({ routeName: 'MainScreen' }))
      }
    }
  } else {
    const status = response.status
    const message = response.data
    yield put(UserActions.signInFailure({code: status, message: message}))
  }
}

export function * signUpRequest (
  api: Object,
  {username, password, email}: Object
): Saga<void> {
  const response =
    yield call(api.signUp, username, password, email)
  if (response.ok) {
    yield put(UserActions.signUpSuccess(response.data))
    const userInfo = yield call(api.getUser, response.data.id_token)
    if (userInfo.ok) {
      const data = userInfo.data.user_info_token
      yield put(UserActions.getUserSuccess(data))
      yield put(NavigationActions.navigate({ routeName: 'MainScreen' }))
    }
  } else {
    const status = response.status
    const message = response.data
    yield put(UserActions.signUpFailure({code: status, message: message}))
  }
}

export function * getUser (
  api: Object,
  {authToken}: Object
): Saga<void> {
  const response =
    yield call(api.getUser, authToken)
  if (response.ok) {
    const data = response.data.user_info_token
    const transactions = yield call(api.getTransactions, authToken)
    if (transactions.ok) {
      yield put(UserActions.getTransactionsSuccess(transactions.data.trans_token))
    }
    yield put(NavigationActions.navigate({ routeName: 'MainScreen' }))
    yield put(UserActions.getUserSuccess(data))
  } else {
    yield put(NavigationActions.navigate({ routeName: 'AuthScreen' }))
    const status = response.status
    const message = response.data
    yield put(UserActions.signInFailure({code: status, message: message}))
  }
}

export function * getUsers (
  api: Object,
  {filter, authToken}: Object
): Saga<void> {
  const response =
    yield call(api.getUsers, filter, authToken)
  if (response.ok) {
    const data = response.data
    // const transactions = yield call(api.getTransactions, authToken)
    // if (transactions.ok) { console.tron.log('tansaction loaded') }
    // yield put(NavigationActions.navigate({ routeName: 'MainScreen' }))
    yield put(UserActions.getUsersSuccess(data))
  } else {
    // yield put(NavigationActions.navigate({ routeName: 'LaunchScreen' }))
    const status = response.status
    const message = response.data
    yield put(UserActions.getUsersFailure({code: status, message: message}))
  }
}

export function * createTransaction (
  api: Object,
  {name, amount, authToken}: Object
): Saga<void> {
  const response =
    yield call(api.createTransaction, name, amount, authToken)
  if (response.ok) {
    const data = response.data
    yield put(UserActions.makeTransactionSuccess(data))
    const user = yield call(api.getUser, authToken)
    yield put(UserActions.getUserSuccess(user.data.user_info_token))
    const transactions = yield call(api.getTransactions, authToken)
    yield put(UserActions.getTransactionsSuccess(transactions.data.trans_token))
    yield put(NavigationActions.navigate({ routeName: 'MainScreen' }))
  } else {
    // yield put(NavigationActions.navigate({ routeName: 'LaunchScreen' }))
    const status = response.status
    const message = response.data
    yield put(UserActions.makeTransactionFailure({code: status, message: message}))
  }





}
