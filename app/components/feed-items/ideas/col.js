import React, {
  View,
  Text,
  TouchableHighlight
} from 'react-native'
import moment from 'moment'

import BaseStyles from '../../../themes/default/base'
import FeedStyles from '../../../themes/default/feed'

export default class InspirationCol extends Component {
  constructor(props) {
    super(props)

    this.state = {
      inspirationSelected: false
    }
  }

  // toggleInspiration() {
  //   if (!this.state.inspirationSelected) {
  //     this.props.events.emit('selectedInspiration', null)
  //   } else {
  //     this.props.events.emit('selectedInspiration', this.props.rowData.objectId)
  //   }
  // },
  //
  // selectInspirationBtn() {
  //   let icon
  //
  //   if (!this.state.inspirationSelected) {
  //     icon = (
  //       <Icon name="circle-o" style={[
  //         FeedStyles.inspirationIconDeselected,
  //         BaseStyles.textDark,
  //         BaseStyles.fontMedium
  //       ]} />
  //     )
  //   } else {
  //     icon = (
  //       <Icon name="check-circle-o" style={[
  //         FeedStyles.inspirationIconSelected,
  //         BaseStyles.textPrimary,
  //         BaseStyles.fontMedium
  //       ]} />
  //     )
  //   }
  //
  //   return (
  //     <TouchableHighlight
  //       style={[
  //         FeedStyles.inspirationTogglePress
  //       ]}
  //       onPress={this.toggleInspiration}>
  //       {icon}
  //     </TouchableHighlight>
  //   )
  // },

  render() {
    let createdAt = moment(this.props.rowData).format('MMMM Do, YYYY')

    let img
    const photo = this.props.rowData.photo
    if (photo) {
      img = (
        <Image
          source={{uri: photo.url}}
          style={[
            FeedStyles.colImg,
            BaseStyles.paddingVert
          ]}
          resizeContent="contain" />
      )
    } else {
      img = (
        <View style={[
          FeedStyles.colImg,
          BaseStyles.mediumBg,
          BaseStyles.verticalCenteredCols,
          BaseStyles.centeredCols
        ]}>
          <Icon
            name="user"
            style={[
              BaseStyles.textLessMuted
            ]} />
        </View>
      )
    }

    let price = this.props.inspiration.price
    let salePrice = this.props.inspiration.salePrice
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
            {this.props.inspiration.title}
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
