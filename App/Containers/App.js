import '../Config'
import DebugConfig from '../Config/DebugConfig'
import React, { Component } from 'react'
import { Provider } from 'react-redux'
import RootContainer from './RootContainer'
import createStore from '../Redux'
import { persistStore } from 'redux-persist'
import { Root, Spinner } from 'native-base'

// create our store
const store = createStore()

/**
 * Provides an entry point into our application.  Both index.ios.js and index.android.js
 * call this component first.
 *
 * We create our Redux store here, put it into a provider and then bring in our
 * RootContainer.
 *
 * We separate like this to play nice with React Native's hot reloading.
 */
class App extends Component {
  state = { rehydrated: false }

  componentWillMount () {
    persistStore(store, {}, () => {
      this.setState({ rehydrated: true })
    })
  }
  render () {
    if (!this.state.rehydrated) {
      return <Spinner color='#3b5998' style={{ marginTop: '100%' }} />
    }
    return <Provider store={store}>
      <Root>
        <RootContainer />
      </Root>
    </Provider>
  }
}

// allow reactotron overlay for fast design in dev mode
export default DebugConfig.useReactotron
  ? console.tron.overlay(App)
  : App
