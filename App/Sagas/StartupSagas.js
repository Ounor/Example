import { select } from 'redux-saga/effects'
import {userSelector} from '../Redux/UserRedux'
import { persistStore } from 'redux-persist'

// exported to make available for tests
// export const selectAvatar = PWSelectors.selectAvatar

// process STARTUP actions
export function * startup (action) {
  yield select(userSelector)

  if (__DEV__ && console.tron) {
    // straight-up string logging
  }
}
