import React, {StyleSheet, Dimensions} from 'react-native'

const window = Dimensions.get('window')

const MessageStyles = StyleSheet.create({
  item: {
    backgroundColor: '#007AFF',
    flex: 2
  },
  actionBtn: {
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'transparent'
  },
  contentContainer: {
    borderRadius: 8
  },
  blueBg: {
    backgroundColor: '#007AFF'
  },
  userInactivePhoto: {
    opacity: .5
  },
  activeUserIcon: {
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    width: 13,
    height: 13,
    borderRadius: 5,
    position: 'absolute',
    bottom: 8,
    right: 8
  },
  media: {
    width: window.width / 2,
    height: window.height / 4
  }
});

module.exports = MessageStyles
