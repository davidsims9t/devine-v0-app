import React, {
  StyleSheet,
  Dimensions,
  PixelRatio
} from 'react-native'

const window = Dimensions.get('window')

const MediaStyles = StyleSheet.create({
  gridImage: {
    width: window.width / 4,
    height: window.width / 4
  },
  selectionGridItem: {
    width: window.width / 3.3,
    height: window.height / 4.2
  },
  currentImageContainer: {
    width: window.width,
    height: (window.height / 3) * 2,
    overflow: 'hidden'
  },
  controlsContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 34
  },
  controlBtn: {
		backgroundColor: "red",
    width: 54,
    height: 54,
		borderRadius: 27,
    borderColor: "white",
    borderWidth: 3
	},
  innerControlBtn: {
    backgroundColor: "darkred",
    margin: 7,
    width: 34,
    height: 34,
    borderRadius: 17
  },
  recordBarWrapper: {
    position: 'absolute',
    top: 55,
    left: 0,
    right: 0,
    height: 10
  },
  barGauge: {
    width: 0,
		height: 10,
		backgroundColor: 'red'
  },
  captureBtnContainer: {
    position: 'absolute',
    bottom: 70,
    left: 8,
    right: 8
  },
  openEditModalBtn: {
    position: 'absolute',
    right: 8,
    bottom: 8
  },
  closeModalBtn: {
    position: 'absolute',
    top: 8,
    left: 8,
    right: 8
  },
  cropRect: {
    position: 'absolute',
    backgroundColor: 'transparent',
    borderWidth: 3 / PixelRatio.get(),
    borderColor: 'white'
  }
})

module.exports = MediaStyles
