import React, {
  View,
  TouchableHighlight,
  Text,
  SwitchIOS,
  Component,
  PushNotificationIOS
} from 'react-native'

import BaseStyles from '../../themes/default/base'
import SettingStyles from '../../themes/settings'

/**
 * @type {Array}
 */
const accessOptions = [
  {
    heading: 'Inspirations',
    options: [
      {text: 'Receive Push Notifications', key: 'canReceiveInspirationNotifications', type: 'switch'}
    ]
  },
  {
    heading: 'Event Access',
    options: [
      {text: 'Receive Push Notifications', key: 'canReceiveEventNotifications', type: 'switch'}
    ]
  },
  {
    heading: 'Idea Access',
    options: [
      {text: 'Receive Push Notifications', key: 'canReceiveIdeaNotifications', type: 'switch'}
    ]
  }
]

/**
 * 
 */
export default class UserNotififications extends Component {
  constructor(props) {
    super(props)

    this.state = {
      canReceiveInspirationNotifications: !!props.user.canReceiveInspirationNotifications,
      canPostEvents: !!props.user.canReceiveEventNotifications,
      canPostIdeas: !!props.user.canReceiveIdeaNotifications
    }
  }

  handleUpdateOption(inOn) {
  }

  getAccessOption(option) {
    let toggleSwitch
    let self = this

    if (option.type == "switch") {
      toggleSwitch = (
        <SwitchIOS
          tintColor="#ccc"
          onTintColor="#009AE0"
          onValueChange={this.handleUpdateOption.bind(this)}
          value={this.state[option.key]} />
      )
    }

    return (
      <View style={[
        SettingStyles.option,
        BaseStyles.whiteBg,
        BaseStyles.paddingVert,
        BaseStyles.paddingHorz
      ]}>
        <View style={[
          SettingStyles.optionRow,
          BaseStyles.row,
          BaseStyles.justifiedCols,
          BaseStyles.verticalCenteredCols
        ]}>
          <Text style={[
            BaseStyles.fontMedium,
            BaseStyles.sansSerifRegular,
            BaseStyles.textDark
          ]}>
            {option.text}
          </Text>
          {toggleSwitch}
        </View>
      </View>
    )
  }

  getAccessOptionGroup(group) {
    return (
      <View style={[
        SettingStyles.stylistOption,
        BaseStyles.marginVert
      ]}>
        <Text style={[
          SettingStyles.heading,
          BaseStyles.paddingHorz,
          BaseStyles.paddingVert,
          BaseStyles.sansSerifBold,
          BaseStyles.textDark,
          BaseStyles.fontSmall
        ]}>
          {group.heading}
        </Text>
        {group.options.map((option) => {
          return this.getAccessOption(option)
        }, this)}
      </View>
    )
  }

  render() {
    return (
      <View style={[
        SettingStyles.stylistContainer,
        BaseStyles.col1,
        BaseStyles.lightBg
      ]}>
        {accessOptions.map((group) => {
          return this.getAccessOptionGroup(group)
        }, this)}
      </View>
    )
  }
}
