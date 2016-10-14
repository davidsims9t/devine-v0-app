import React, {
  View,
  TouchableHighlight,
  Text,
  Component,
  ScrollView,
  NativeModules
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import LoadingView from '../../components/loading'
import UserPhoto from '../../components/user-photo'
import UserBoutiques from '../../components/user-profile/user-boutiques'
import ProfileTabs from '../../components/user-profile/profile-tabs'

import ProfileStyles from '../../themes/default/profile'
import BaseStyles from '../../themes/default/base'

/**
 * Class names
 *
 * @type {Object}
 */
const classNames = {
  'inspiration': 'Inspiration',
  'event': 'Event',
  'idea': 'Idea'
}

/**
 * @type {Array} tabs - an array of tabs to display in the user profile screen.
 */
const tabs = [
  {
    title: 'Inspiration',
    col: 'inspiration',
    countCol: 'inspirationsCount'
  },
  {
    title: 'Event',
    col: 'event',
    countCol: 'eventsCount'
  },
  {
    title: 'Idea',
    col: 'idea',
    countCol: 'ideasCount'
  }
]

/**
 * This class is responisble for showing the user's profile.
 */
export default class UserProfile extends Component {
  /**
   * Store info such as the current tab view, sort option, asc/desc, and layout option
   *
   * @param {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      tabView: "inspiration",
      sortOption: "",
      isAscending: false,
      layout: "listView"
    }
  }

  /**
   * Render the user's account info
   *
   * @return {object}
   */
  getUserDetails() {
    const user = this.props.user

    let displayName = "Anonymous User"
    if (user && user.displayName) {
      displayName = user.displayName
    }

    return (
      <TouchableHighlight
        underlayColor="#ccc">
          <View style={[
            ProfileStyles.userDetails,
            BaseStyles.row,
            BaseStyles.whiteBg,
            BaseStyles.marginVert,
            BaseStyles.paddingVert,
            BaseStyles.paddingHorz
          ]}>
            <UserPhoto user={user} photoSize="medium" />
            <Text style={[
              BaseStyles.sansSerifMedium,
              BaseStyles.fontMedium,
              BaseStyles.textDark,
              BaseStyles.marginLeft
            ]}>
              {displayName}
            </Text>
          </View>
      </TouchableHighlight>
    )
  }

  /**
   * Render the tab view
   *
   * @return {object}
   */
  getTabView() {
    if (!this.data.listData.length) {
      return (
        <View style={[
          ProfileStyles.noFavorites,
          BaseStyles.paddingVert,
          BaseStyles.paddingHorz,
          BaseStyles.col1
        ]}>
          <Text style={[
            ProfileStyles.noFavoritesText,
            BaseStyles.textLessMuted,
            BaseStyles.sansSerifRegular
          ]}>
            Nothing to show...
          </Text>
        </View>
      )
    }

    // let Component
    // if (this.state.layout == "listView") {
    //   Component = require('../feed-list-view').default
    // } else if (this.state.layout == "feedView") {
    //   // Component = require('../feed-grid-view').default
    // }
    //
    // if (Component) {
    //   return (
    //     <Component
    //       user={this.props.user}
    //       handleSetSearchQuery={this.props.handleSetSearchQuery}
    //       handleToggleSearchBar={this.props.handleToggleSearchBar}
    //       listData={this.data.listData}
    //       type={this.state.tabView} />
    //   )
    // }
  }

  /**
   * Display this view if the user is logged in
   *
   * @return {object}
   */
  getIsUserLoggedIn() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={[
          ProfileStyles.container,
          BaseStyles.lightBg,
          BaseStyles.col1
        ]}>
          {this.getUserDetails()}
          <UserBoutiques
            navigator={this.props.navigator}
            user={this.props.user} />
          <ProfileTabs
            items={this.props.user}
            tabs={tabs} />
      </ScrollView>
    )
  }

  /**
   * Display this view if the user is not logged in
   *
   * @return {object}
   */
  getUserNotLoggedIn() {
    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={[
          ProfileStyles.container,
          BaseStyles.lightBg,
          BaseStyles.col1
        ]}>
          {this.getUserDetails()}
      </ScrollView>
    )
  }

  /**
   * Render the user profile view
   *
   * @return {object}
   */
  render() {
    if (this.props.user) {
      return this.getIsUserLoggedIn()
    } else {
      return this.getUserNotLoggedIn()
    }
  }
}
