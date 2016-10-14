import React, {
  View,
  Text,
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
 * This class is responsible for displaying an individual inspiration item row.
 */
export default class InspirationItem extends Component {
  /**
   * Render inspiration feed row.
   *
   * @return {object} component
   */
  render() {
    const { user, actions, rowData } = this.props

    return (
      <View style={[
        FeedStyles.inspirationItem,
        BaseStyles.col1,
        BaseStyles.marginVert,
        BaseStyles.borderBottom
      ]} onLayout={nativeEvent => {
        // console.log(nativeEvent)
      }}>
        <Header
          actions={actions}
          rowData={rowData} />
        <FeedCarousel
          user={user}
          rowData={rowData} />
        <Actions
          className="Inspiration"
          user={user}
          actions={actions}
          showActions={['likes', 'favorites', 'messages', 'comments', 'shares']}
          rowData={rowData} />
        <Description
          user={user}
          actions={actions}
          rowData={rowData} />
        <BoutiqueInfo
          user={user}
          rowData={rowData} />
      </View>
    )
  }
}
