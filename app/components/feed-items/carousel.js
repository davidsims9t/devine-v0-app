import React, {
  View,
  Image,
  Text,
  Component,
  AlertIOS,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal
} from 'react-native'
import Carousel from 'react-native-looped-carousel'
import Video from 'react-native-video'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getType } from '../../utils/media'
import { updateStats, getRelationalData } from '../../actions/feed'

import BaseStyles from '../../themes/default/base'
import FeedStyles from '../../themes/default/feed'

const mapStateToProps = state => ({
  media: state.feed.relationData
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getRelationalData }, dispatch)
}

/**
 * This class is responsible for rendering the feed carousel and modal.
 */
export default class FeedCarousel extends Component {
  /**
   * @param props inherited props
   * @return void
   */
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  /**
   * Fetches the media assets.
   *
   * @return void
   */
  componentDidMount() {
    this.props.getRelationalData(this.props.rowData, "Media", "media")
  }

  /**
   * Increment carousel views count.
   *
   * @return void
   */
  onAddCarouselView() {
    this.props.updateStats({
      rowData: this.props.rowData,
      colName: "carouselViews",
      user: this.props.user
    })
  }

  /**
   * Toggles the carousel light box
   *
   * @return void
   */
  onToggleLightbox() {
    if (!this.state.isVisible) {
      this.onAddCarouselView()
    }

    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  /**
   * Renders the carousel for the lightbox modal
   *
   * @return object
   */
  getModalCarousel() {
    const media = this.props.media.map((media) => {
      const mediaType = getType(media.source.url)

      if (mediaType == "photo") {
        return (
          <View style={[
            FeedStyles.carouselItem,
            BaseStyles.col1
          ]}>
            <Image
              source={{uri: media.source.url}}
              resizeContent="contain"
              style={[
                FeedStyles.carouselItem
              ]} />
          </View>
        )
      } else if (mediaType == "video") {
        return (
          <View style={[
            FeedStyles.carouselItem,
            BaseStyles.col1
          ]}>
            <Video
              source={{uri: media.source.url}}
              style={[
                FeedStyles.carouselItem
              ]} />
          </View>
        )
      }
    })

    return (
      <View style={[
        BaseStyles.col1,
        BaseStyles.translucentOverlay
      ]}>
        <TouchableOpacity
          style={[
            FeedStyles.lightBoxClosePress
          ]}
          onPress={this.onToggleLightbox.bind(this)}>
            <MaterialIcon
              name="close"
              style={[
                FeedStyles.lightBoxCloseIcon,
                BaseStyles.textWhite,
                BaseStyles.fontMedium
              ]} />
        </TouchableOpacity>
        <Carousel
          style={[
            FeedStyles.carousel
          ]}>
            {media}
        </Carousel>
      </View>
    )
  }

  /**
   * Render the media in each carousel view
   *
   * @return object
   */
  getMedia() {
    return this.props.media.map((media) => {
      const mediaType = getType(media.source.url)

      if (mediaType == "photo") {
        return (
          <TouchableWithoutFeedback
            onPress={this.onToggleLightbox.bind(this)}>
              <View style={[
                FeedStyles.carouselItem,
                BaseStyles.blackBg,
                BaseStyles.col1,
                BaseStyles.verticalCenteredCols,
                BaseStyles.centeredCols
              ]}>
                <Image
                  source={{uri: media.source.url}}
                  resizeContent="contain"
                  style={[
                    FeedStyles.carouselItemThumbnail
                  ]} />
              </View>
          </TouchableWithoutFeedback>
        )
      } else {
        return (
          <TouchableWithoutFeedback
            onPress={this.onToggleLightbox.bind(this)}>
              <View style={[
                FeedStyles.carouselItem,
                BaseStyles.blackBg,
                BaseStyles.col1,
                BaseStyles.verticalCenteredCols,
                BaseStyles.centeredCols
              ]}>
                <Video
                  source={{uri: media.source.url}}
                  paused={true}
                  resizeMode="contain"
                  style={[
                    FeedStyles.carouselItemThumbnail
                  ]} />
              </View>
          </TouchableWithoutFeedback>
        )
      }
    })
  }

  /**
   * Render the carousel or a placeholder if we don't have an media
   *
   * @return component
   */
  render() {
    if (this.props.media && this.props.media.length) {
      return (
        <View style={[
          FeedStyles.carouselContainer
        ]}>
          <Modal
            transparent={true}
            visible={this.state.isVisible}>
              {this.getModalCarousel()}
          </Modal>
          <Carousel
            onAnimateNextPage={this.onAddCarouselView.bind(this)}
            style={[
              FeedStyles.carouselThumbnail,
              BaseStyles.col1,
              BaseStyles.marginBottom
            ]}>
              {this.getMedia()}
          </Carousel>
        </View>
      )
    } else {
      return (
        <View style={[
          FeedStyles.carouselThumbnail,
          BaseStyles.mediumBg,
          BaseStyles.col1,
          BaseStyles.verticalCenteredCols,
          BaseStyles.centeredCols,
          BaseStyles.marginBottom
        ]}>
          <MaterialIcon
            name="photo-camera"
            style={[
              FeedStyles.carouselPlaceholderIcon,
              BaseStyles.textLessMuted,
              BaseStyles.fontExtraLarge
            ]} />
        </View>
      )
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FeedCarousel)
