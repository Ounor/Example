import React, { Component } from 'react'
import { Container, Header, Item, Input, Icon, Button, Text, Left, Toast } from 'native-base'
import {FlatList, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'

import Styles from './Styles/MainScreenStyle'
import { bindActionCreators } from 'redux'
import UserActions from '../Redux/UserRedux'

class SearchScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {filter: ''}
  }

  componentDidMount () {
    const { navigation, clearUsers } = this.props
    const item = navigation.getParam('item')
    clearUsers()
    if (item) {
    } else {

    }
  }

  componentDidUpdate () {
    const {errors} = this.props
    if (errors) {
      Toast.show({
        text: 'Can not be empty',
        duration: 3000,
        type: 'danger'
      })
    }
  }

  handlePickUser = (item) => {
    this.props.selectUser(item)
    this.props.navigation.navigate('TransactionsScreen', {item: item})
  }

  handleSearchInput = (text) => {
    this.setState({ filter: text })
    const {filter} = this.state
    const {token, getUsers} = this.props
    if (filter.length > 2) {
      getUsers(filter, token)
    }
  }
  handleClearUsers = () => {
    const { clearUsers } = this.props
    this.setState({filter: ''})
    clearUsers()
  }
  _keyExtractor = (item) => item.id.toString()

  render () {
    const {userList} = this.props
    return (
      <Container>
        <Header searchBar rounded>
          <Left style={{flex: 0.3, width: 40}}>
            <Button
              transparent
              onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Item style={{flex: 1, width: 200}}>
            <Icon name='ios-search' />
            <Input autoFocus value={this.state.filter} onChangeText={(text) => this.handleSearchInput(text)} placeholder='Search' />
              <Icon onPress={this.handleClearUsers} name='close' />
          </Item>
        </Header>
        { userList && userList.data.length === 0 && <Text style={{width: '100%', fontSize: 18, textAlign: 'center', marginTop: 20}}> Not found </Text>}
        { userList && userList !== '' ? <FlatList
          style={Styles.transactionsPreview}
          data={userList.data}
          keyExtractor={this._keyExtractor}
          renderItem={
            ({item}) => <TouchableOpacity onPress={() => this.handlePickUser(item)} style={{width: '100%'}}>
              <Text style={{fontSize: 18, textAlign: 'left', margin: 20}}>{item.name}</Text>
            </TouchableOpacity>
          }
        />
        : null
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.user.userList,
    token: state.user.authToken
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: bindActionCreators(UserActions.clearErrors, dispatch),
    clearUsers: bindActionCreators(UserActions.clearUsers, dispatch),
    getUsers: bindActionCreators(UserActions.getUsersRequest, dispatch),
    selectUser: bindActionCreators(UserActions.selectUser, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen)
