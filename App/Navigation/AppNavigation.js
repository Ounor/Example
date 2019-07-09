import { createStackNavigator, createAppContainer } from 'react-navigation'
import HistoryScreen from '../Containers/HistoryScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import TransactionsScreen from '../Containers/TransactionsScreen'
import AuthScreen from '../Containers/AuthScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

const PrimaryNav = createStackNavigator({
  HistoryScreen: { screen: HistoryScreen },
  SignUpScreen: { screen: SignUpScreen },
  TransactionsScreen: { screen: TransactionsScreen },
  AuthScreen: { screen: AuthScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
