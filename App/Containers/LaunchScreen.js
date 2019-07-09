import React, { Component } from 'react'
import { ScrollView, Text, Image, View } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserActions from '../Redux/UserRedux'

class LaunchScreen extends Component {
  componentDidMount () {
    const {user} = this.props
    if (!user.authToken) {
      this.props.navigation.navigate('SignUpScreen')
    }
    this.props.getUserRequest(user.authToken)
  }

  render () {
    console.tron.log(this.props.errors)

    return (
      <View style={styles.mainContainer}>
        <Image source={Images.background} style={styles.backgroundImage} resizeMode='stretch' />
        <ScrollView style={styles.container}>
          <View style={styles.centered}>

          </View>

          <View style={styles.section} >

          </View>

        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    errors: state.user.errors
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserRequest: bindActionCreators(UserActions.getUserRequest, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
