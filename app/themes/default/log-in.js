import React, {StyleSheet} from 'react-native'

const LogInStyles = StyleSheet.create({
  logInLogo: {
    backgroundColor: 'transparent',
    color: '#000',
    fontFamily: 'Didot',
    fontWeight: 'bold',
    fontSize: 36,
    marginTop: 50,
    marginBottom: 50,
    textAlign: 'center'
  },
  textField: {
    backgroundColor: 'white',
    color: '#444',
    fontSize: 13,
    fontFamily: 'Lato-Medium',
    padding: 3,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1
  },
  textFieldDisabled: {
    backgroundColor: '#f8f8f8',
    color: '#666',
    fontSize: 13,
    fontFamily: 'Lato-Medium',
    padding: 3,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1
  },
  facebookBtnPress: {
    backgroundColor: '#3B579D',
    marginTop: 8
  },
  facebookBtn: {
    backgroundColor: '#3B579D',
    color: '#fff'
  }
})

module.exports = LogInStyles
