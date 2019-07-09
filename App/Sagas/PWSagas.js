// import { call, put } from 'redux-saga/effects'
// import { path } from 'ramda'
// import PWTypes from '../Redux/PWRedux'
//
// export function * createUser (api, action) {
//   const {username, password, email} = action
//   // make the call to the api
//   const response = yield call(api.getUser, username, password, email)
//
//   if (response.ok) {
//     console.tron.log(response)
//     // const firstUser = path(['data', 'items'], response)[0]
//     // const avatar = firstUser.avatar_url
//     // // do data conversion here if needed
//     // yield put(GithubActions.userSuccess(avatar))
//   } else {
//     yield put(PWTypes.createUserFailure())
//   }
// }
//
// export function * login (api, action) {
//   const {username, password, email} = action
//   // make the call to the api
//   const response = yield call(api.getUser, username, password, email)
//
//   if (response.ok) {
//     console.tron.log(response)
//     // const firstUser = path(['data', 'items'], response)[0]
//     // const avatar = firstUser.avatar_url
//     // // do data conversion here if needed
//     // yield put(GithubActions.userSuccess(avatar))
//   } else {
//     yield put(PWTypes.createUserFailure())
//   }
// }
