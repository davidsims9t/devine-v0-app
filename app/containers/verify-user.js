import React, {
  View,
  Text,
  TextInput,
  Component,
  AlertIOS,
  DeviceEventEmitter
} from 'react-native'
import t from 'tcomb-form-native'

import ModalWithNavBar from '../components/modal'
import SaveBtn from '../components/save-btn'
import FormTemplate from '../components/form-template'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUser, updateUser } from '../actions/user'

const mapStateToProps = state => ({
  isValidated: !!state.user.user,
  isUpdating: state.user.isUpdating
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUser }, dispatch)
}

import FormStyles from '../themes/default/forms'
import BaseStyles from '../themes/default/base'

const Form = t.form.Form
t.form.Form.stylesheet = FormStyles
t.form.Form.templates = FormTemplate

/**
 * This class verifies a user after sign up and email/phone change.
 */
class VerifyUser extends Component {
  /**
   * Validation state properties.
   *
   * @param {object} props -
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      isValidateBtnDisabled: true,
      validationBtnLocation: 0
    }
  }

  /**
   * Specific form options for the user verification form.
   *
   * @return {object} options
   */
  getOptions() {
    return {
      auto: 'placeholders',
      fields: {
        emailVerificationCode: {
          placeholder: 'Email Verification Code',
          autoCapitalize: false,
          autoCorrect: false,
          autoCorrect: false,
          keyboardType: 'email-address',
          selectTextOnFocus: true
        },
        phoneVerificationCode: {
          placeholder: 'Phone Verification Code',
          keyboardType: 'number-pad',
          selectTextOnFocus: true
        }
      }
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
   * @return {void}
   */
  keyboardWillShow(e) {
    this.setState({validationBtnLocation: e.endCoordinates.height - 48})
  }

  /**
   * Display sign up button above keyboard when the keyboard appears.
   *
   * @param {object} e - event object
   * @return {void}
   */
  keyboardWillHide(e) {
    this.setState({validationBtnLocation: 0})
  }

  /**
   * Validates and updates the validation button enabled state.
   *
   * @return {void}
   */
  canValidate(props) {
    const form = this.refs.form.getValue()
    this.setState({isValidateBtnDisabled: form && form.errors && form.errors.length})
  }

  /**
   * Check the user's validation code, if the user is validated then mark user as validated.
   *
   * @return {void}
   */
  onConfirm() {
    let verifiedFields = {}
    const form = this.refs.form.getValue()

    if (form && form.emailVerificationCode) {
      verifiedFields.emailVerificationCode = null
      verifiedFields.isEmailVerified = true
    }

    if (form && form.phoneVerificationCode) {
      verifiedFields.phoneVerificationCode = null
      verifiedFields.isPhoneVerified = true
    }

    if (verifiedFields && this.props.user) {
      const userId = this.props.user.objectId || this.props.user.id
      const validationResponse = this.props.getUser({objectId: userId, ...form})

      // if (this.props.user) {
      //   if (this.props.onAfterValidation) {
      //     this.props.onAfterValidation()
      //   }
      // }
    } else {
      AlertIOS.alert("Missing verification code.")
    }
  }

  /**
   * Toggles modal visibility
   *
   * @return {void}
   */
  toggleVisibility() {
    this.refs.modal.toggleVisibility()
  }

  /**
   * Reset the user's email or phone number if the modal is closed.
   *
   * @return {void}
   */
  onModalClose() {
    let fields = {}
    if (!this.props.isPhoneVerified && this.props.originalPhone) {
      fields.phone = this.props.originalPhone
      fields.isPhoneVerified = true
    }

    if (!this.props.isEmailVerified && this.props.originalEmail) {
      fields.email = this.props.originalEmail
      fields.isEmailVerified = true
    }

    if (Object.keys(fields).length) {
      this.props.updateUser()
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
    this.canValidate()
  }

  /**
   * Render's the verify user component.
   *
   * @return {object} component
   */
  render() {
    let form = {}

    if (!this.props.isPhoneVerified) {
      form.phoneVerificationCode = t.Num
    }

    if (!this.props.isEmailVerified) {
      form.emailVerificationCode = t.Num
    }

    const VerifyUserForm = t.struct(form)

    return (
      <ModalWithNavBar
        ref="modal"
        onModalClose={this.onModalClose.bind(this)}>
          <View style={[
            FormStyles.formContainer,
            BaseStyles.col1,
            BaseStyles.centeredCols,
            BaseStyles.lightBg
          ]}>
            <Form
              ref="form"
              type={VerifyUserForm}
              options={this.getOptions()}
              onChange={this.onChange.bind(this)}
              value={this.state.value} />
          </View>
          <View style={[
            FormStyles.btnContainer,
            BaseStyles.bottom,
            {bottom: this.state.validationBtnLocation}
          ]}>
            <SaveBtn
              isSaveBtnDisabled={this.state.isValidateBtnDisabled}
              isUpdating={this.props.isUpdating}
              hasBeenSaved={this.props.isValidated}
              saveTerm="Validate"
              savingTerm="Validating..."
              savedTerm="Validated!"
              onPress={this.onConfirm.bind(this)} />
          </View>
      </ModalWithNavBar>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUser)
