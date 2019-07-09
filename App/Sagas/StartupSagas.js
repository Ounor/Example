import { select } from 'redux-saga/effects'
import {userSelector} from '../Redux/UserRedux'

// exported to make available for tests
// export const selectAvatar = PWSelectors.selectAvatar

// process STARTUP actions
export function * startup (action) {
  yield select(userSelector)

  if (__DEV__ && console.tron) {
    // straight-up string logging
    console.tron.log(action)

  }
}
