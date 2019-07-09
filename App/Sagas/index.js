import { takeLatest, all } from 'redux-saga/effects'
import API from '../Services/Api'
import FixtureAPI from '../Services/FixtureApi'
import DebugConfig from '../Config/DebugConfig'

/* ------------- Types ------------- */

import { StartupTypes } from '../Redux/StartupRedux'
import { UserTypes } from '../Redux/UserRedux'
// import { PWTypes } from '../Redux/PWRedux'

/* ------------- Sagas ------------- */

import { startup } from './StartupSagas'
import { signUpRequest, getUser } from './UserSagas'
// import { signUpRequest } from './UserSagas'

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.
const api = DebugConfig.useFixtures ? FixtureAPI : API.create()

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
    takeLatest(UserTypes.SIGN_UP_REQUEST, signUpRequest, api),
    takeLatest(UserTypes.GET_USER_REQUEST, getUser, api)
  ])
}
