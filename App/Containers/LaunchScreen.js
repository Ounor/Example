import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Container, Input, Content, Item, Label, Form, Toast , Button} from 'native-base'

// Styles
import Styles from './Styles/LaunchScreenStyles'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import UserActions from '../Redux/UserRedux'

class LaunchScreen extends Component {
  state = {
    showToast: false
  };
  componentDidMount () {
    const {user, errors} = this.props
    console.tron.log(this.props)
    if (!user.authToken) {
      this.props.navigation.navigate('SignUpScreen')
    } else if (user.authToken && !errors) {
      this.props.navigation.navigate('MainScreen')
    }
    // this.props.getUserRequest(user.authToken)
  }
  showToast = () => {
    Toast.show({
      text: 'Wrong password!',
      duration: 3000,
      type: 'danger'
    })
  }
  render () {
    return (
      <View style={Styles.mainContainer}>
        <Container>
          <Content>
            <Form>
              <Item floatingLabel>
                <Label>Username</Label>
                <Input />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input />
              </Item>
              <Button onPress={this.showToast}>
                <Text>Login</Text>
              </Button>
              <Button onPress={() => this.props.navigation.navigate('SignUpScreen')}>
                <Text>Sign Up</Text>
              </Button>
            </Form>
          </Content>
        </Container>
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
