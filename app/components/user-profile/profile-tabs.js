import React, {
  View,
  Text,
  TouchableHighlight,
  Component
} from 'react-native'

import BaseStyles from '../../themes/default/base'

/**
 * This class is responsible for returning the profile tabs.
 */
export default class ProfileTabs extends Component {
  /**
   * Returns an individual tab such as Inspiration, Event, or Idea.
   *
   * @param {object} props -
   * @return {object} component
   */
  getTab(props) {
    let countComponent
    const items = this.props.items
    const countCol = props.countCol
    let title = props.title

    let textColor = BaseStyles.textDark
    if (this.props.selectedTab == props.col) {
      textColor = BaseStyles.textPrimary
    }

    if (countCol && items) {
      const count = items[countCol] || 0

      countComponent = (
        <Text style={[
          BaseStyles.tabCountText,
          BaseStyles.fontLarge,
          BaseStyles.textDark,
          BaseStyles.textCenter,
          BaseStyles.sansSerifRegular,
          textColor
        ]}>
          {count}
        </Text>
      )

      if (title && count != 1) {
        title += 's'
      }
    }

    return (
      <TouchableHighlight
        style={[
          BaseStyles.tabPress,
          BaseStyles.paddingVert,
          BaseStyles.col1
        ]}
        onPress={() => this.props.onSetTab(props.col)}
        underlayColor="#ccc">
          <View style={[
            BaseStyles.tab,
            BaseStyles.col1
          ]}>
            {countComponent}
            <Text style={[
              BaseStyles.tabTitleText,
              BaseStyles.fontExtraSmall,
              BaseStyles.textCenter,
              BaseStyles.sansSerifRegular,
              textColor
            ]}>
              {String(title).toUpperCase()}
            </Text>
          </View>
      </TouchableHighlight>
    )
  }

  /**
   * Renders the user profile tabs.
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        BaseStyles.tabs,
        BaseStyles.row,
        BaseStyles.justifiedCols,
        BaseStyles.lightBg
      ]}>
        {this.props.tabs.map((props) => {
          return this.getTab(props)
        }, this)}
      </View>
    )
  }
}
