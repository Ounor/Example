import { StyleSheet } from 'react-native'
import { Metrics, ApplicationStyles } from '../../Themes/'

export default StyleSheet.create({
  container: {
    marginTop: '60%'
  },
  logo: {
    marginTop: Metrics.doubleSection,
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    resizeMode: 'contain'
  },
  centered: {
    alignItems: 'center'
  },
  btnGroup: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  launchBtn: {
    margin: 4,
    width: 80,
    justifyContent: 'center',
    alignContent: 'center'
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFF'
  },
  signUpForm: {
    padding: 20
  },
  welcomeText: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20
  },
  transparentBtn: {opacity: 0.4}

})
