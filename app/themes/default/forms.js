const LABEL_COLOR = '#555'
const INPUT_COLOR = '#222'
const ERROR_COLOR = '#de2a4e'
const HELP_COLOR = '#999999'
const DISABLED_COLOR = '#545454'
const DISABLED_BACKGROUND_COLOR = '#f8f8f8'
const FONT_SIZE = 18
const FONT_WEIGHT = '500'

import React, {StyleSheet, Dimensions, PixelRatio} from 'react-native'
const window = Dimensions.get('window')

const FormStyles = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
    },
    error: {
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: 13,
      fontWeight: 'bold',
      textTransform: 'uppercase'
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      color: LABEL_COLOR,
      fontSize: 14,
      marginBottom: 8,
      fontWeight: 'bold'
    }
  },
  helpBlock: {
    normal: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      color: HELP_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 2
    }
  },
  errorBlock: {
    fontSize: FONT_SIZE,
    marginBottom: 2,
    color: ERROR_COLOR
  },
  textbox: {
    normal: {
      backgroundColor: 'white',
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      fontFamily: 'Lato-Regular',
      height: 28
    },
    multiline: {
      backgroundColor: 'white',
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      fontFamily: 'Lato-Regular',
      height: 233
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      fontFamily: 'Lato-Regular',
      height: 28
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 28,
      color: DISABLED_COLOR,
      backgroundColor: DISABLED_BACKGROUND_COLOR
    }
  },
  checkbox: {
    normal: {
      color: INPUT_COLOR,
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      color: INPUT_COLOR
    }
  },
  select: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      fontFamily: 'Lato-Regular',
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      fontFamily: 'Lato-Medium',
      height: 28
    }
  },
  datepicker: {
    normal: {
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      fontFamily: 'Lato-Medium',
      height: 28
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      fontFamily: 'Lato-Medium',
      height: 28
    }
  },
  imagePress: {
    backgroundColor: 'black',
  },
  imageContainer: {
    width: window.width / 3.3,
    height: 100
  },
  image: {
    width: window.width / 3.3,
    height: 100
  },
  customOptionTextbox: {
    backgroundColor: 'white',
    color: INPUT_COLOR,
    fontSize: FONT_SIZE,
    fontFamily: 'Lato-Regular',
    height: 15,
    borderWidth: 0
  },
  checkmarkContainer: {
    width: 34
  },
  articleImage: {
    width: 89,
    height: 89
  },
  formMarginBottom: {
    marginBottom: 50
  },
  eventImage: {
    height: 144
  },
  eventImagePlaceholder: {
    height: 144
  }
})

module.exports = FormStyles
