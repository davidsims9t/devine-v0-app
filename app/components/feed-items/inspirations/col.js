import React, {
  View,
  Text,
  TouchableHighlight,
  Component
} from 'react-native'

import FeedItemHeader from '../header'
import FeedCarousel from '../carousel'
import Description from '../description'

import BaseStyles from '../../../themes/default/base'
import FeedStyles from '../../../themes/default/feed'

/**
 * 
 */
export default class InspirationCol extends Component {
  /**
   * Renders the inspiration grid column
   *
   * @return object
   */
  render() {
    const props = this.props

    return (
      <View style={[
        FeedStyles.gridColContainer,
        BaseStyles.hiddenOverflow
      ]}>
        <View style={[
          FeedStyles.gridCol,
          BaseStyles.col,
          BaseStyles.whiteBg,
          BaseStyles.marginVert,
          BaseStyles.marginHorz,
          BaseStyles.paddingVert,
          BaseStyles.paddingHorz
        ]}>
          <FeedItemHeader
            isGridLayout={true}
            showAdminOptions={props.showAdminOptions}
            navigator={props.navigator}
            boutique={props.boutique}
            user={props.user}
            isBoutique={props.isBoutique}
            isStylist={props.isStylist}
            rowData={props.rowData} />
        </View>
      </View>
    )
  }
}
