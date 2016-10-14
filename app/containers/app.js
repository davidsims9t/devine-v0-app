import React, {
  Component,
  NetInfo
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  actions as routerActions,
  NavBar,
  Route,
  Router,
  Schema,
  TabBar,
  TabRoute
} from 'react-native-router-redux'

// Routes
import Search from './search'
import Discovery from './discovery'
import Comments from './comments'
import UserProfile from './user-profile'
import LogIn from './sign-up/log-in'
import ResetPassword from './reset-password'
import VerifyPasswordCode from './verify-password-code'
import SignUp from './sign-up/sign-up'
import Messages from './messages/master'
import MessageDetail from './messages/detail'
import BoutiqueProfile from './boutique'
import NotificationsModal from './notifications'

// Components
import NoConnectionView from '../components/no-connection'
import LoadingView from '../components/loading'

// Actions
import { getCurrentUser } from '../actions/user'

// Styles
import tabStyles from '../themes/default/tabs'
import navBarStyles from '../themes/default/navbar'

const defaultSchema = {
  navBar: NavBar,
  ...navBarStyles,
  tabBar: TabBar
}

const mapStateToProps = state => ({
  router: state.router,
  isLoading: state.user.isLoading,
  user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    ...routerActions,
    getCurrentUser
  }, dispatch),
  dispatch
})

/**
 * This is initial component for the app. Everything starts here.
 */
class AppContainer extends Component {
  /**
   * Contains state of connection state, userId, websocket, error, and websocket status.
   *
   * @param {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      isConnected: null
    }
  }

  /**
   * Basic setup for the app.
   *
   * @return {void}
   */
  componentWillMount() {
    this.isConnected()
  }

  /**
   * Get the current user if they're logged in.
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.actions.getCurrentUser()
  }

  /**
   * Remove connectivity listener on unmount.
   *
   * @return {void}
   */
  componentWillUnmount() {
    this.removeConnectionListener()
  }

  /**
   * Listens to hear if there's an active internet connection, if there is then set the connection state to true.
   *
   * @return {void}
   */
  isConnected() {
    NetInfo.isConnected.addEventListener('change', (isConnected) => {
      this.setState({isConnected})
    })

    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({isConnected})
    })
  }

  /**
   * Remove connection listener on unmount.
   *
   * @return {void}
   */
  removeConnectionListener() {
    NetInfo.isConnected.removeEventListener('change', (isConnected) => {
      this.setState({isConnected})
    })
  }

  /**
   * Navigate to search container.
   *
   * @return {void}
   */
  onSearchPress() {
    this.props.actions.push({
      name: 'search'
    })
  }

  /**
   * Toggles the notifications modal.
   *
   * @return {void}
   */
  onNotificationPress() {
    this.refs.notificationsModal.showNotificationsModal()
  }

  /**
   * Returns a notification icon in the nav bar if the user is signed in.
   *
   * @return {object} props - notification props
   */
  getNotificationProps() {
    let props = {}

    if (this.props.user) {
      props = {
        navRightIcon: 'bell',
        navRightHandler: this.onNotificationPress.bind(this)
      }
    }

    return props
  }

  /**
   * Renders all of the possible routes in the app.
   *
   * @return {object} component
   */
  render() {
    if (!this.state.isConnected) {
      return (<NoConnectionView />)
    }

    if (!this.props.actions || this.props.isLoading) {
      return (<LoadingView />)
    }

    // <NotificationsModal
    //   ref="notificationsModal"
    //   actions={this.props.actions}
    //   user={this.props.user} />

    const notificationProps = this.getNotificationProps()

    return (
      <Router {...this.props} initial="userProfile">
        <Schema name="default" {...defaultSchema} />
        <Route
          user={this.props.user}
          name="logIn"
          component={LogIn}
          title="Log In"
          navLeftIcon="chevron-left"
          navLeftHandler={this.props.actions.pop.bind(this)} />
        <Route
          user={this.props.user}
          name="signUp"
          component={SignUp}
          title="Sign Up"
          navLeftIcon="chevron-left"
          navLeftHandler={this.props.actions.pop.bind(this)} />
        <Route
          user={this.props.user}
          name="resetPassword"
          component={ResetPassword}
          title="Reset Password"
          navLeftIcon="chevron-left"
          navLeftHandler={this.props.actions.pop.bind(this)} />
        <Route
          user={this.props.user}
          name="comments"
          component={Comments}
          title="Comments"
          navLeftIcon="chevron-left"
          navLeftHandler={this.props.actions.pop.bind(this)} />
        <Route
          user={this.props.user}
          name="messageDetail"
          component={MessageDetail}
          title="Messages"
          navLeftIcon="chevron-left"
          navLeftHandler={this.props.actions.pop.bind(this)} />
        <Route
          user={this.props.user}
          name="search"
          component={Search}
          title="Search"
          navLeftIcon="chevron-left"
          navLeftHandler={this.props.actions.pop.bind(this)} />
        <Route
          user={this.props.user}
          name="search"
          component={Search}
          title="Search"
          navLeftIcon="chevron-left"
          navLeftHandler={this.props.actions.pop.bind(this)} />
        <Route
          user={this.props.user}
          name="boutiqueProfile"
          component={BoutiqueProfile}
          title="Boutique Profile"
          navLeftIcon="chevron-left"
          navLeftHandler={this.props.actions.pop.bind(this)} />
        <TabRoute name="tabBar" barTint={tabStyles.barTint} tint={tabStyles.tint}>
          <Route
            user={this.props.user}
            name="discovery"
            component={Discovery}
            title="Devine"
            navLeftIcon="search"
            navLeftHandler={this.onSearchPress.bind(this)}
            tabItem={{icon: 'list'}}
            navRightIcon="notifications"
            navRightHandler={this.onNotificationPress.bind(this)} />
          <Route
            user={this.props.user}
            name="messages"
            component={Messages}
            title="Messages"
            navLeftIcon="search"
            navLeftHandler={this.onSearchPress.bind(this)}
            tabItem={{icon: 'inbox'}} />
          <Route
            user={this.props.user}
            name="userProfile"
            component={UserProfile}
            title="Profile"
            navLeftIcon="search"
            navLeftHandler={this.onSearchPress.bind(this)}
            tabItem={{icon: 'person'}} />
        </TabRoute>
      </Router>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
