import React, {StyleSheet, PixelRatio} from 'react-native'

const BaseStyles = StyleSheet.create({
  textWhite: {
    color: 'white'
  },
  textMuted: {
    color: '#999'
  },
  textLessMuted: {
    color: '#555'
  },
  textDark: {
    color: '#222'
  },
  textBlack: {
    color: 'black'
  },
  textYellow: {
    color: '#FFCC00'
  },
  textPrimary: {
    color: '#de2a4e'
  },
  textPrimaryPress: {
    backgroundColor: 'transparent',
    color: '#c2183a'
  },
  textCenter: {
    textAlign: 'center'
  },
  textRight: {
    textAlign: 'right'
  },
  hiddenOverflow: {
    overflow: 'hidden'
  },
  fontExtraSmall: {
    fontSize: 13
  },
  fontSmall: {
    fontSize: 18
  },
  fontMedium: {
    fontSize: 21
  },
  fontLarge: {
    fontSize: 34
  },
  fontExtraLarge: {
    fontSize: 55
  },
  transparentBg: {
    backgroundColor: 'transparent'
  },
  whiteBg: {
    backgroundColor: 'white'
  },
  lightBg: {
    backgroundColor: '#f5f5f5'
  },
  mediumBg: {
    backgroundColor: '#ddd'
  },
  darkBg: {
    backgroundColor: '#777'
  },
  darkestBg: {
    backgroundColor: '#222'
  },
  blackBg: {
    backgroundColor: 'black'
  },
  primaryBg: {
    backgroundColor: '#c2183a'
  },
  translucentOverlay: {
    backgroundColor: 'rgba(0, 0, 0, .9)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  translucentContainer: {
    backgroundColor: 'rgba(0, 0, 0, .7)'
  },
  sansSerifRegular: {
    fontFamily: 'Lato'
  },
  sansSerifLight: {
    fontFamily: 'Lato-Light'
  },
  sansSerifMedium: {
    fontFamily: 'Lato-Medium'
  },
  sansSerifBold: {
    fontFamily: 'Lato-Bold'
  },
  serif: {
    fontFamily: 'Didot'
  },
  marginVert: {
    marginTop: 8,
    marginBottom: 8
  },
  marginHorz: {
    marginLeft: 8,
    marginRight: 8
  },
  marginLeft: {
    marginLeft: 8
  },
  marginRight: {
    marginRight: 8
  },
  marginBottom: {
    marginBottom: 8
  },
  paddingVertSmall: {
    paddingTop: 8,
    paddingBottom: 8
  },
  paddingHorzSmall: {
    paddingLeft: 8,
    paddingRight: 8
  },
  paddingVert: {
    paddingTop: 13,
    paddingBottom: 13
  },
  paddingHorz: {
    paddingLeft: 13,
    paddingRight: 13
  },
  paddingHorzLarge: {
    paddingLeft: 21,
    paddingRight: 21
  },
  paddingHorzExtraLarge: {
    paddingLeft: 34,
    paddingRight: 34
  },
  paddingVertLarge: {
    paddingTop: 21,
    paddingBottom: 21
  },
  paddingVertExtraLarge: {
    paddingTop: 34,
    paddingBottom: 34
  },
  textFieldWithIcon: {
    paddingLeft: 34
  },
  centeredCols: {
    justifyContent: 'center'
  },
  justifiedCols: {
    justifyContent: 'space-between'
  },
  verticalCenteredCols: {
    alignItems: 'center'
  },
  col1: {
    flex: 1
  },
  strikeThrough: {
    textDecorationLine: 'line-through'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  col: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  rightToLeft: {
    justifyContent: 'flex-end'
  },
  wrap: {
    flexWrap: 'wrap'
  },
  loadIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  icon: {
    width: 21
  },
  borderBottom: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#ccc'
  },
  borderBottomLight: {
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#efefef'
  },
  borderTop: {
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopColor: '#ccc'
  },
  borderTopLight: {
    borderTopWidth: 2 / PixelRatio.get(),
    borderTopColor: '#efefef'
  },
  top: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
  replyBox: {
    position: 'absolute',
    left: 0,
    right: 0
  },
  tabMargin: {
    marginBottom: 48
  },
  replyMargin: {
    marginBottom: 44
  },
  button: {
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Lato-Bold'
  },
  buttonDefault: {
    backgroundColor: '#eee',
    color: '#444'
  },
  buttonPrimary: {
    backgroundColor: '#de2a4e',
    color: 'white'
  },
  buttonPrimaryPress: {
    backgroundColor: '#c2183a',
    marginTop: 8
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    color: '#666'
  },
  noBorder: {
    borderWidth: 0
  },
  borderPrimary: {
    borderColor: '#de2a4e',
    borderWidth: 1 / PixelRatio.get()
  },
  borderLight: {
    borderColor: '#f5f5f5',
    borderWidth: 1 / PixelRatio.get()
  },
  borderMedium: {
    borderColor: '#ccc',
    borderWidth: 1 / PixelRatio.get()
  },
  borderDark: {
    borderColor: '#444',
    borderWidth: 1 / PixelRatio.get()
  },
  borderThick: {
    borderWidth: 2 / PixelRatio.get()
  },
  textInput: {
    backgroundColor: 'white',
    color: '#ccc',
    fontSize: 18,
    fontFamily: 'Lato-Medium',
    height: 28,
    padding: 3,
    borderWidth: 0
  },
  fillScreen: {
    alignItems: 'stretch'
  },
  searchIcon: {
    position: 'absolute',
    top: 8,
    left: 5
  },
  photoExtraSmall: {
    width: 21,
    height: 21
  },
  photoSmall: {
    width: 55,
    height: 55
  },
  photoMedium: {
    width: 89,
    height: 89
  },
  photoLarge: {
    width: 144,
    height: 144
  },
  hidden: {
    opacity: 0
  },
  articleImage: {
    width: 89,
    height: 89
  },
  newNotificationBadge: {
    backgroundColor: 'red',
    borderRadius: 5,
    width: 10,
    height: 10,
    position: 'absolute',
    bottom: -1,
    right: -1
  }
})

module.exports = BaseStyles
