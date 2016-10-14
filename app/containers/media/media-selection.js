import React from 'react-native'
import Parse from 'parse/react-native'
import ParseReact from 'parse-react/react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import _ from 'lodash'
import Video from 'react-native-video'

import Helpers from '../../utils/helpers'
import FeedUtils from '../../utils/feed'
import Backend from '../../utils/backend'
import MediaTabbar from './media-tabbar'

import SaveBtn from '../buttons/save'
import Routes from '../routes'

import BaseStyles from '../../themes/default/base'
import MediaStyles from '../../themes/media'

const {
  View,
  TouchableHighlight,
  Image,
  Text,
  AlertIOS
} = React

const maxMediaSelection = 9

const classTypes = {
  "inspiration": "Inspiration"
}

export default class MediaSelection extends Component {
  constructor(props) {
    super(props)

    let selectedImage = null
    if (props.route.media) {
      selectedImage = props.route.media
    }

    let activeObject = null
    if (props.route.activeObject) {
      activeObject = props.route.activeObject
    }

    this.state = {
      selectedMedia: [],
      activeObject,
      isUpdating: false,
      hasBeenSaved: false,
      isContinueBtnDisabled: props.route.shouldRequireMedia
    }
  }

  async handleMedia(selectedMedia) {
    const activeObject = this.state.activeObject
    let fields = {
      boutique: this.props.boutique,
      stylist: this.props.stylist,
      author: this.props.user
    }

    this.setState({
      isUpdating: true,
      isContinueBtnDisabled: true
    })

    if (this.props.route && this.props.route.classType && !activeObject) {
      const className = classTypes[this.props.route.classType]

      try {
        const newObject = await FeedUtils.create(className, {...fields})
        this.handleAddMedia(newObject, selectedMedia)

        this.setState({
          activeObject: newObject,
          isUpdating: false
        })
      } catch(error) {
        this.setState({
          isUpdating: false
        })

        AlertIOS.alert("Failed to upload media")
      }
    } else {
      this.handleAddMedia(activeObject, selectedMedia)
    }
  }

  async handleAddMedia(activeObject, selectedMedia) {
    try {
      const media = await Backend.create("Media", {source: selectedMedia})

      if (media && media.source && media.source._url) {
        await Backend.update(activeObject, {updatedBy: this.props.user})
        await Backend.addRelation(activeObject, "media", media)

        let selectedMedia = this.state.selectedMedia
        selectedMedia.push(media.source._url)

        this.setState({
          selectedMedia,
          isContinueBtnDisabled: !selectedMedia.length,
          hasBeenSaved: true
        })
      } else {
        this.setState({
          isUpdating: false
        })

        throw "Failed to upload media."
      }
    } catch(error) {
      this.setState({
        isUpdating: false
      })

      AlertIOS.alert("Failed to upload media: " + error.message)
    }
  }

  handleContinuePress() {
    let route = Routes.getRoute(this.props.route.nextComponent, {
      leftBtnPress: () => this.props.navigator.pop()
    })

    route.activeObject = this.state.activeObject
    route.media = this.state.selectedMedia

    this.props.navigator.push(route)
  }

  handleToggleMediaModal() {
    this.refs.mediaTabbarModal.handleOpenModal()
  }

  getSelectedMedia() {
    let media = this.state.selectedMedia.map((media) => {
      const mediaType = Helpers.getMediaType(media)

      let mediaComponent
      if (mediaType == "photo") {
        mediaComponent = (
          <Image
            source={{ uri: media }}
            style={MediaStyles.selectionGridItem} />
        )
      } else if (mediaType == "video") {
        mediaComponent = (
          <Video
            muted={true}
            repeat={true}
            source={{ uri: media }}
            style={MediaStyles.selectionGridItem} />
        )
      }

      if (mediaComponent) {
        return (
          <TouchableHighlight
            style={[
              MediaStyles.selectionGridItem,
              BaseStyles.marginVert,
              BaseStyles.darkestBg,
              BaseStyles.centeredCols,
              BaseStyles.verticalCenteredCols
            ]} onPress={this.handleToggleMediaModal.bind(this)}>
              <View>
                {mediaComponent}
              </View>
          </TouchableHighlight>
        )
      }
    }, this)

    for (let i = media.length; i < maxMediaSelection; i++) {
      media.push((
        <TouchableHighlight
          style={[
            MediaStyles.selectionGridItem,
            BaseStyles.marginVert,
            BaseStyles.darkestBg,
            BaseStyles.centeredCols,
            BaseStyles.verticalCenteredCols
          ]} onPress={this.handleToggleMediaModal.bind(this)}>
            <MaterialIcon
              name="camera-alt"
              style={[
                MediaStyles.mediaIcon,
                BaseStyles.fontSmall,
                BaseStyles.textWhite
              ]} />
        </TouchableHighlight>
      ))
    }

    return media
  }

  render() {
    return (
      <View style={[
        MediaStyles.mediaSelectionContainer,
        BaseStyles.col1
      ]}>
        <MediaTabbar
          ref="mediaTabbarModal"
          width={1080}
          height={1920}
          maxSelection={maxMediaSelection}
          handleMedia={this.handleMedia.bind(this)} />
        <View
          style={[
            MediaStyles.mediaSelectionGrid,
            BaseStyles.marginHorz,
            BaseStyles.row,
            BaseStyles.wrap,
            BaseStyles.justifiedCols
        ]}>
          {this.getSelectedMedia()}
        </View>
        <View style={[
          MediaStyles.mediaSelectionGrid,
          BaseStyles.marginHorz,
          BaseStyles.marginVert
        ]}>
          <View style={[
            MediaStyles.instructions,
            BaseStyles.row,
            BaseStyles.centeredCols
          ]}>
            <MaterialIcon
              name="edit"
              style={[
                MediaStyles.icon,
                BaseStyles.textLessMuted,
                BaseStyles.fontExtraSmall,
                BaseStyles.marginHorz
              ]} />
            <Text
              style={[
                MediaStyles.icon,
                BaseStyles.textLessMuted,
                BaseStyles.sansSerifRegular,
                BaseStyles.fontExtraSmall
              ]}>
                Add up to 9 photos/videos per post
            </Text>
          </View>
          <View style={[
            MediaStyles.instructions,
            BaseStyles.row,
            BaseStyles.centeredCols
          ]}>
            <MaterialIcon
              name="camera-alt"
              style={[
                MediaStyles.instructionsIcon,
                BaseStyles.textLessMuted,
                BaseStyles.fontExtraSmall,
                BaseStyles.marginHorz
              ]} />
            <Text style={[
              MediaStyles.instructionsText,
              BaseStyles.textLessMuted,
              BaseStyles.sansSerifRegular,
              BaseStyles.fontExtraSmall
            ]}>
              Tap a photo/video to manage your added photos/videos.
            </Text>
          </View>
        </View>
        <View style={[
          MediaStyles.continueBtn,
          BaseStyles.bottom
        ]}>
          <SaveBtn
            isSaveBtnDisabled={this.state.isContinueBtnDisabled}
            isUpdating={this.state.isUpdating}
            hasBeenSaved={this.state.hasBeenSaved}
            saveTerm="Continue"
            savingTerm="Updating..."
            savedTerm="Saved!"
            handlePress={this.handleContinuePress.bind(this)} />
        </View>
      </View>
    )
  }
}
