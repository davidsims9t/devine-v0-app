import React, {StyleSheet, Dimensions} from 'react-native'

const window = Dimensions.get('window')

const FeedStyles = StyleSheet.create({
  stylistImg: {
    width: 35,
    height: 35
  },
  carouselThumbnail: {
    width: window.width,
    height: 377
  },
  carouselItemThumbnail: {
    width: window.width,
    height: 377
  },
  carousel: {
    width: window.width,
    height: window.height - 100,
    marginTop: 75
  },
  carouselItem: {
    width: window.width,
    height: window.height - 100
  },
  editButton: {
    backgroundColor: 'transparent',
    paddingLeft: 8
  },
  colContainer: {
    width: window.width / 2,
  },
  colImg: {
    height: 150
  },
  selectOption: {
    width: 14,
    height: 14,
    borderRadius: 7
  },
  iconText: {
    position: 'absolute',
    top: 5,
    left: 8,
    right: 0,
    bottom: 0
  },
  lightBoxClosePress: {
    position: 'absolute',
    top: 34,
    right: 13
  },
  gridColContainer: {
    width: window.width / 2,
    height: window.height / 2
  }
})

module.exports = FeedStyles
