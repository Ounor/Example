import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import UserActions from '../Redux/UserRedux'
import { Text, View, Alert } from 'react-native'
import { Container, Input, Item, Header, Button, Toast, Label } from 'native-base'
import { connect } from 'react-redux'

import Styles from './Styles/MainScreenStyle'

class TransactionsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      amount: ''
    }
  }

  componentDidMount () {
    const { navigation } = this.props
    const item = navigation.getParam('item')
    if (item) {

    }
  }

  componentDidUpdate () {
    const { errors } = this.props
    if (errors) {
      Toast.show({
        text: errors.error.message,
        duration: 3000,
        type: 'danger'
      })
    }
  }

  handleTransaction = () => {
    const { createTransaction, user, selectedUser } = this.props
    const { amount } = this.state
    if (amount && user.name) {
      Alert.alert(
        'Confirm',
        `You agree to make a transaction in the amount ${amount} of the recipient ${selectedUser.name}?`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          { text: 'OK', onPress: () => createTransaction(selectedUser.name, amount, user.authToken) }
        ],
        { cancelable: false }
      )
    } else {
      Toast.show({
        text: 'User or amount fields can not be empty',
        duration: 3000,
        type: 'danger'
      })
    }
  }

  onChange = value => {
    this.setState({ amount: value.replace(/\D/g, '') })
  };

  render () {
    const { navigation } = this.props
    const item = navigation.getParam('item')
    console.tron.log(item)
    return (
      <Container>
        <Header />
        <View style={Styles.form}>
          <Item inlineLabel>
            <Label>Name</Label>
            <Input value={item ? item.username || item.name : null} onFocus={() => this.props.navigation.navigate('SearchScreen')} />
          </Item>
          <Item inlineLabel>
            <Label>Amount</Label>
            <Input keyboardType='numeric'
              value={item ? `${item.amount}` : `${this.state.amount}`}
              onChangeText={this.onChange} />
          </Item>
          <Button
            style={Styles.button}
            primary
            onPress={this.handleTransaction}
            full
          >
            <Text style={Styles.buttonText}>Send</Text>
          </Button>
        </View>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    selectedUser: state.user.selectedUser,
    errors: state.user.errors
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: bindActionCreators(UserActions.clearErrors, dispatch),
    createTransaction: bindActionCreators(UserActions.makeTransactionRequest, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen)
