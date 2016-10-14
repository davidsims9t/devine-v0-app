import React, {
  Component,
  AlertIOS,
  LinkingIOS,
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { create } from '../actions/user-boutique'

import BaseStyles from '../../themes/default/base'
import BoutiqueStyles from '../../themes/default/boutique'

/**
 * This class is responsible for rendering the user options on the boutique's profile.
 */
export default class BoutiqueOptions extends Component {
  /**
   * Add the current user as a follower.
   *
   * @return {void}
   */
  handleAddFollower() {
    this.props.create({
      user: this.props.user.objectId,
      boutique: this.props.boutique.objectId,
      isFollowing: true
    })
  }

  /**
   *
   *
   * @return {[type]} [description]
   */
  handleRemoveFollower() {
    if (this.props.userBoutique && this.props.userBoutique) {
      try {
        // await UserBoutiqueUtils.update(this.props.userBoutique[0])
      } catch(error) {
        AlertIOS.error("Failed to unfollow boutique.")
      }
    } else {
    }
  }

  async handleWebsiteNavigate() {
    const boutique = this.props.boutique
    let websiteClicks = boutique.websiteClicks

    try {
      await Backend.update(boutique, {
        websiteClicks: ++websiteClicks
      })

      LinkingIOS.openURL(boutique.website)
    } catch (error) {
      AlertIOS.alert("Failed to open website.")
    }
  }

  async handleMapNavigate() {
    const boutique = this.props.boutique
    let mapClicks = boutique.mapClicks
    const address = rowData.address + ' ' + rowData.city + ', ' + rowData.state + ' ' + rowData.zip
    const url = 'http://maps.google.com/?q=' + address

    try {
      await Backend.update(boutique, {
        mapClicks: ++mapClicks
      })

      LinkingIOS.openURL(url)
    } catch(error) {
      AlertIOS.alert("Failed to open map directions.")
    }
  }

  handleBoutiqueInfoNavigate() {
    let route = Routes.getRoute('boutiqueInfo', {
      leftBtnPress: () => this.props.navigator.pop()
    })

    route.boutique = this.props.boutique

    this.props.navigator.push(route)
  }

  async handleMessageNavigate() {
    const boutique = this.props.boutique
    let messageClicks = boutique.messageClicks

    try {
      await Backend.update(boutique, {
        messageClicks: ++messageClicks
      })
    } catch(error) {
      AlertIOS.alert("Failed to open URL.")
    }
  }

  /**
   * [getTabs description]
   * @return {[type]} [description]
   */
  getTabs() {
    const boutique = this.props.boutique

    return [
      {
        icon: 'add',
        altIcon: 'remove',
        enabled: !!this.props.user,
        onPress: this.handleAddFollower.bind(this),
        handleAltPress: this.handleRemoveFollower.bind(this)
      },
      {
        icon: 'place',
        enabled: boutique.address && boutique.city && boutique.state && boutique.zip,
        onPress: this.handleMapNavigate.bind(this)
      },
      {
        icon: 'link',
        enabled: boutique.website,
        onPress: this.handleWebsiteNavigate.bind(this)
      },
      {
        icon: 'message',
        enabled: !!this.props.user,
        onPress: this.handleMessageNavigate.bind(this),
      },
      {
        icon: 'more-horiz',
        enabled: true,
        onPress: this.handleBoutiqueInfoNavigate.bind(this),
      }
    ]
  }

  getTab(props) {
    let icon = props.icon
    let onPress = props.onPress
    if (props.altIcon && this.props.userBoutique && this.props.userBoutique.length) {
      icon = props.altIcon
    }

    if (props.handleAltPress && this.props.userBoutique && this.props.userBoutique.length) {
      onPress = props.handleAltPress
    }

    if (props.enabled) {
      return (
        <TouchableHighlight
          style={[
            BoutiqueStyles.tabPress,
            BaseStyles.paddingVert,
            BaseStyles.col1
          ]}
          onPress={onPress}
          underlayColor="#222">
            <View style={[
              BoutiqueStyles.tab,
              BaseStyles.col1
            ]}>
              <MaterialIcon
                name={icon}
                style={[
                  BaseStyles.textWhite,
                  BaseStyles.textCenter,
                  BaseStyles.fontLarge
                ]} />
            </View>
        </TouchableHighlight>
      )
    } else {
      return (
        <View style={[
          BoutiqueStyles.tabDisabled,
          BaseStyles.paddingVert,
          BaseStyles.col1
        ]}>
          <MaterialIcon
            name={props.icon}
            style={[
              BaseStyles.textLessMuted,
              BaseStyles.textCenter,
              BaseStyles.fontLarge
            ]} />
        </View>
      )
    }
  }

  /**
   * Renders the boutique options menu.
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        BoutiqueStyles.boutiqueInfo,
        BaseStyles.blackBg,
        BaseStyles.row,
        BaseStyles.justifiedCols
      ]}>
        {this.getTabs().map((props) => {
          return this.getTab(props)
        }, this)}
      </View>
    )
  }
}
