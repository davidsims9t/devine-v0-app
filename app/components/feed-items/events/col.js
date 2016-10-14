import React, {
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import moment from 'moment'

import BaseStyles from '../../../themes/default/base'
import FeedStyles from '../../../themes/default/feed'

/**
 * 
 */
export default class EventCol extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: false
    }
  }

  handleToggleEvent() {
  }

  getImage() {

  }

  render() {
    let createdAt = moment(this.props.rowData).format('MMMM Do, YYYY')

    let price = this.props.event.price
    let salePrice = this.props.event.salePrice
    if (salePrice) {
      price = (
        <View>
          <Text style={BaseStyles.textMuted}>{price}</Text>
          <Text style={BaseStyles.strikeThrough}>{salePrice}</Text>
        </View>
      )
    }

    return (
      <View style={[
        FeedStyles.colContainer
      ]}>
        <View style={[
          FeedStyles.col,
          BaseStyles.whiteBg,
          BaseStyles.marginVert,
          BaseStyles.marginHorz,
          BaseStyles.paddingHorz
        ]}>
          <Text style={[
            FeedStyles.colTitle,
            BaseStyles.paddingVert,
            BaseStyles.fontSmall,
            BaseStyles.sansSerifMedium
          ]}>
            {this.props.event.title}
          </Text>
          {img}
          <Text style={[
            FeedStyles.colPrice,
            BaseStyles.paddingVert,
            BaseStyles.fontSmall,
            BaseStyles.sansSerifRegular
          ]}>
            {price}
          </Text>
          <Text style={[
            FeedStyles.colCreatedAt,
            BaseStyles.paddingVert,
            BaseStyles.fontSmall,
            BaseStyles.sansSerifRegular
          ]}>
            {createdAt}
          </Text>
        </View>
      </View>
    )
  }
}
