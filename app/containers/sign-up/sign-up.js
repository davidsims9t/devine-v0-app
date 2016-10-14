import React, {
  View,
  Text,
  TouchableHighlight,
  Component,
  AlertIOS,
  PushNotificationIOS,
  DeviceEventEmitter
} from 'react-native'
import t from 'tcomb-form-native'

import VerifyUser from '../verify-user'
import { Email, Password } from '../../utils/validation'
import FormTemplate from '../../components/form-template'
import SaveBtn from '../../components/save-btn'

import BaseStyles from '../../themes/default/base'
import SignUpStyles from '../../themes/default/signup'

const Form = t.form.Form
t.form.Form.stylesheet = SignUpStyles
t.form.Form.templates = FormTemplate

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUser, signUpUser } from '../../actions/user'
import { postPushInstallation } from '../../actions/push'

const mapStateToProps = state => ({
  user: state.user.user,
  isUpdating: state.user.isUpdating,
  isSignedUp: state.user.isSignedUp,
  installation: state.push.installation
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser, signUpUser, postPushInstallation }, dispatch)
}

/**
 * This class is responsble for allowing users to sign up.
 */
class SignUp extends Component {
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
      isSignUpBtnDisabled: true,
      isPhoneVerified: true,
      isEmailVerified: true,
      signUpBtnLocation: 0
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
   * Remove Push notification listener on unmount.
   *
   * @return {void}
   */
  componentWillUnmount() {
    PushNotificationIOS.removeEventListener('register')
  }

  /**
   * Display sign up button above keyboard when the keyboard appears.
   *
   * @param {object} e - event object
   * @return {void}
   */
  keyboardWillShow(e) {
    this.setState({signUpBtnLocation: e.endCoordinates.height - 48})
  }

  /**
   * Remove the sign up back to the bottom when the keyboard disappears.
   *
   * @param {object} e - event object
   * @return {void}
   */
  keyboardWillHide(e) {
    this.setState({signUpBtnLocation: 0})
  }

  /**
   * Handles the user ValidationUtilsand sign-up process.
   *
   * @return {object}
   */
  onSignUp() {
    const form = this.refs.form.getValue()

    if (form.email) {
      this.props.getUser({email: form.email})

      this.setState({
        isEmailVerified: false
      })
    }

    if (form.phone) {
      this.props.getUser({phone: form.phone})

      this.setState({
        isPhoneVerified: false
      })
    }

    if (!this.props.user || !this.props.user.length) {
      this.props.signUpUser(form)

      if (this.props.isSignedUp) {
        this.props.verifyUserModal.toggleVisbility()
      } else {
        AlertIOS.alert("Failed to sign up.")
      }
    } else {
      AlertIOS.alert("Username, email, or phone taken.")
    }
  }

  /**
   * After the user has signed up. Prompt them with the option to subscribe to push notifications.
   *
   * @return {void}
   */
  onAfterValidation() {
    PushNotificationIOS.requestPermissions()

    PushNotificationIOS.addEventListener('register', (token) => {
      let date = new Date()
      const timeZone = date.getTimezoneOffset() / 60

      this.props.postPushInstallation({
        "deviceType": "ios",
        "deviceToken": token,
        "user": {
          "className": "_User",
          "__type": "Pointer",
          "objectId": this.props.user.id
        },
        "timeZone": timeZone
      })
    })
  }

  /**
   * Validates and updates sign up button enabled state.
   *
   * @return {void}
   */
  canSignUp() {
    const form = this.refs.form.getValue()
    this.setState({isSignUpBtnDisabled: form && form.errors && form.errors.length})
  }

  /**
   * Specific form options for the registration form.
   *
   * @return {object} options
   */
  getOptions() {
    const self = this

    return {
      auto: 'placeholders',
      fields: {
        username: {
          placeholder: 'Username (optional)',
          autoCorrect: false,
          autoCapitalize: "none",
          selectTextOnFocus: true,
          onBlur(e) {
            // self.props.getUser({username: e.nativeEvent.text})
          }
        },
        email: {
          placeholder: 'Email',
          autoCorrect: false,
          autoCapitalize: "none",
          keyboardType: 'email-address',
          selectTextOnFocus: true,
          onBlur(e) {
            // self.props.getUser({email: e.nativeEvent.text})
          }
        },
        phone: {
          placeholder: 'Phone',
          autoCorrect: false,
          keyboardType: 'phone-pad',
          selectTextOnFocus: true,
          onBlur(e) {
            // self.props.getUser({phone: e.nativeEvent.text})
          }
        },
        password: {
          placeholder: 'Password',
          secureTextEntry: true,
          selectTextOnFocus: true
        }
      }
    }
  }

  /**
   * Handles form update changes.
   *
   * @param {object} value - form field and value.
   * @return {void}
   */
  onChange(value) {
    this.setState({value})
    this.canSignUp()
  }

  /**
   * Render the sign up form.
   *
   * @return {object}
   */
  render() {
    const SignUpForm = t.struct({
      username: t.maybe(t.Str),
      email: t.maybe(Email),
      phone: t.maybe(t.Num),
      password: Password
    })

    return (
      <View style={[
        SignUpStyles.signUpForm,
        BaseStyles.col1
      ]}>
        <VerifyUser
          ref="verifyUserModal"
          user={this.props.user}
          onAfterValidation={this.onAfterValidation.bind(this)}
          isPhoneVerified={this.state.isPhoneVerified}
          isEmailVerified={this.state.isEmailVerified} />
        <View style={[
          SignUpStyles.signUpForm,
          BaseStyles.col1,
          BaseStyles.lightBg,
          BaseStyles.centeredCols
        ]}>
          <Form
            ref="form"
            type={SignUpForm}
            onChange={this.onChange.bind(this)}
            options={this.getOptions()}
            value={this.state.value} />
          <Text style={[
            SignUpStyles.tos,
            BaseStyles.marginVert,
            BaseStyles.marginHorz,
            BaseStyles.textLessMuted,
            BaseStyles.fontExtraSmall
          ]}>
            By signing up, you agree to the Devine terms of service.
          </Text>
        </View>
        <View style={[
          SignUpStyles.signUpBtn,
          BaseStyles.bottom,
          {bottom: this.state.signUpBtnLocation}
        ]}>
          <SaveBtn
            isSaveBtnDisabled={this.state.isSignUpBtnDisabled}
            isUpdating={this.props.isUpdating}
            hasBeenSaved={this.props.isSignedUp}
            saveTerm="Sign Up"
            savingTerm="Signing Up..."
            savedTerm="Signed Up!"
            onPress={this.onSignUp.bind(this)} />
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)
