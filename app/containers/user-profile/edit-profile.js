import React, {
  View,
  TouchableHighlight,
  Text,
  Image,
  Component,
  AlertIOS,
  SwitchIOS,
  ScrollView,
  DeviceEventEmitter,
  NativeModules
} from 'react-native'
import t from 'tcomb-form-native'
import FBSDKCore, {FBSDKGraphRequest} from 'react-native-fbsdkcore'

import VerifyUser from '../verify-user'
import UserPhoto from './components/user-photo'
import OptionPopup from '../components/menus/option-popup'
import MediaTabbar from '../components/media/media-tabbar'
import SaveBtn from '../components/save-btn'
import CustomSelect from '../components/custom-select'
import CustomDatePicker from '../components/custom-datepicker'
import FormTemplate from '../components/form-template'

import BaseStyles from '../../themes/default/base'
import FormStyles from '../../themes/default/forms'

const Composer = NativeModules.RNMessageComposer
const KDSocialShare = NativeModules.KDSocialShare

const Form = t.form.Form
t.form.Form.stylesheet = FormStyles
t.form.Form.templates = FormTemplate

const userPreferences = [
  {text: 'Receive New Message Notifications', key: 'shouldSendMessageNotification'},
  {text: 'Receive Comment Mention Notifications', key: 'shouldSendCommentNotification'}
]

/**
 * This class is responsible for allowing the user to edit their profile.
 */
export default class EditProfile extends Component {
  /**
   * Component for modifying the user's profile. If the user changes their email or phone.
   * The original email/phone and isEmailVerified and/or isPhoneVerified states are set respectively.
   *
   * @param {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      value: {...props.user},
      originalEmail: null,
      originalPhone: null,
      shouldSendMessageNotification: props.user.shouldSendMessageNotification,
      shouldSendCommentNotification: props.user.shouldSendCommentNotification,
      isEmailVerified: true,
      isPhoneVerified: true,
      isSaveBtnDisabled: true,
      saveBtnLocation: 0
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
    this.setState({saveBtnLocation: e.endCoordinates.height - 48})
  }

  /**
   * Remove the sign up back to the bottom when the keyboard disappears.
   *
   * @param {object} e - event object
   * @return {void}
   */
  keyboardWillHide(e) {
    this.setState({saveBtnLocation: 0})
  }

  /**
   * on updating the user's profile.
   *
   * @return {object}
   */
  onSave() {
    const user = this.props.user
    let form = this.refs.form.getValue()

    if (form) {
    }
  }

  /**
   * Specific form options for the edit profile form.
   *
   * @return {object}
   */
  getOptions() {
    let self = this

    return {
      auto: 'placeholders',
      fields: {
        displayName: {
          label: 'BASIC INFO',
          placeholder: 'Username',
          autoCorrect: false,
          autoCapitalize: "none",
          selectTextOnFocus: true
        },
        email: {
          placeholder: 'Email',
          autoCapitalize: false,
          autoCorrect: false,
          autoCapitalize: "none",
          keyboardType: 'email-address',
          selectTextOnFocus: true,
          onBlur() {
            self.setState({
              originalEmail: self.props.user.email
            })
          }
        },
        phone: {
          placeholder: 'Phone',
          keyboardType: 'phone-pad',
          selectTextOnFocus: true,
          onBlur() {
            self.setState({
              originalPhone: self.props.user.phone
            })
          }
        },
        gender: {
          placeholder: 'Gender',
          factory: CustomSelect,
          onChange(gender) {
            self.canSaveProfile()
          }
        },
        dateOfBirth: {
          placeholder: 'Date of Birth',
          factory: CustomDatePicker,
          mode: 'Date',
          onChange(date) {
            self.canSaveProfile()
          }
        }
      }
    }
  }

  /**
   * Validates and updates save button enabled state.
   *
   * @return {void}
   */
  canSaveProfile() {
    const form = this.refs.form.getValue()

    this.setState({isSaveBtnDisabled: form && form.errors && form.errors.length})
  }

  /**
   * Renders the user photo component.
   *
   * @return {object}
   */
  getUserPhoto() {
    return (
      <View style={[
        FormStyles.changeUserPhotoContainer,
        BaseStyles.marginVert
      ]}>
        <OptionPopup
          options={this.getPhotoOptions()}
          ref="photoOptionModal" />
        <TouchableHighlight
          underlayColor="#ccc"
          onPress={() => this.refs.photoOptionModal.onSetVisible()}
          style={[
            FormStyles.changeUserPhoto,
            BaseStyles.whiteBg,
            BaseStyles.paddingVert,
            BaseStyles.row,
            BaseStyles.centeredCols
          ]}>
            <View>
              <UserPhoto user={this.props.user} photoSize="large" />
            </View>
        </TouchableHighlight>
      </View>
    )
  }

  /**
   * Update the user's photo from Facebook.
   *
   * @return {}
   */
  onImportPhotoFromFacebook() {
    const props = this.props

    let fetchPhotoRequest = new FBSDKGraphRequest((error, result) => {
      if (!error && result && result.picture && result.picture.data && result.picture.data.url) {
        const fbPhoto = result.picture.data.url
        const fields = {fbPhoto}
        Backend.update(props.user, fields)
      }
    }, 'me?fields=picture')

    fetchPhotoRequest.start()
  }

  /**
   *
   *
   * @return {}
   */
  onUserRemovePhoto() {
    try {
      await Backend.update(this.props.user, {fbPhoto: null, photo: null})
    } catch(error) {
      AlertIOS.alert("An error occured while attempting to remove photo.")
    }
  }

  /**
   *
   *
   * @return {[type]} [description]
   */
  onUserPhotoModal() {
    this.refs.photoOptionModal.onSetVisible()
    this.refs.userPhotoModal.onOpenModal()
  }

  /**
   *
   *
   * @param {} media [description]
   * @return {void}
   */
  onUpdateUserPhoto(media) {
    try {
      await Backend.update(this.props.user, {photo: media})
    } catch(error) {
      AlertIOS.alert("An error occured while attempting to upload photo.")
    }
  }

  /**
   *
   * @return {[type]} [description]
   */
  getPhotoOptions() {
    let options = {
      heading: 'Change Profile Picture',
      list: [
        {icon: 'camera', text: 'Photo Library', onPress: this.onUserPhotoModal.bind(this)}
      ]
    }

    if (this.props.user && this.props.user.authData) {
      options.list.push({
        icon: 'facebook',
        text: 'Import from Facebook',
        onPress: this.onImportPhotoFromFacebook.bind(this)
      })
    }

    if (this.props.user && (this.props.user.fbPhoto || this.props.user.photo)) {
      options.list.push({
        icon: 'close',
        text: 'Remove photo',
        onPress: this.onUserRemovePhoto.bind(this)
      })
    }

    return options
  }

  /**
   * [onUpdateUserPreferenceOption description]
   * @param  {[type]} key   [description]
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  onUpdateUserPreferenceOption(key, value) {
    const user = this.props.user

    try {
      await Backend.update(user, {[key]: value})
      this.setState({
        [key]: value
      })
    } catch(error) {
      AlertIOS.error("Failed to update user preference.")
    }
  }

  /**
   * Renders user's preferences component.
   *
   * @param  {[type]} option [description]
   * @return {[type]}        [description]
   */
  getUserPreference(option) {
    return (
      <View style={[
        FormStyles.userPreferenceOption,
        BaseStyles.whiteBg,
        BaseStyles.col1,
        BaseStyles.paddingVert,
        BaseStyles.paddingHorz
      ]}>
        <View style={[
          FormStyles.userPreferenceOptionRow,
          BaseStyles.row,
          BaseStyles.justifiedCols,
          BaseStyles.verticalCenteredCols
        ]}>
          <Text style={[
            FormStyles.userPreferenceOptionHeading,
            BaseStyles.fontExtraSmall,
            BaseStyles.sansSerifRegular,
            BaseStyles.textDark
          ]}>
            {option.text}
          </Text>
          <SwitchIOS
            tintColor="#ccc"
            onTintColor="#009AE0"
            onValueChange={(value) => this.onUpdateUserPreferenceOption(option.key, value)}
            value={this.state[option.key]} />
        </View>
      </View>
    )
  }

  /**
   * 
   * @return {[type]} [description]
   */
  getUserPreferences() {
    return (
      <View style={[
        FormStyles.userAccountOptions,
        BaseStyles.marginVert
      ]}>
        <Text style={[
          FormStyles.userAccountOptionsHeading,
          BaseStyles.textLessMuted,
          BaseStyles.sansSerifBold,
          BaseStyles.marginHorz,
          BaseStyles.marginBottom,
          BaseStyles.fontExtraSmall
        ]}>
          PREFERENCES
        </Text>
        {userPreferences.map((option) => {
          return this.getUserPreference(option)
        }, this)}
      </View>
    )
  }

  /**
   *
   * @return {[type]} [description]
   */
  onChangePassword() {
  }

  /**
   *
   * @return {[type]} [description]
   */
  onLogout() {
    Parse.User.logOut()
  }

  /**
   *
   * @return {[type]} [description]
   */
  onShareApp() {
    this.refs.shareOptionsModal.onSetVisible()
  }

  /**
   *
   * @return {[type]} [description]
   */
  getAccountOptionsData() {
    return [
      {text: 'Change Password', onPress: this.onChangePassword.bind(this)},
      {text: 'Logout', onPress: this.onLogout.bind(this)},
      {text: 'Share Devine App', noBorder: true, onPress: this.onShareApp.bind(this)}
    ]
  }

  /**
   * Renders an individual account option.
   *
   * @param  {object} option -
   * @return {object}
   */
  getAccountOption(option) {
    let borderStyle
    if (!option.noBorder) {
      borderStyle = BaseStyles.borderBottomLight
    }

    return (
      <TouchableHighlight
        onPress={option.onPress}
        underlayColor="#ccc"
        style={[
          FormStyles.userAccountOption,
          BaseStyles.whiteBg,
          BaseStyles.col1,
          BaseStyles.paddingVert,
          BaseStyles.paddingHorz,
          borderStyle
        ]}>
          <Text style={[
            FormStyles.userAccountOptionText,
            BaseStyles.fontExtraSmall,
            BaseStyles.sansSerifRegular,
            BaseStyles.textPrimary
          ]}>
            {option.text}
          </Text>
      </TouchableHighlight>
    )
  }

  /**
   * Renders a list of account options.
   *
   * @return {object} component
   */
  getAccountOptions() {
    return (
      <View style={[
        FormStyles.userAccountOptions,
        BaseStyles.tabMargin
      ]}>
        <Text style={[
          FormStyles.userAccountOptionsHeading,
          BaseStyles.textLessMuted,
          BaseStyles.sansSerifBold,
          BaseStyles.marginHorz,
          BaseStyles.marginBottom,
          BaseStyles.fontExtraSmall
        ]}>
          ACCOUNT
        </Text>
        {this.getAccountOptionsData().map((option) => {
          return this.getAccountOption(option)
        }, this)}
      </View>
    )
  }

  /**
   * Share app on Twitter.
   *
   * @return {void}
   */
  onTwitterShare() {
    this.refs.shareOptionsModal.onSetVisible()

    KDSocialShare.tweet({
      'text': 'Check out Devine',
      'link': 'http://godevine.com/',
      'imagelink': 'https://artboost.com/apple-touch-icon-144x144.png'
    }, (result) => {
    })
  }

  /**
   * Share app to Facebook.
   *
   * @return {void}
   */
  onFacebookShare() {
    this.refs.shareOptionsModal.onSetVisible()

    KDSocialShare.shareOnFacebook({
      'text': 'Check out Devine',
      'link': 'http://godevine.com/',
      'imagelink': 'https://artboost.com/apple-touch-icon-144x144.png'
    }, (result) => {
    })
  }

  /**
   * Share app via SMS.
   *
   * @return {void}
   */
  onSmsShare() {
    Composer.composeMessageWithArgs({
      'messageText': 'Check out Devine',
      'subject': 'Check out Devine',
      'recipients': []
    }, (result) => {
    })
  }

  /**
   * List of sharing options.
   *
   * @return {object}
   */
  getShareOptions() {
    return {
      heading: 'Share On Social Media',
      list: [
        {icon: 'facebook', text: 'Facebook', onPress: this.onFacebookShare.bind(this)},
        {icon: 'twitter', text: 'Twitter', onPress: this.onTwitterShare.bind(this)},
        {icon: 'commenting', text: 'Text', onPress: this.onSmsShare.bind(this)}
      ]
    }
  }

  /**
   * ons form update changes.
   *
   * @param {object} value - form value
   * @return {void}
   */
  onChange(value) {
    this.setState({value})
    this.canSaveProfile()
  }

  /**
   * Render edit profile component.
   *
   * @return
   */
  render() {
    const UserProfileForm = t.struct({
      displayName: ValidationUtils.Title,
      email: t.maybe(ValidationUtils.Email),
      phone: t.maybe(t.Num),
      gender: t.maybe(t.enums({NotSpecified: 'Not Specified', Male: 'Male', Female: 'Female'})),
      dateOfBirth: t.maybe(t.Date)
    })

    return (
      <View style={[
        FormStyles.formContainer,
        BaseStyles.col1
      ]}>
        <MediaTabbar
          ref="userPhotoModal"
          width={144}
          height={144}
          onMedia={this.onUpdateUserPhoto.bind(this)} />
        <OptionPopup
          ref="shareOptionsModal"
          options={this.getShareOptions()} />
        <VerifyUser
          ref="verifyUserModal"
          user={this.props.user}
          originalEmail={this.state.originalEmail}
          originalPhone={this.state.originalPhone}
          isPhoneVerified={this.state.isPhoneVerified}
          isEmailVerified={this.state.isEmailVerified} />
        <ScrollView
          contentContainerStyle={[
            FormStyles.editUserProfile,
            BaseStyles.lightBg
          ]}
          automaticallyAdjustContentInsets={false}>
            {this.getUserPhoto()}
            <Form
              ref="form"
              type={UserProfileForm}
              onChange={this.onChange.bind(this)}
              options={this.getOptions()}
              value={this.state.value} />
            {this.getUserPreferences()}
            {this.getAccountOptions()}
        </ScrollView>
        <View style={[
          FormStyles.saveBtn,
          BaseStyles.bottom,
          {bottom: this.state.saveBtnLocation}
        ]}>
          <SaveBtn
            isSaveBtnDisabled={this.state.isSaveBtnDisabled}
            isUpdating={this.props.isUpdating}
            hasBeenSaved={this.props.hasBeenSaved}
            saveTerm="Save"
            savingTerm="Saving..."
            savedTerm="Saved!"
            onPress={this.onSave.bind(this)} />
        </View>
      </View>
    )
  }
}
