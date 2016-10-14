import React, {
  View,
  Image,
  Component
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import BaseStyles from '../themes/default/base'

const photoSizes = {
  extraSmall: BaseStyles.photoExtraSmall,
  small: BaseStyles.photoSmall,
  medium: BaseStyles.photoMedium,
  large: BaseStyles.photoLarge
}

const iconSizes = {
  extraSmall: BaseStyles.fontSmall,
  small: BaseStyles.fontMedium,
  medium: BaseStyles.fontLarge,
  large: BaseStyles.fontLarge
}

export default class UserPhoto extends Component {
  render() {
    let props = this.props
    let photoSize = photoSizes[props.photoSize]
    let iconSize = iconSizes[props.photoSize]

    if (props.user && props.user.photo) {
      return (
        <Image
          resizeMode="contain"
          style={photoSize}
          source={{uri: props.user.photo._url}} />
      )
    } else if (props.user && props.user.fbPhoto) {
      return (
        <Image
          resizeMode="contain"
          style={photoSize}
          source={{uri: props.user.fbPhoto}} />
      )
    }

    return (
      <View style={[
        photoSize,
        this.props.style,
        BaseStyles.mediumBg,
        BaseStyles.row,
        BaseStyles.verticalCenteredCols,
        BaseStyles.centeredCols
      ]}>
        <MaterialIcon
          name="person"
          style={[
            iconSize,
            BaseStyles.textLessMuted
          ]} />
      </View>
    )
  }
}
