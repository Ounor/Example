import { StyleSheet } from 'react-native'
import { ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  userBlock: {
    flexDirection: 'row'
  },
  userBlockText: {
    flexDirection: 'column'
  },
  userBlockName: {
    flexDirection: 'column'
  },
  userBalance: {
    fontSize: 20,
    fontWeight: '600'
  },
  colon: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  mainColon: {
    flex: 1
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  transactionsPreview: {
    flex: 2
  },
  userContainer: {
    flexDirection: 'row',
    paddingBottom: 20
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff'
  },
  userEmail: {
    fontWeight: '700',
    color: '#ffffff'
  },
  logOut: {
    flex: 0.5,
    color: '#ffffff'
  },
  emptyCol: {
    flex: 0.5
  },
  profileImgContainer: {
    margin: 20,
    height: 122,
    width: 122,
    borderRadius: 90,
    borderWidth: 2,
    overflow: 'hidden',
    borderColor: '#ffffff'
  },
  profileImg: {
    height: 120,
    width: 120,
    overflow: 'hidden'
  },
  emptyTransactions: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 50
  },
  transactionBlock: {
    flexDirection: 'row',
    width: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 80
  },
  form: {
    padding: 10
  },
  button: {
    marginTop: 20
  },
  buttonText: {
    color: '#FFF'
  },
  mainScreenHeader: {
    flex: 0.6,
    backgroundColor: '#006fff',
    paddingBottom: 20
  }
})
