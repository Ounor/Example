import React, { Component } from 'react'
import { Image, View, FlatList } from 'react-native'
import {
  Header,
  Container,
  Card,
  Content,
  CardItem,
  Text,
  Body,
  Icon,
  Button
} from 'native-base'
import { connect } from 'react-redux'
import Styles from './Styles/MainScreenStyle'
import { bindActionCreators } from 'redux'
import UserActions from '../Redux/UserRedux'

class MainScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoadTransactions: true
    }
  }

  componentDidUpdate (nextProps) {
    if (this.props.user.id === null) {
      this.props.navigation.navigate('AuthScreen')
    }
  }

  _renderItem = ({ item }) => {
    return <CardItem>
      <Body style={Styles.transactionBlock}>
        <View style={Styles.transactionInfo}>
          <Text>To - {item.username} </Text>
          <Text>{item.date}</Text>
          <Text>Amount {item.amount}</Text>
        </View>
        <View style={Styles.colon}>
          <Button onPress={() => this.props.navigation.navigate('TransactionsScreen', {item: item})} iconRight>
            <Text>Repeat</Text>
            <Icon name='repeat' />
          </Button>
        </View>
      </Body>
    </CardItem>
  }

  repeatTransaction = (username, amount) => {
    const { token, createTransaction } = this.props
    createTransaction(username, amount, token)
  }

  _keyExtractor = (item) => item.id.toString()

  render () {
    const { isLoadTransactions } = this.state
    const { user, transactionsList } = this.props
    return (
      <Container>
        <Header/>
        <View style={Styles.mainScreenHeader}>
          <View style={[Styles.mainColon, Styles.userContainer]}>
            <View style={Styles.emptyCol}/>
            <View style={Styles.profileImgContainer}>
              <Image style={Styles.profileImg} source={{ uri: 'https://www.gstatic.com/webp/gallery/2.jpg' }}/>
            </View>
            <View style={[Styles.emptyCol, Styles.center]}>
              <Icon onPress={() => this.props.loginOut()} style={Styles.logOut} name='log-out'/>
            </View>
          </View>
          <View style={[Styles.colon, Styles.userBlockText]}>
            <Text style={Styles.userName}> {user.name}</Text>
            <Text style={Styles.userEmail}> {user.email}</Text>
          </View>
        </View>
        <View style={{ margin: 5 }}>
          <Card>
            <CardItem>
              <Text style={Styles.userBalance}> Balance: </Text>
              <Text style={Styles.userBalance}> {user.balance} PW</Text>
            </CardItem>
          </Card>
        </View>
        <Content>
          {transactionsList.data.length && isLoadTransactions
            ? <FlatList
              inverted
              data={transactionsList.data}
              extraData={this.state}
              keyExtractor={this._keyExtractor}
              renderItem={this._renderItem}
            />
            : <Text style={Styles.emptyTransactions}> Transactions no found</Text>
          }
        </Content>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    transactionsList: state.user.transactionsList,
    token: state.user.authToken,
    user: state.user,
    errors: state.user.errors
  }
}

const mapDispatchToProps = (dispatch) => ({
  createTransaction: bindActionCreators(UserActions.makeTransactionRequest, dispatch),
  getUserRequest: bindActionCreators(UserActions.getUserRequest, dispatch),
  loginOut: bindActionCreators(UserActions.loginOut, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)
