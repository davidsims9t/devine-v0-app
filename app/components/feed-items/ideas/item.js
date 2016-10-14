import React, {
  View,
  Component
} from 'react-native'

// Components
import Header from '../header'
import ArticleInfo from '../../article'
import Actions from '../actions'
import Description from '../description'
import BoutiqueInfo from '../boutique-info'

// Styles
import BaseStyles from '../../../themes/default/base'
import FeedStyles from '../../../themes/default/feed'

/**
 * This class is responsible for displaying an individual idea item row.
 */
export default class IdeaItem extends Component {
  /**
   * Render an idea feed row.
   *
   * @return {object} component
   */
  render() {
    const { user, actions, rowData } = this.props

    return (
      <View style={[
        FeedStyles.ideaItem,
        BaseStyles.col1,
        BaseStyles.marginVert,
        BaseStyles.borderBottom
      ]}>
        <Header
          actions={actions}
          user={user}
          rowData={rowData} />
        <ArticleInfo rowData={rowData} />
        <Actions
          className="Idea"
          actions={actions}
          showActions={['likes', 'favorites', 'comments', 'shares']}
          rowData={rowData} />
        <Description
          rowData={rowData} />
      </View>
    )
  }
}
