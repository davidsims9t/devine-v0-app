import React, {
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  Component,
  AlertIOS
} from 'react-native'
import TimeAgo from 'react-native-timeago'
import moment from 'moment'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import {
  getUserBoutique,
  postUserBoutique,
  putUserBoutique
} from '../actions/user-boutique'

// Components
import UserPhoto from './user-photo'

// Styles
import BaseStyles from '../themes/default/base'
import MessageStyles from '../themes/default/message'

const mapStateToProps = state => ({
  userBoutique: state.userBoutique.results,
  isFollowing: state.userBoutique.isFollowing,
  isLoading: state.subscriptions.isLoading
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getUserBoutique,
    postUserBoutique,
    putUserBoutique
  }, dispatch)
}

/**
 * This class is responsible for displaying
 * the point-of-contact's (Boutique Owner or Stylist) contact information
 */
class ContactInfo extends Component {
  /**
   * Load user boutique relation.
   *
   * @return {void}
   */
  componentDidMount() {
    // this.props.getUserBoutique({
    //   userId: this.props.user.objectId,
    //   boutiqueId: this.props.boutique.objectId
    // })
  }

  /**
   * If the user is not already a follower, set the user as a follower.
   *
   * @return {void}
   */
  onAddFollower() {
    if (!this.props.userBoutique) {
      this.props.postUserBoutique({
        userId: this.props.user.objectId,
        boutiqueId: this.props.boutique.objectId,
        isFollowing: true
      })
    } else {
      this.props.putUserBoutique({
        userBoutique: this.props.userBoutique.objectId,
        isFollowing: true
      })
    }
  }

  /**
   * If the user is a follower, then remove the follower status.
   *
   * @return {void}
   */
  onRemoveFollower() {
    if (this.props.userBoutique) {
      this.props.putUserBoutique({
        userBoutique: this.props.userBoutique.objectId,
        isFollowing: false
      })
    }
  }

  /**
   * If the current user is a boutique or stylist show the client status/last login, otherwise show the follow option
   *
   * @return {object} component
   */
  getContactOptions() {
    if (!this.props.userBoutique || !this.props.userBoutique.isFollowing) {
      return (
        <TouchableHighlight
          style={[
            MessageStyles.actionBtn,
            BaseStyles.paddingVertSmall,
            BaseStyles.paddingHorzSmall
          ]}
          underlayColor="#ccc"
          onPress={this.onAddFollower.bind(this)}>
            <Text style={[
              MessageStyles.actionBtnText,
              BaseStyles.sansSerifBold,
              BaseStyles.fontSmall,
              BaseStyles.textWhite
            ]}>
              Follow
            </Text>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          style={[
            MessageStyles.actionBtn,
            BaseStyles.paddingVertSmall,
            BaseStyles.paddingHorzSmall
          ]}
          underlayColor="#ccc"
          onPress={this.onRemoveFollower.bind(this)}>
            <Text style={[
              MessageStyles.actionBtnText,
              BaseStyles.sansSerifBold,
              BaseStyles.fontSmall,
              BaseStyles.textWhite
            ]}>
              Unfollow
            </Text>
        </TouchableHighlight>
      )
    }
  }

  /**
   * Displays an indicator on the contact's photo that displays
   * if the user is online or not.
   *
   * @return {object} component
   */
  getContactOnlineStatus() {
    let contact
    if (this.props.contact && this.props.contact.user) {
      contact = this.props.contact.user
    }

    if (this.props.isContactActive) {
      return (
        <View style={[
          MessageStyles.userActivePhoto,
          BaseStyles.photoMedium
        ]}>
          <UserPhoto photoSize="medium" user={contact} />
          <View style={[
            MessageStyles.activeUserIcon
          ]}>
          </View>
        </View>
      )
    } else {
      return (
        <View style={[
          MessageStyles.userInactivePhoto,
          BaseStyles.photoMedium
        ]}>
          <UserPhoto photoSize="medium" user={contact} />
        </View>
      )
    }
  }

  /**
   * Returns the contact's username.
   *
   * @return {object} component
   */
  getContactName() {
    const contact = this.props.contact

    let contactName = "Anonymous User"
    if (contact && contact.name) {
      contactName = contact.name
    }

    return (
      <View style={[
        MessageStyles.contactDetails,
        BaseStyles.marginLeft
      ]}>
        <Text style={[
          MessageStyles.contactName,
          BaseStyles.textWhite,
          BaseStyles.sansSerifMedium,
          BaseStyles.fontMedium,
        ]}>
          {contactName}
        </Text>
      </View>
    )
  }

  /**
   * Render the contact information component.
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        MessageStyles.contactInfoContainer,
        BaseStyles.darkestBg,
        BaseStyles.paddingVert,
        BaseStyles.paddingHorz,
        BaseStyles.row,
        BaseStyles.jusitifiedCols,
        BaseStyles.verticalCenteredCols
      ]}>
        <View style={[
          MessageStyles.contactInfo,
          BaseStyles.col1,
          BaseStyles.row
        ]}>
          {this.getContactOnlineStatus()}
          {this.getContactName()}
        </View>
        {this.getContactOptions()}
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo)
