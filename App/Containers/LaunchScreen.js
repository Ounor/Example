import React, { Component } from 'react'
import { Spinner } from 'native-base'

// Styles
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserActions from '../Redux/UserRedux'

class LaunchScreen extends Component {
  componentDidMount () {
    const {user, getUserRequest} = this.props
    if (!user.authToken) {
      this.props.navigation.navigate('AuthScreen')
    } else {
      getUserRequest(user.authToken)
    }
  }

  render () {
    return <Spinner color='#3b5998' style={{ marginTop: '100%' }} />
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    errors: state.user.errors
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserRequest: bindActionCreators(UserActions.getUserRequest, dispatch),
  signInRequest: bindActionCreators(UserActions.signInRequest, dispatch),
  clearErrors: bindActionCreators(UserActions.clearErrors, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
