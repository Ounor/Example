import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import { Icon } from 'native-base'
import HistoryScreen from '../Containers/HistoryScreen'
import SignUpScreen from '../Containers/SignUpScreen'
import TransactionsScreen from '../Containers/TransactionsScreen'
import AuthScreen from '../Containers/AuthScreen'
import LaunchScreen from '../Containers/LaunchScreen'
import MainScreen from '../Containers/MainScreen'
import SearchScreen from '../Containers/SearchScreen'
import styles from './Styles/NavigationStyles'
import React from 'react'

const TabNavigator = createBottomTabNavigator({
  MainScreen: {
    screen: MainScreen,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({tintColor}) => <Icon style={{ color: tintColor }} name='home' />,
      tabBarTestID: 'tabProfile'
    },
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    }
  },
  TransactionsScreen: {
    screen: TransactionsScreen,
    navigationOptions: {
      tabBarLabel:
        'Send',
      tabBarIcon: ({tintColor}) => <Icon style={{ color: tintColor }} name='send' />,
      tabBarTestID: 'tabProfile'
    }}
})

const PrimaryNav = createStackNavigator({
  LaunchScreen: { screen: LaunchScreen },
  AuthScreen: { screen: AuthScreen },
  SignUpScreen: { screen: SignUpScreen },
  HistoryScreen: { screen: HistoryScreen },
  TransactionsScreen: { screen: TransactionsScreen },
  SearchScreen: { screen: SearchScreen },
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
