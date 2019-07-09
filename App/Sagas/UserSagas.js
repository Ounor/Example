// @flow

import {put, call} from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'
import get from 'lodash/get'
import type {Saga} from 'redux-saga'

export function * signInRequest (
  api: Object,
  {username, password, email}: Object
): Saga<void> {
  const response =
    yield call(api.signUp, username, password, email)
  if (response.ok) {
    yield put(UserActions.signUpSuccess(response.data))
  } else {
    const errors = {status: response.status, message: response.data}
    yield put(UserActions.signUpFailure(errors))
  }
}

export function * signUpRequest (
  api: Object,
  {username, password, email}: Object
): Saga<void> {
  const response =
    yield call(api.signIn, email, password)
  if (response.ok) {
    yield put(UserActions.signInSuccess(response.data))
  } else {
    const errors = {status: response.status, message: response.data}
    yield put(UserActions.signInFailure(errors))
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
    console.tron.log(data)
    yield put(UserActions.getUserSuccess(data))
  } else {
    const errors = {status: response.status, message: response.data}
    yield put(UserActions.getUserFailure(errors))
  }
}
