import React, {
  TouchableHighlight,
  View,
  Text,
  Component
} from 'react-native'

import BaseStyles from '../themes/default/base'

/**
 * This class renders the save button that dynamically updates on save and update operations.
 */
export default class SaveBtn extends Component {
  render() {
    const disabledTerm = this.props.isUpdating ? this.props.savingTerm : this.props.saveTerm
    const enabledTerm = this.props.hasBeenSaved ? this.props.savedTerm : this.props.saveTerm

    if (!this.props.isSaveBtnDisabled && !this.props.isUpdating) {
      return (
        <TouchableHighlight
          style={[
            BaseStyles.buttonPrimaryPress,
            BaseStyles.col1
          ]}
          onPress={this.props.onPress}>
            <Text style={[
              BaseStyles.button,
              BaseStyles.buttonPrimary
            ]}>
              {enabledTerm}
            </Text>
        </TouchableHighlight>
      )
    }

    return (
      <View style={[
        BaseStyles.mediumBg,
        BaseStyles.col1
      ]}>
        <Text style={[
          BaseStyles.button,
          BaseStyles.buttonDisabled
        ]}>
          {disabledTerm}
        </Text>
      </View>
    )
  }
}
