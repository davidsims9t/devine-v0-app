import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  DeviceEventEmitter,
  Component,
  AlertIOS
} from 'react-native'
import t from 'tcomb-form-native'

import FormTemplate from '../components/form-template'
import SaveBtn from '../components/save-btn'

import BaseStyles from '../themes/default/base'
import FormStyles from '../themes/default/forms'
import SignUpStyles from '../themes/default/signup'

const Form = t.form.Form
t.form.Form.stylesheet = SignUpStyles
t.form.Form.templates = FormTemplate

import { sendPasswordVerificationCode } from '../actions/user'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  user: state.user.user,
  isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logIn }, dispatch)
}

/**
 * This class ons verifying password resets.
 */
export default class VerifyPasswordCode extends Component {
  /**
   * [constructor description]
   * @param  {[type]} props [description]
   * @return {[type]}       [description]
   */
  constructor(props) {
    super(props)

    this.state = {
      isVerifyBtnDisabled: true,
      verificationBtnLocation: 0
    }
  }

  /**
   * Add keyboard listener.
   *
   * @return {void}
   */
  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  /**
   * Display sign up button above keyboard when the keyboard appears.
   *
   * @param {object} e - event object
   * @return {void}
   */
  keyboardWillShow(e) {
    this.setState({verificationBtnLocation: e.endCoordinates.height - 48})
  }

  /**
   * Remove the sign up back to the bottom when the keyboard disappears.
   *
   * @param {object} e - event object
   * @return {void}
   */
  keyboardWillHide(e) {
    this.setState({verificationBtnLocation: 0})
  }

  /**
   * Verify's the user's phone number or email and send a password reset code to the user.
   *
   * @return {void}
   */
  onVerificationCodeSend() {
    const form = this.refs.form.getValue()

    let userHandle = form.userHandle
    if (normalizePhone(userHandle)) {
      userHandle = normalizePhone(userHandle)
    }

    this.props.sendPasswordVerificationCode(String(userHandle))
  }

  /**
   * Specific form options for the verify password form.
   *
   * @return {object}
   */
  getOptions() {
    return {
      auto: 'placeholders',
      fields: {
        useron: {
          placeholder: 'Enter your email or phone number...',
          autoCorrect: false,
          autoCapitalize: "none",
          selectTextOnFocus: true
        }
      }
    }
  }

  /**
   * Handles form update changes.
   *
   * @param {object} value - form value
   * @return {void}
   */
  onChange(value) {
    this.setState({value})

    const form = this.refs.form.getValue()
    this.setState({isVerifyBtnDisabled: form && form.errors && form.errors.length})
  }

  /**
   * Render the verify password form.
   *
   * @return {object} component
   */
  render() {
    const VerifyPasswordCodeForm = t.struct({
      useron: t.Str
    })

    return (
      <View style={[
        FormStyles.formContainer,
        BaseStyles.lightBg,
        BaseStyles.centeredCols,
        BaseStyles.col1
      ]}>
        <Form
          ref="form"
          type={VerifyPasswordCodeForm}
          onChange={this.onChange.bind(this)}
          options={this.getOptions()}
          value={this.state.value} />
        <View style={[
          FormStyles.saveBtn,
          BaseStyles.bottom,
          {bottom: this.state.verificationBtnLocation}
        ]}>
          <SaveBtn
            isSaveBtnDisabled={this.state.isVerifyBtnDisabled}
            isUpdating={this.state.isUpdating}
            hasBeenSaved={this.state.isVerified}
            saveTerm="Send ValidationUtilsCode"
            savingTerm="Verifying..."
            savedTerm="Verification Code Sent"
            onPress={this.onVerificationCodeSend.bind(this)} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyPasswordCode)
