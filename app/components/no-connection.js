import React, {
  View,
  Text,
  Component
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import BaseStyles from '../themes/default/base'

/**
 * 
 */
export default class NoConnectionView extends Component {
  /**
   * Renders a no connection icon
   *
   * @return object
   */
  render() {
    return (
      <View style={[
        BaseStyles.col1,
        BaseStyles.verticalCenteredCols,
        BaseStyles.centeredCols
      ]}>
        <MaterialIcon
          name="signal-wifi-off"
          style={[
            BaseStyles.textMuted,
            BaseStyles.fontExtraLarge
          ]} />
        <Text style={[
          BaseStyles.textDark,
          BaseStyles.fontMedium,
          BaseStyles.sansSerifMedium
        ]}>
          No connection available
        </Text>
      </View>
    )
  }
}
