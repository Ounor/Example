import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import UserActions from '../Redux/UserRedux'
import { Text, View } from 'react-native'
import { Container, Input, Item, Label, Right, Left, Toast, Icon, Button, Header } from 'native-base'
import { connect } from 'react-redux'

import Styles from './Styles/SignUpScreenStyle'

class SignUpScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: {
        email: '',
        name: '',
        pass: '',
        checkPass: ''
      }
    }
  }

  componentDidUpdate (): void {
    const { errors } = this.props
    if (errors) {
      Toast.show({
        text: errors,
        duration: 3000,
        type: 'danger'
      })
    }
  }

  handleSignUp = () => {
    const { name, pass, checkPass, email } = this.state.user
    const { signUpRequest } = this.props
    if (name && pass && checkPass && email) {
      if (checkPass !== pass) {
        Toast.show({
          text: 'Passwords not identical',
          duration: 3000,
          type: 'danger'
        })
      } else {
        signUpRequest(name, pass, email)
      }
    } else {
      Toast.show({
        text: 'All fields are required',
        duration: 3000,
        type: 'danger'
      })
    }
  }

  handleFocus = () => {
    this.props.clearErrors()
  }

  handleChangeFor = (propertyName) => (event) => {
    const { text } = event.nativeEvent
    const userData = {
      ...this.state.user,
      [propertyName]: text
    }
    this.setState({ user: userData })
  }

  render () {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Right />
        </Header>
        <Container style={Styles.container}>
          <Text style={Styles.welcomeText}>Sign Up</Text>
          <View style={Styles.signUpForm}>
            <Item inlineLabel>
              <Label>Name</Label>
              <Input
                value={this.state.user.name}
                onFocus={this.handleFocus}
                onChange={this.handleChangeFor('name')}
              />
            </Item>
            <Item inlineLabel>
              <Label>Email</Label>
              <Input
                value={this.state.user.email}
                onFocus={this.handleFocus}
                onChange={this.handleChangeFor('email')}
              />
            </Item>
            <Item inlineLabel>
              <Label>Password</Label>
              <Input
                textContentType={'password'}
                secureTextEntry
                value={this.state.user.pass}
                onFocus={this.handleFocus}
                onChange={this.handleChangeFor('pass')}
              />
            </Item>
            <Item inlineLabel>
              <Label>Confirm Password</Label>
              <Input
                textContentType={'password'}
                secureTextEntry
                value={this.state.user.checkPass}
                onFocus={this.handleFocus}
                onChange={this.handleChangeFor('checkPass')}
              />
            </Item>
            <Button
              style={Styles.btnGroup}
              primary
              onPress={() => this.handleSignUp()}
              full
              light>
              <Text>Registration</Text>
            </Button>
          </View>
        </Container>
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
  signUpRequest: bindActionCreators(UserActions.signUpRequest, dispatch),
  clearErrors: bindActionCreators(UserActions.clearErrors, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen)
