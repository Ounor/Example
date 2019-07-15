import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Input, Item, Label, Toast, Button } from 'native-base'

// Styles
import Styles from './Styles/LaunchScreenStyles'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserActions from '../Redux/UserRedux'

class AuthScreen extends Component {
  state = {
    showToast: false,
    loginIsActive: false,
    loginData: {
      email: null,
      password: null
    }
  };

  componentDidMount () {
    // this.props.clearErrors()
    // const {user, getUserRequest} = this.props
    // if (!user.authToken) {
    //   this.props.navigation.navigate('SignUpScreen')
    // } else if (user.authToken) {
    //   getUserRequest(user.authToken)
    // }
    // this.props.getUserRequest(user.authToken)
  }

  componentDidUpdate (): void {
    const {errors} = this.props
    if (errors) {
      Toast.show({
        text: errors,
        duration: 3000,
        type: 'danger'
      })
    }
  }
  signIn = () => {
    const {loginData} = this.state
    if (loginData.email && loginData.password) {
      this.props.signInRequest(loginData.email, loginData.password)
    } else {
      Toast.show({
        text: 'All fields are required',
        duration: 3000,
        type: 'danger'
      })
    }
  }
  handleChangeFor = (propertyName) => (event) => {
    const {text} = event.nativeEvent
    const loginData = {
      ...this.state.loginData,
      [propertyName]: text
    }
    this.setState({ loginData: loginData })
  }

  handleFocus = () => {
    this.props.clearErrors()
  }

  render () {
    return (
      <Container style={Styles.container}>
        <Text style={Styles.welcomeText}>Sign In</Text>
        <View style={Styles.signUpForm}>
          <Item inlineLabel>
            <Label>Email</Label>
            <Input textContentType={'username'}
              value={this.state.loginData.email}
              onFocus={this.handleFocus}
              onChange={this.handleChangeFor('email')}
            />
          </Item>
          <Item inlineLabel>
            <Label>Password</Label>
            <Input
              textContentType={'password'}
              secureTextEntry
              value={this.state.loginData.password}
              onFocus={this.handleFocus}
              onChange={this.handleChangeFor('password')} />
          </Item>
          <View style={Styles.btnGroup}>
            <Button success style={Styles.launchBtn} onPress={this.signIn}>
              <Text style={Styles.buttonText}>Login</Text>
            </Button>
            <Button primary style={Styles.launchBtn} onPress={() => this.props.navigation.navigate('SignUpScreen')}>
              <Text style={Styles.buttonText}>Sign Up</Text>
            </Button>
          </View>
        </View>
      </Container>
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
  getUserRequest: bindActionCreators(UserActions.getUserRequest, dispatch),
  signInRequest: bindActionCreators(UserActions.signInRequest, dispatch),
  clearErrors: bindActionCreators(UserActions.clearErrors, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen)
