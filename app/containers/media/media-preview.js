import React, {
  View,
  Component,
  TouchableOpacity,
  Text,
  Image,
  Dimensions
} from 'react-native'
import Video from 'react-native-video'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MediaEditModal from './media-edit-modal'

import BaseStyles from '../../themes/default/base'
import MediaStyles from '../../themes/media'

const window = Dimensions.get('window')

/**
 * This class is responsible for.
 */
export default class MediaPreview extends Component {
  getComponent() {
    const currentlySelected = this.props.currentlySelected

    if (currentlySelected && currentlySelected.type == 'photo') {
      let uri = currentlySelected.uri
      if (currentlySelected.base64) {
        uri = currentlySelected.base64
      }

      return (
        <Image
          style={{
            width: window.width,
            height: window.height
          }}
          resizeMode="cover"
          source={{ uri }} />
      )
    } else if (currentlySelected && currentlySelected.type == 'video') {
      return (
        <Video
          style={{
            width: window.width,
            height: window.height
          }}
          muted={true}
          repeat={true}
          source={{ uri: currentlySelected.uri }} />
      )
    }
  }

  handleOpenEditModal() {
    this.refs.mediaEditModal.handleToggleVisibility()
  }

  getEditBtn() {
    if (this.props.currentlySelected) {
      return (
        <TouchableOpacity
          style={[
            MediaStyles.openEditModalBtn,
            BaseStyles.transparentBg
          ]}
          onPress={this.handleOpenEditModal.bind(this)}>
            <MaterialIcon
              name="edit"
              style={[
                MediaStyles.editImage,
                BaseStyles.textWhite,
                BaseStyles.fontLarge
              ]} />
        </TouchableOpacity>
      )
    }
  }

  render() {
    return (
      <View style={[
        MediaStyles.mediaPreviewContainer,
        BaseStyles.col1
      ]}>
        <MediaEditModal
          ref="mediaEditModal"
          width={this.props.width}
          height={this.props.height}
          handleAddMedia={this.props.handleAddMedia}
          currentlySelected={this.props.currentlySelected} />
        {this.getComponent()}
        {this.getEditBtn()}
      </View>
    )
  }
}
