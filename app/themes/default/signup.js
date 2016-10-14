const LABEL_COLOR = '#000000';
const INPUT_COLOR = '#333333';
const ERROR_COLOR = '#a94442';
const HELP_COLOR = '#999999';
const BORDER_COLOR = '#dddddd';
const DISABLED_COLOR = '#545454';
const DISABLED_BACKGROUND_COLOR = '#f8f8f8';
const FONT_SIZE = 11;
const FONT_WEIGHT = '500';

const SignUpStyles = Object.freeze({
  fieldset: {},
  // the style applied to the container of all inputs
  formGroup: {
    normal: {
      backgroundColor: 'transparent',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      marginTop: 4,
      marginBottom: 4
    },
    error: {
      backgroundColor: 'transparent',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 8,
      paddingRight: 8,
      marginTop: 4,
      marginBottom: 4
    }
  },
  controlLabel: {
    normal: {
      color: LABEL_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      marginBottom: 7,
      fontWeight: FONT_WEIGHT
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
      fontFamily: 'Lato-Medium',
      height: 28,
      padding: 3,
      borderColor: BORDER_COLOR,
      borderWidth: 1
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      backgroundColor: 'white',
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      fontFamily: 'Lato-Medium',
      height: 28,
      padding: 3,
      borderColor: ERROR_COLOR,
      borderWidth: 1
    },
    // the style applied when the textbox is not editable
    notEditable: {
      fontSize: FONT_SIZE,
      height: 28,
      padding: 3,
      borderColor: BORDER_COLOR,
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
      selectedOption: {
        backgroundColor: 'white',
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 8,
        paddingBottom: 8,
        borderColor: BORDER_COLOR,
        borderWidth: 1
      },
      selectedOptionDropdown: {
        backgroundColor: '#eee'
      },
      text: {
        color: INPUT_COLOR,
        fontSize: FONT_SIZE
      }
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      selectedOption: {
        backgroundColor: 'white',
        paddingLeft: 3,
        paddingRight: 3,
        paddingTop: 8,
        paddingBottom: 8,
        borderColor: ERROR_COLOR,
        borderWidth: 1
      },
      selectedOptionDropdown: {
        backgroundColor: '#eee'
      },
      text: {
        color: INPUT_COLOR,
        fontSize: FONT_SIZE
      }
    }
  },
  datepicker: {
    normal: {
      backgroundColor: 'white',
      color: INPUT_COLOR,
      fontSize: FONT_SIZE,
      padding: 3,
      borderColor: BORDER_COLOR,
      borderWidth: 1
    },
    // the style applied when a ValidationUtilserror occours
    error: {
      color: ERROR_COLOR,
      fontSize: FONT_SIZE,
      height: 28,
      padding: 3,
      borderColor: ERROR_COLOR,
      borderWidth: 1
    }
  }
})

module.exports = SignUpStyles
