import React, {
  View,
  ListView,
  Component
} from 'react-native'

// Components
import Header from '../header'
import Actions from '../actions'
import Description from '../description'
import FeedCarousel from '../carousel'
import BoutiqueInfo from '../boutique-info'

// Styles
import BaseStyles from '../../../themes/default/base'
import FeedStyles from '../../../themes/default/feed'

/**
 * This class is responsible for displaying an individual event item row.
 */
export default class EventItem extends Component {
  /**
   * Render the event row.
   *
   * @return {object} component
   */
  render() {
    const { user, actions, rowData } = this.props

    return (
      <View style={[
        FeedStyles.eventItem,
        BaseStyles.col1,
        BaseStyles.marginVert,
        BaseStyles.borderBottomLight
      ]}>
        <Header
          actions={actions}
          rowData={rowData} />
        <FeedCarousel
          rowData={rowData} />
        <Actions
          className="Event"
          actions={actions}
          showActions={['likes', 'participants', 'comments', 'shares']}
          rowData={rowData} />
        <Description
          rowData={rowData} />
        <BoutiqueInfo
          rowData={rowData} />
      </View>
    )
  }
}
