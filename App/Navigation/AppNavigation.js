import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import HistoryScreen from '../Containers/HistoryScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import TransactionsScreen from '../Containers/TransactionsScreen'
import AuthScreen from '../Containers/AuthScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import MainScreen from '../Containers/MainScreen'
import styles from './Styles/NavigationStyles'

const TabNavigator = createBottomTabNavigator({
  MainScreen: { screen: MainScreen },
  TransactionsScreen: { screen: TransactionsScreen },
  HistoryScreen: { screen: HistoryScreen }
})
const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  AuthScreen: { screen: AuthScreen },
  SignUpScreen: { screen: SignUpScreen },
  HistoryScreen: { screen: HistoryScreen },
  TransactionsScreen: { screen: TransactionsScreen },
  MainScreen: { screen: TabNavigator }
}, {
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    title: 'Home',
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
