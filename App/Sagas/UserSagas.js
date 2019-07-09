// @flow

import {put, call} from 'redux-saga/effects'
import UserActions from '../Redux/UserRedux'

import type {Saga} from 'redux-saga'

export function * signUpRequest (
  api: Object,
  {username, password, email}: Object
): Saga<void> {
  const response =
    yield call(api.signUp, username, password, email)
  if (response.ok) {
    yield put(UserActions.signUpSuccess(response.data))
  } else {
    const errors = {}
    for (let i = 0; i < response.data.length; i++) {
      errors[response.data[i].field] = response.data[i].message
    }
    yield put(UserActions.signUpFailure(errors))
  }
}

export function * getUser (
  api: Object,
  {authToken}: Object
): Saga<void> {
  const response =
    yield call(api.getUser, authToken)
  if (response.ok) {
    yield put(UserActions.getUserSuccess(response.data))
  } else {
    const errors = {status: response.status, message: response.data}
    yield put(UserActions.getUserFailure(errors))
  }
}
