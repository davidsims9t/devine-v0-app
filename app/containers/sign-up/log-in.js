import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  Component,
  NativeModules,
  AlertIOS
} from 'react-native'
import FBSDKLogin, {FBSDKLoginManager} from 'react-native-fbsdklogin'
import FBSDKCore, {
  FBSDKGraphRequest,
  FBSDKAccessToken
} from 'react-native-fbsdkcore'
import LocalStorage from 'react-native-simple-store'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Zocial from 'react-native-vector-icons/Zocial'

import { logIn, getUser, signUp, logInFacebook } from '../../actions/user'

import { normalizePhone } from '../../utils/number'

import BaseStyles from '../../themes/default/base'
import LogInStyles from '../../themes/default/log-in'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  user: state.user.user,
  isUpdating: state.user.isUpdating,
  isLoggedIn: state.user.isLoggedIn
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logIn, getUser, signUp, logInFacebook }, dispatch)
}

/**
 * This class is responsible for allowing the user to log in.
 */
class LogIn extends Component {
  /**
   * Init user handle, password, sign in status, and user object.
   *
   * @param {object} props - inherited props
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      userHandle: "",
      password: "",
      user: null
    }
  }

  /**
   * Initializes the touch id handler.
   *
   * @return {void}
   */
  componentWillMount() {
    this.touchId()
  }

  /**
   * Updates local storage after a user has logged in successfully.
   *
   * @return {void}
   */
  componentWillReceiveProps(props) {
    if (!props.isUpdating) {
      if (props.isLoggedIn) {
        LocalStorage.save('password', this.state.password)

        LocalStorage.save('user', JSON.stringify(props.isLoggedIn)).then(() => {
          this.props.actions.routes.pop()
        })
      } else {
        console.log("Failed to log in.")
        // AlertIOS.alert("Failed to log in.")
      }
    }
  }

  /**
   * If the user has already logged previous, then the user's info should be stored in local storage, so user should be able to log in with touch id now.
   * Does not work in iOS simulator.
   *
   * @return {void}
   */
  async touchId() {
    const user = await LocalStorage.get('user')
    const password = await LocalStorage.get('password')

    if (user && user.username && password) {
      try {
        const isSupported = await TouchID.isSupported()

        if (isSupported) {
          const isAuthenticated = await TouchID.authenticate('Please log in.')
          this.finalizeLogin(user, password)
        }
      } catch(error) {
        AlertIOS.alert("Failed to log in.")
      }
    }
  }

  /**
   * At this point in the process, the user should already logged in, but we just need to save the user/password and navigate back.
   *
   * @param {object} user - the user object
   * @param {password} password - the password
   * @return {void}
   */
  async finalizeLogin(user, password) {
    if (user && password) {
      if (!user.isEmailVerified && !user.isPhoneVerified) {
        AlertIOS.alert("Your account is not verified. Please verify your account first.")
        return
      }

      this.props.logIn(user.username, password)
    } else {
      AlertIOS.alert("Could not find a user with email/phone and password combination.")
    }
  }

  /**
   * Authenticates a user who has filled in their phone or email and password.
   *
   * @return {void}
   */
  logIn() {
    const userHandle = this.state.userHandle
    const password = this.state.password

    if (userHandle.length && password.length) {
      const phone = normalizePhone(userHandle)

      let query = {"phone": phone}
      if (!phone) {
        query = {"email": userHandle}
      }

      query.password = password

      this.props.getUser(query)
      const user = this.props.user

      if (user) {
        this.finalizeLogin(user, password)
      }
    } else {
      AlertIOS.alert("Missing email, phone number and/or password.")
    }
  }

  /**
   * Handles users who register/sign-in with Facebook. When a user logIns with Facebook their graph data is fetched as well.
   *
   * @return {void}
   */
  facebookLogin() {
    const self = this

    FBSDKLoginManager.logInWithReadPermissions([], (error, result) => {
      FBSDKAccessToken.getCurrentAccessToken(credentials => {
        const authData = {
          facebook: {
            id: credentials.userID,
            access_token: credentials.tokenString,
            expiration_date: new Date(credentials._expirationDate).toISOString()
          }
        }

        let fetchRequest = new FBSDKGraphRequest((error, result) => {
          if (error) {
            AlertIOS.alert("Failed to retrieve graph data.")
            return
          }

          let fields = {}

          if (result.picture && result.picture.data && result.picture.data.url) {
            fields.fbPhoto = result.picture.data.url
          }

          if (result.name) {
            fields.username = credentials.userID
          }

          if (result.gender) {
            fields.gender = result.gender
          }

          fields.authData = authData

          this.props.logInFacebook(fields)
        }, 'me?fields=picture,name,gender')

        fetchRequest.start()
      })
    })
  }

  /**
   * Facebook log in button.
   *
   * @return {object}
   */
  getFacebookLoginBtn() {
    return (
      <TouchableHighlight
        style={[
          LogInStyles.facebookBtnPress,
          BaseStyles.marginVert
        ]}
        accessible={!this.state.isUpdating}
        onPress={this.facebookLogin.bind(this)}>
          <View style={[
            LogInStyles.facebookBtn,
            BaseStyles.paddingVertSmall,
            BaseStyles.row,
            BaseStyles.centeredCols,
            BaseStyles.verticalCenteredCols
          ]}>
            <Zocial
              name="facebook"
              style={[
                LogInStyles.facebookBtnIcon,
                BaseStyles.fontSmall,
                BaseStyles.textWhite
              ]} />
            <Text style={[
              LogInStyles.facebookBtn,
              BaseStyles.sansSerifBold,
              BaseStyles.fontSmall,
              BaseStyles.marginLeft
            ]}>
              Facebook
            </Text>
          </View>
      </TouchableHighlight>
    )
  }

  /**
   * Render the sign up button.
   *
   * @return {object}
   */
  getSignUpBtn() {
    return (
      <TouchableHighlight
        style={[
          LogInStyles.signUpPress,
          BaseStyles.buttonDefaultPress,
          BaseStyles.marginVert
        ]}
        accessible={!this.state.isUpdating}
        onPress={this.props.actions.routes.signUp}>
          <Text style={[
            LogInStyles.signUpText,
            BaseStyles.button,
            BaseStyles.buttonDefault
          ]}>
            Sign Up
          </Text>
      </TouchableHighlight>
    )
  }

  /**
   * Render the sign in button
   *
   * @return {object}
   */
  getSignInBtn() {
    return (
      <TouchableHighlight
        style={[
          LogInStyles.signInPress,
          BaseStyles.buttonPrimaryPress,
          BaseStyles.marginVert
        ]}
        accessible={!this.state.isUpdating}
        onPress={this.logIn.bind(this)}>
          <Text style={[
            LogInStyles.signInText,
            BaseStyles.button,
            BaseStyles.buttonPrimary
          ]}>
            {this.props.isUpdating ? "Signing In..." : "Sign In"}
          </Text>
      </TouchableHighlight>
    )
  }

  /**
   * Render the reset password button.
   *
   * @return {object}
   */
  getResetPasswordBtn() {
    return (
      <TouchableHighlight
        style={[
          LogInStyles.resetPasswordPress,
          BaseStyles.buttonDefaultPress,
          BaseStyles.marginVert
        ]}
        underlayColor="transparent"
        accessible={!this.state.isUpdating}
        onPress={this.props.actions.routes.resetPassword}>
          <Text style={[
            LogInStyles.resetPasswordText,
            BaseStyles.textLessMuted,
            BaseStyles.sansSerifRegular,
            BaseStyles.fontSmall
          ]}>
            Reset my password...
          </Text>
      </TouchableHighlight>
    )
  }

  /**
   * Render user handle text field.
   *
   * @return {object}
   */
  getUserHandle() {
    return (
      <TextInput
        onChangeText={(userHandle) => this.setState({userHandle})}
        editable={!this.props.isUpdating}
        autoCapitalize="none"
        placeholder="Phone number or email"
        value={this.state.userHandle}
        style={[LogInStyles.textField, BaseStyles.marginVert]}
        autoCorrect={false}
        keyboardType="email-address"
        returnKeyType="next"
        iosclearTextOnFocus={true} />
    )
  }

  /**
   * Render password field.
   *
   * @return {object}
   */
  getPasswordField() {
    return (
      <TextInput
        onChangeText={(password) => this.setState({password})}
        editable={!this.props.isUpdating}
        value={this.state.password}
        placeholder="Password"
        style={[LogInStyles.textField, BaseStyles.marginVert]}
        autoCorrect={false}
        returnKeyType="done"
        secureTextEntry={true}
        iosclearTextOnFocus={true} />
    )
  }

  /**
   * Render log in form
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        LogInStyles.logInContainer,
        BaseStyles.lightBg,
        BaseStyles.col1
      ]}>
        <Text style={LogInStyles.logInLogo}>
          Devine
        </Text>
        <View style={[
          LogInStyles.logInForm,
          BaseStyles.marginVert,
          BaseStyles.marginHorz
        ]}>
          {this.getUserHandle()}
          {this.getPasswordField()}
          {this.getResetPasswordBtn()}
          {this.getSignInBtn()}
          {this.getSignUpBtn()}
          {this.getFacebookLoginBtn()}
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)
