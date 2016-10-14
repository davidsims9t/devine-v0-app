import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  DeviceEventEmitter,
  AlertIOS
} from 'react-native'
import t from 'tcomb-form-native'

import { Password } from '../utils/validation'
import FormTemplate from '../components/form-template'
import SaveBtn from '../components/save-btn'

import BaseStyles from '../themes/default/base'
import FormStyles from '../themes/default/forms'
import SignUpStyles from '../themes/default/signup'

const Form = t.form.Form
t.form.Form.stylesheet = SignUpStyles
t.form.Form.templates = FormTemplate

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { resetPassword } from '../actions/user'

const mapStateToProps = state => ({
  user: state.user.user
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ resetPassword }, dispatch)
}

/**
 * This class is responsible for allowing the user to reset their password.
 */
class ResetPassword extends Component {
  /**
   * Stores form value, sign up state, phone & email verification.
   *
   * @param {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      value: null,
      isResetBtnDisabled: true,
      resetBtnLocation: 0
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
    this.setState({resetBtnLocation: e.endCoordinates.height - 48})
  }

  /**
   * Remove the sign up back to the bottom when the keyboard disappears.
   *
   * @param {object} e - event object
   * @return {void}
   */
  keyboardWillHide(e) {
    this.setState({resetBtnLocation: 0})
  }

  /**
   * Attempt to reset the user's password.
   *
   * @return {void}
   */
  onResetPassword() {
    const userHandle = this.props.actions.router.userHandle

    if (userHandle) {
      const form = this.refs.form.getValue()
      this.props.resetPassword(userHandle, form.password, form.verificationCode)
    } else {
      AlertIOS.alert("Invalid password or verification code.")
    }
  }

  /**
   * Validates and updates reset button enabled state.
   *
   * @return {void}
   */
  canResetPassword() {
    const form = this.refs.form.getValue()
    this.setState({isResetBtnDisabled: form && form.errors && form.errors.length})
  }

  /**
   * Handles form update changes.
   *
   * @param {object} value - form value
   * @return {void}
   */
  onChange(value) {
    this.setState({value})
    this.canResetPassword()
  }

  /**
   * Specific form options for the password reset form.
   *
   * @return {object}
   */
  getOptions() {
    let self = this

    return {
      auto: 'placeholders',
      fields: {
        verificationCode: {
          placeholder: 'Password Verification Code',
          autoCapitalize: "none",
          selectTextOnFocus: true
        },
        password: {
          placeholder: 'Password',
          autoCapitalize: "none",
          secureTextEntry: true,
          selectTextOnFocus: true
        }
      }
    }
  }

  /**
   * Render the reset password form.
   *
   * @return {object} component
   */
  render() {
    let fields = {
      password: Password
    }

    if (this.props.route && this.props.route.shouldRequireVerification) {
      fields.verificationCode = t.Num
    }

    const ResetPasswordCodeForm = t.struct(fields)

    return (
      <View style={[
        FormStyles.formContainer,
        BaseStyles.col1
      ]}>
        <View style={[
          FormStyles.form,
          BaseStyles.col1,
          BaseStyles.lightBg,
          BaseStyles.centeredCols
        ]}>
          <Form
            ref="form"
            type={ResetPasswordCodeForm}
            onChange={this.onChange.bind(this)}
            options={this.getOptions()}
            value={this.state.value} />
        </View>
        <View style={[
          FormStyles.saveBtn,
          BaseStyles.bottom,
          {bottom: this.state.resetBtnLocation}
        ]}>
          <SaveBtn
            isSaveBtnDisabled={this.state.isResetBtnDisabled}
            isUpdating={this.props.isUpdating}
            hasBeenSaved={this.props.isReset}
            saveTerm="Reset Password"
            savingTerm="Resetting Password..."
            savedTerm="Password Reset"
            onPress={this.onResetPassword.bind(this)} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
