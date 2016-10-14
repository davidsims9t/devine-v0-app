import React, {
  Component,
  View,
  Text,
  TabBarIOS,
  Modal,
  NativeModules,
  AlertIOS
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import BaseStyles from '../../themes/default/base'
import TabStyles from '../../themes/tabs'

import SaveMedia from '../../utils/save-media'
import NavBar from '../navbar'
import NavBtn from '../buttons/nav-btn'
import CameraRoll from './camera-roll'
import CaptureMedia from './capture-media'

/**
 * This class is responsible for.
 */
export default class MediaTabbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
      selectedTab: !props.selectedTab ? 'cameraRoll' : props.selectedTab,
      selectedMedia: [],
      currentlySelected: null
    }
  }

  componentWillUnmount() {
    this.setState({
      isVisible: false
    })
  }

  handleSelectMedia(media) {
    let selectedMedia = this.state.selectedMedia
    const maxSelection = this.props.maxSelection || 1

    if (maxSelection == selectedMedia.length) {
      selectedMedia.shift()
    }

    if (selectedMedia.indexOf(media) == -1) {
      selectedMedia.push(media)
      this.setState({currentlySelected: media})
    } else {
      selectedMedia.splice(selectedMedia.indexOf(media), 1)
    }

    this.setState({selectedMedia})
  }

  handleOpenModal() {
    this.setState({
      isVisible: true
    })
  }

  handleCloseModal() {
    if (this.props.handleMedia) {
      const selectedMedia = this.state.selectedMedia

      if (selectedMedia.length) {
        selectedMedia.map((media) => {
          SaveMedia.createFile(media.uri, media.type, this.props.width, this.props.height, (result) => {
            this.props.handleMedia(result)
          })
        })
      }
    }

    this.setState({
      isVisible: false
    })
  }

  handleAddMedia(media) {
    this.refs.cameraRoll.handleAddMedia(media)
  }

  render() {
    const props = {
      selectedMedia: this.state.selectedMedia,
      currentlySelected: this.state.currentlySelected,
      width: this.props.width,
      height: this.props.height,
      handleSelectMedia: this.handleSelectMedia.bind(this)
    }

    return (
      <Modal
        visible={this.state.isVisible}
        animated={true}>
          <NavBar
            statusBarStyle='light-content'
            leftBtn={(
              <NavBtn
                icon='close'
                onPress={this.handleCloseModal.bind(this)} />
            )}
            title="Add Media" />
          <TabBarIOS
            barTintColor="black"
            translucent={false}
            tintColor="white">
              <MaterialIcon.TabBarItem
                title=""
                iconName="camera-roll"
                selected={this.state.selectedTab === 'cameraRoll'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'cameraRoll'
                  })
                }}>
                  <CameraRoll
                    ref="cameraRoll"
                    {...props} />
              </MaterialIcon.TabBarItem>
              <MaterialIcon.TabBarItem
                title=""
                iconName="camera-alt"
                selected={this.state.selectedTab === 'capturePhoto'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'capturePhoto'
                  })
                }}>
                  <CaptureMedia
                    captureMode="capturePhoto"
                    handleAddMedia={this.handleAddMedia.bind(this)}
                    {...props} />
              </MaterialIcon.TabBarItem>
              <MaterialIcon.TabBarItem
                title=""
                iconName="videocam"
                selected={this.state.selectedTab === 'captureVideo'}
                onPress={() => {
                  this.setState({
                    selectedTab: 'captureVideo'
                  })
                }}>
                  <CaptureMedia
                    captureMode="captureVideo"
                    handleAddMedia={this.handleAddMedia.bind(this)}
                    {...props} />
              </MaterialIcon.TabBarItem>
          </TabBarIOS>
      </Modal>
    )
  }
}
