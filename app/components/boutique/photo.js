import React, {
  View,
  Image,
  Text,
  TouchableOpacity,
  Component,
  Dimensions,
  AlertIOS
} from 'react-native'
import Video from 'react-native-video'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import MediaTabbar from '../media/media-tabbar'
import UserPhoto from '../../user-photo'

import BaseStyles from '../../themes/default/base'
import BoutiqueStyles from '../../themes/boutique'

const window = Dimensions.get('window')

const photoSizes = {
  photo: {
    width: 144,
    height: 144
  },
  profilePhoto: {
    width: window.width,
    height: window.height / 3
  }
}

/**
 * This class is responsible for displaying the boutique profile photo.
 */
export default class BoutiquePhoto extends Component {
  handleGetPhotoOptions(photoType) {
    this.setState({photoType})

    let options = [
      {text: 'Upload a Photo/Video', onPress: this.handleOpenMediaModal.bind(this)}
    ]

    if (this.props.user.authData) {
      options.push(
        {
          text: 'Import Photo/Video From Facebook',
          onPress: this.handleImportPhotoFromFacebook.bind(this)
        }
      )
    }

    if (this.props.boutique.fbPhoto || this.props.boutique.photo) {
      options.push({
        text: 'Remove Photo/Video',
        onPress: this.handleRemovePhoto.bind(this)
      })
    }

    AlertIOS.alert('Choose an Option', '', options)
  }

  getProfilePhoto() {
    const boutique = this.props.boutique

    if (boutique.profilePhoto) {
      const mediaType = Helpers.getMediaType(boutique.profilePhoto._url)

      if (mediaType == 'photo') {
        return (
          <Image
            source={{uri: boutique.profilePhoto._url}}
            resizeContent="contain"
            style={[
              BoutiqueStyles.profilePhoto
            ]} />
        )
      } else if (mediaType == 'video') {
        return (
          <Video
            muted={true}
            repeat={true}
            style={[
              BoutiqueStyles.profilePhoto
            ]}
            source={{ uri: boutique.profilePhoto._url }} />
        )
      }

      return
    } else {
      return (
        <View style={[
          BoutiqueStyles.profilePhoto,
          BaseStyles.mediumBg,
          BaseStyles.row,
          BaseStyles.centeredCols,
          BaseStyles.verticalCenteredCols
        ]}>
          <MaterialIcon
            name="photo-camera"
            style={[
              BoutiqueStyles.profilePhotoIcon,
              BaseStyles.fontExtraLarge,
              BaseStyles.textLessMuted
            ]} />
        </View>
      )
    }
  }

  getPhoto() {
    return (
      <View style={[
        BoutiqueStyles.photoChangeContainer,
        BaseStyles.col1,
        BaseStyles.borderDark,
        BaseStyles.borderThick
      ]}>
        <TouchableOpacity
          style={[
            BoutiqueStyles.photoChangePress,
            BaseStyles.col1
          ]}
          onPress={() => this.handleGetPhotoOptions('photo')}>
            <UserPhoto user={this.props.boutique} photoSize="medium" />
        </TouchableOpacity>
      </View>
    )
  }

  getComponents() {
    const boutique = this.props.boutique

    if (!this.props.isEditingProfile) {
      return (
        <View style={[
          BaseStyles.bottom,
          BaseStyles.translucentContainer,
          BaseStyles.paddingVert,
          BoutiqueStyles.boutiqueNameContainer
        ]}>
          <Text style={[
            BoutiqueStyles.boutiqueName,
            BaseStyles.textWhite,
            BaseStyles.fontLarge,
            BaseStyles.sansSerifBold,
            BaseStyles.textCenter
          ]}>
            {boutique.name}
          </Text>
        </View>
      )
    } else {
      return (
        <View style={[
          BaseStyles.col1
        ]}>
          {this.getPhoto()}
        </View>
      )
    }
  }

  /**
   * Renders the boutique profile component.
   *
   * @return {object} component
   */
  render() {
    const boutique = this.props.boutique
    const width = photoSizes[this.state.photoType].width
    const height = photoSizes[this.state.photoType].height

    return (
      <View style={[
        BoutiqueStyles.photoContainer
      ]}>
        {this.getProfilePhoto(boutique)}
        {this.getComponents()}
        {this.getChangeProfilePhotoBtn()}
      </View>
    )
  }
}
