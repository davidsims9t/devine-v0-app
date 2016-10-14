import React, {
  CameraRoll,
  ScrollView,
  View,
  TouchableHighlight,
  Image,
  Text,
  Component,
  AlertIOS
} from 'react-native'
import Video from 'react-native-video'

// Components
import MediaPreview from './media-preview'
import Helpers from '../../utils/helpers'

// Styles
import BaseStyles from '../../themes/default/base'
import MediaStyles from '../../themes/media'

const fetchParams = {
  first: 1000,
  assetType: 'All'
}

/**
 * This class is responsible for displaying the camera roll.
 */
export default class CameraRollManager extends Component {
  /**
   * Contains state of media from camera roll.
   *
   * @param {object} props -
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      media: []
    }
  }

  /**
   *
   *
   * @return {void}
   */
  componentDidMount() {
    CameraRoll.getPhotos(fetchParams, this.handleStoreMedia.bind(this), this.onError.bind(this))
  }

  /**
   * Alert dialog that appears when an error occurs.
   *
   * @param {string} message - the error message
   * @return {void}
   */
  onError(message) {
    AlertIOS.alert(message)
  }

  /**
   *
   *
   * @param  {[type]} addedMedia [description]
   * @return {[type]}            [description]
   */
  handleAddMedia(addedMedia) {
    let media = this.state.media

    if (addedMedia.base64) {
      CameraRoll.saveImageWithTag(addedMedia.base64, (uri) => {
        let mediaToAdd = {
          width: addedMedia.width,
          height: addedMedia.height,
          type: addedMedia.type
        }

        if (uri) {
          mediaToAdd.uri = uri
        }

        media.push(mediaToAdd)
        this.setState({media})
      }, (error) => {
        console.log(error)
      })
    } else {
      CameraRoll.getPhotos(fetchParams, this.onStoreMedia.bind(this), this.handleError.bind(this))
    }
  }

  /**
   * [handleStoreMedia description]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  onStoreMedia(data) {
    if (data && data.edges) {
      let media = data.edges.map((asset) => {
        return {
          uri: asset.node.image.uri,
          width: asset.node.image.width,
          height: asset.node.image.height,
          type: getType(asset.node.image.uri)
        }
      })

      this.setState({media})
    } else {
      AlertIOS.alert("Failed to retrieve images from camera roll.")
    }
  }

  /**
   *
   *
   * @return {[type]} [description]
   */
  getMediaItems() {
    let selectedMedia = this.props.selectedMedia

    const map = this.state.media.map((media) => {
      let selectedStyle = BaseStyles.borderBlack

      if (selectedMedia.indexOf(media) != -1) {
        selectedStyle = BaseStyles.borderPrimary
      }

      const mediaType = Helpers.getMediaType(media.uri)

      let component
      if (mediaType == 'photo') {
        component = (
          <Image
            style={[
              MediaStyles.gridImage,
              BaseStyles.borderThick,
              selectedStyle
            ]}
            source={{ uri: media.uri }} />
        )
      } else if (mediaType == 'video') {
        component = (
          <Video
            muted={true}
            repeat={true}
            style={[
              MediaStyles.gridImage,
              BaseStyles.borderThick,
              selectedStyle
            ]}
            source={{ uri: media.uri }} />
        )
      }

      return (
        <TouchableHighlight
          onPress={() => this.props.handleSelectMedia(media)}>
            <View>
              {component}
            </View>
        </TouchableHighlight>
      )
    })

    return map
  }

  /**
   * Renders the camera roll component.
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        MediaStyles.mediaLibraryContainer,
        BaseStyles.col1,
        BaseStyles.blackBg
      ]}>
        <View style={[
          MediaStyles.currentImageContainer
        ]}>
          <MediaPreview
            width={this.props.width}
            height={this.props.height}
            onAddMedia={this.onAddMedia.bind(this)}
            currentlySelected={this.props.currentlySelected} />
        </View>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={[
            BaseStyles.row,
            BaseStyles.wrap,
            BaseStyles.tabMargin
          ]}>
            {this.getMediaItems()}
        </ScrollView>
      </View>
    )
  }
}
