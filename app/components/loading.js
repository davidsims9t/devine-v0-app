import React, {
  ActivityIndicatorIOS,
  View,
  Component
} from 'react-native'

import BaseStyles from '../themes/default/base'

/**
 *
 */
export default class LoadingView extends Component {
  /**
   * Reners an animated load icon
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        BaseStyles.loadingContainer,
        BaseStyles.centeredCols,
        BaseStyles.verticalCenteredCols,
        BaseStyles.loadIcon
      ]}>
        <ActivityIndicatorIOS />
      </View>
    )
  }
}
