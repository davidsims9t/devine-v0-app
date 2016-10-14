import React, {
  View,
  TouchableWithoutFeedback,
  Text,
  NativeModules,
  Component,
  AlertIOS
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Sound from 'react-native-simple-sound'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { updateStats } from '../../actions/feed'

// Components
import OptionPopup from '../menus/option-popup'

// Styles
import BaseStyles from '../../themes/default/base'
import FeedStyles from '../../themes/default/feed'

const mapStateToProps = state => ({
  hasFavored: state.feed.hasFavored,
  hasLiked: state.feed.hasLiked
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateStats }, dispatch)
}

// const Composer = NativeModules.RNMessageComposer
const KDSocialShare = NativeModules.KDSocialShare

/**
 * This class is responsible for possible actions that can be performed with feed items.
 */
class Actions extends Component {
  /**
   * Add/remove favorites
   *
   * @return {void}
   */
  onFavoriteBtnPress() {
    this.props.updateStats({
      rowData: this.props.rowData,
      colName: "favorites",
      canRemove: true,
      user: this.props.user
    })

    // Sound.enable(true)
    // Sound.play('sounds-876-yep.aac')
  }

  /**
   * Add/remove like.
   *
   * @return {object}
   */
  onLikeBtnPress() {
    this.props.updateStats({
      rowData: this.props.rowData,
      colName: "likes",
      canRemove: true,
      user: this.props.user
    })

    // Sound.enable(true)
    // Sound.play('sounds-876-yep.aac')
  }

  /**
   * Creates a new record when a feed item has been shared.
   *
   * @param {string} result - the response from the share (cancelled or success)
   * @param {string} network - the social network the feed item has been shared on
   * @return {void}
   */
  onUpdateShareStats(result, network) {
    if (result == "success") {
      this.props.updateStats({
        rowData: this.props.rowData,
        clickItem: network,
        clickItemColName: "network",
        colName: "shares",
        user: this.props.user
      })
    }
  }

  /**
   * Share a feed item on Twitter.
   *
   * @return {void}
   */
  onTwitterShare() {
    this.refs.shareOptionsModal.onSetVisible()

    KDSocialShare.tweet({
      'text': this.props.rowData.title,
      'link': 'http://godevine.com/',
      'imagelink': 'https://artboost.com/apple-touch-icon-144x144.png'
    }, (result) => this.onUpdateShareStats(result, "twitter"))
  }

  /**
   * Share a feed item on Facebook.
   *
   * @return {void}
   */
  onFacebookShare() {
    this.refs.shareOptionsModal.onSetVisible()
    const rowData = this.props.rowData

    KDSocialShare.shareOnFacebook({
      'text': rowData.title,
      'link': 'http://godevine.com/',
      'imagelink': 'https://artboost.com/apple-touch-icon-144x144.png'
    }, (result) => this.onUpdateShareStats(result, "facebook"))
  }

  /**
   * Share a feed item via text messaging.
   *
   * @return {void}
   */
  onSmsShare() {
    // Composer.composeMessageWithArgs({
    //   'messageText': 'Hey I was browsing Devine and I found something you might like!',
    //   'subject': 'Hey check this out on Devine',
    //   'recipients': []
    // }, (result) => this.onUpdateShareStats(result, "sms"))
  }

  /**
   * Toggle share modal.
   *
   * @return {void}
   */
  onShareBtnPress() {
    if (this.props.rowData) {
      this.refs.shareOptionsModal.setVisible()
    }
  }

  /**
   * Navigate to the message detail scene.
   *
   * @return {void}
   */
  onMessageBtnPress() {
    const { rowData } = this.props
    const { stylist, boutique } = rowData

    // if (boutique.shouldUseBoutiqueInbox || !stylist) {
    //   route.contact = boutique
    // } else if (stylist) {
    //   route.contact = stylist
    // } else {
    //   AlertIOS.alert("Failed to navigate to message view.")
    //   return
    // }

    this.props.actions.push({
      name: 'messageDetail'
    })
  }

  /**
   * Return a single action icon.
   *
   * @param {object} props - icon props
   * @return {object}
   */
  getIcon(props) {
    let iconColor = BaseStyles.textDark
    let icon = props.icon
    const likes = this.props.rowData.likes || []
    const favorites = this.props.rowData.favorites || []

    if (this.props.user) {
      const userId = this.props.user.objectId

      if (icon == "star-border" && (favorites.indexOf(userId) != -1 || this.props.hasFavored)) {
        icon = props.activeIcon
        iconColor = BaseStyles.textYellow
      }

      if (icon == "favorite-border" && (likes.indexOf(userId) != -1 || this.props.hasLiked)) {
        icon = props.activeIcon
        iconColor = BaseStyles.textPrimary
      }
    }

    if (this.props.boutique) {
      iconColor = BaseStyles.textMuted
    }

    return (
      <MaterialIcon
        name={icon}
        style={[
          FeedStyles.icon,
          BaseStyles.fontLarge,
          iconColor
        ]} />
    )
  }

  /**
   * Render a single action button.
   *
   * @param {object} props - button props
   * @return {object} component
   */
  getActionBtn(props) {
    const icon = this.getIcon(props)

    let onPress = props.onPress
    // if (!this.props.user && props.shouldRequireLogin) {
    //   onPress = this.props.actions.routes.logIn()
    // }

    return (
      <TouchableWithoutFeedback style={[
        FeedStyles.actionPress,
        BaseStyles.paddingHorz
      ]} onPress={onPress}>
        {icon}
      </TouchableWithoutFeedback>
    )
  }

  /**
   * An array of possible feed actions.
   *
   * @return {array}
   */
  getActions() {
    const routes = this.props.actions.routes
    const rowData = this.props.rowData

    const possibleOptions = {
      likes: {icon: 'favorite-border', activeIcon: 'favorite', shouldRequireLogin: true, onPress: this.onLikeBtnPress.bind(this)},
      favorites: {icon: 'star-border', activeIcon: 'star', shouldRequireLogin: true, onPress: this.onFavoriteBtnPress.bind(this)},
      participants: {icon: 'star-border', activeIcon: 'star', shouldRequireLogin: true, onPress: this.onFavoriteBtnPress.bind(this)},
      comments: {icon: 'comment', onPress: routes.comments(rowData)},
      messages: {icon: 'store', shouldRequireLogin: true, onPress: this.onMessageBtnPress.bind(this)},
      shares: {icon: 'share', shouldRequireLogin: true, onPress: this.onShareBtnPress.bind(this)},
    }

    const actions = this.props.showActions.map((actionName) => {
      return possibleOptions[actionName]
    })

    return actions
  }

  /**
   * Returns a list of possible social sharing options.
   *
   * @return {object}
   */
  getShareOptions() {
    return {
      heading: 'Share On Social Media',
      list: [
        {icon: 'facebook', text: 'Facebook', onPress: this.onFacebookShare.bind(this)},
        {icon: 'twitter', text: 'Twitter', onPress: this.onTwitterShare.bind(this)},
        {icon: 'textsms', text: 'Text', onPress: this.onSmsShare.bind(this)}
      ]
    }
  }

  /**
   * Render feed action buttons.
   *
   * @return {object}
   */
  render() {
    return (
      <View style={[
        FeedStyles.actionContainer,
        BaseStyles.paddingHorz,
        BaseStyles.col1
      ]}>
        <OptionPopup
          ref="shareOptionsModal"
          options={this.getShareOptions()} />
        <View style={[
          FeedStyles.iconContainer,
          BaseStyles.marginBottom,
          BaseStyles.row,
          BaseStyles.justifiedCols
        ]}>
          {this.getActions().map((action) => {
            return this.getActionBtn(action)
          }, this)}
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actions)
