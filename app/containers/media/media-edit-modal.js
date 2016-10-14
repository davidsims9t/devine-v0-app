require("gl-react/react-native")

import React, {
  View,
  Component,
  Dimensions,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  AlertIOS,
  SliderIOS
} from 'react-native'
import Video from 'react-native-video'
import Parse from 'parse/react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import NavBar from '../navbar'
import NavBtn from '../buttons/nav-btn'

// Styles
import BaseStyles from '../../themes/default/base'
import MediaStyles from '../../themes/media'

import {
  drag,
  pinch,
  GestureView
} from 'react-native-gestures'

const {Surface} = require("gl-react-native")
const Filters = require('./filters')

const window = Dimensions.get('window')

const filterMaxValues = {
  contrast: 3,
  hue: 10,
  saturation: 3,
  brightness: 3,
  mixFactor: 2,
  sepia: 1,
  gray: 1
}

export default class MediaEditModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false,
      activeFilter: "hue",
      isCropping: false,
      viewportHeight: 550,
      width: null,
      height: null,
      left: null,
      top: null
    }
  }

  componentWillReceiveProps(props) {
    if (props.currentlySelected) {
      const scale = props.currentlySelected.height / props.currentlySelected.width

      let originalWidth = window.width
      let originalHeight = this.state.viewportHeight
      let originalTop = 0
      let originalLeft = 0

      if (scale < 1) {
        originalTop = (originalHeight - (originalWidth * scale)) / 2
        originalHeight = originalWidth * scale
      } else {
        originalLeft = (originalWidth - (originalHeight / scale)) / 2
        originalWidth = originalHeight / scale
      }

      this.setState({
        originalWidth,
        originalHeight,
        originalTop,
        originalLeft,
        isCropping: false,
        cropLeft: null,
        cropTop: null,
        cropWidth: null,
        cropHeight: null,
        width: null,
        height: null,
        left: null,
        top: null,
        viewportWidth: window.width,
        viewportHeight: 550,
        activeFilter: null,
        contrast: 1,
        saturation: 1,
        brightness: 1,
        hue: 0,
        sepia: 0,
        gray: 0,
        mixFactor: 0
      })
    }
  }

  componentWillUnmount() {
    this.setState({
      isVisible: false
    })
  }

  getPossibleOptions() {
    return [
      {icon: 'color-lens', isActive: this.state.activeFilter, isDisabled: this.state.isCropping, onPress: () => this.handleSetActiveFilter('hue')},
      {icon: 'brightness-6', isActive: this.state.activeFilter, isDisabled: this.state.isCropping, onPress: () => this.handleSetActiveFilter('brightness')},
      {icon: 'tonality', isActive: this.state.activeFilter, isDisabled: this.state.isCropping, onPress: () => this.handleSetActiveFilter('saturation')},
      {icon: 'adjust', isActive: this.state.activeFilter, isDisabled: this.state.isCropping, onPress: () => this.handleSetActiveFilter('contrast')},
      {icon: 'filter-b-and-w', isActive: this.state.activeFilter, isDisabled: this.state.isCropping, onPress: () => this.handleSetActiveFilter('gray')},
      {icon: 'filter-vintage', isActive: this.state.activeFilter, isDisabled: this.state.isCropping, onPress: () => this.handleSetActiveFilter('sepia')},
      {icon: 'crop', isActive: this.state.activeFilter, isDisabled: this.state.isCropping, onPress: this.handleToggleCrop.bind(this)}
    ]
  }

  handleToggleCrop() {
    const scale = this.props.width / this.props.height

    let cropWidth = window.width
    let cropHeight = this.state.viewportHeight
    let cropLeft = 0
    let cropTop = 0

    // landscape
    if (scale < 1) {
      cropTop = (cropHeight - (cropWidth * scale)) / 2
      cropHeight = cropWidth * scale
    } else {
      cropLeft = (cropWidth - (cropWidth / scale)) / 2
      cropWidth = cropHeight / scale
    }

    this.setState({
      cropWidth,
      cropHeight,
      cropLeft,
      cropTop,
      activeFilter: null,
      isCropping: !this.state.isCropping
    })
  }

  handleSetActiveFilter(activeFilter) {
    this.setState({
      activeFilter,
      isCropping: false
    })
  }

  getComponent() {
    const currentlySelected = this.props.currentlySelected

    let cropComponent
    if (currentlySelected && currentlySelected.uri) {
      let opacity = 1

      // if (this.state.isCropping) {
      //   opacity = 0.5
      //
      //   cropComponent = (
      //     <View style={{
      //       backgroundColor: 'transparent',
      //       position: 'absolute',
      //       left: this.state.cropLeft,
      //       top: this.state.cropTop,
      //       width: this.state.cropWidth,
      //       height: this.state.cropHeight,
      //       overflow: 'hidden',
      //       elevation: 1
      //     }}>
      //       <Image
      //         style={{
      //           position: 'absolute',
      //           left: this.state.cropLeft * -1,
      //           top: this.state.cropTop * -1,
      //           width: this.state.originalWidth,
      //           height: this.state.originalHeight
      //         }}
      //         resizeMode="cover"
      //         source={{ uri: currentlySelected.uri }} />
      //     </View>
      //   )
      // }

      let width = this.state.originalWidth
      if (this.state.width && !this.state.isCropping) {
        width = this.state.width
      }

      let height = this.state.originalHeight
      if (this.state.height && !this.state.isCropping) {
        height = this.state.height
      }

      let top = this.state.originalTop
      if (this.state.top && !this.state.isCropping) {
        top = this.state.top
      }

      let left = this.state.originalLeft
      if (this.state.left && !this.state.isCropping) {
        left = this.state.left
      }

      return (
        <View style={{
          width,
          height,
          marginTop: top,
          marginLeft: left
        }}>
          <Surface
            ref="surface"
            width={width}
            height={height}
            autoRedraw
            eventsThrough
            visibleContent>
              <Filters
                brightness={this.state.brightness}
                saturation={this.state.saturation}
                contrast={this.state.contrast}
                hue={this.state.hue}
                gray={this.state.gray}
                sepia={this.state.sepia}
                mixFactor={this.state.mixFactor}>
                  <Image
                    style={{
                      width,
                      height,
                      opacity
                    }}
                    resizeMode="cover"
                    source={{ uri: currentlySelected.uri }} />
              </Filters>
          </Surface>
        </View>
      )
    }
  }

  getOption(props) {
    let iconColor = BaseStyles.textWhite
    if (props.isDisabled) {
      iconColor = BaseStyles.textLessMuted
    }

    const icon = (
      <MaterialIcon
        name={props.icon}
        style={[
          MediaStyles.photoEditIcon,
          iconColor,
          BaseStyles.fontLarge
        ]} />
    )

    if (props.isDisabled) {
      <View>
        {icon}
      </View>
    } else {
      return (
        <TouchableOpacity onPress={props.onPress}>
          {icon}
        </TouchableOpacity>
      )
    }
  }

  getGestureView() {
    let currentlySelected = this.props.currentlySelected

    if (currentlySelected && currentlySelected.type == 'photo') {
      return (
        <GestureView
          gestures={[drag, pinch]}
          toStyle={(layout) => {
            let cropWidth = layout.width
            let cropHeight = layout.height
            let cropTop = layout.y
            let cropLeft = layout.x

            if (cropWidth > this.state.originalWidth) {
              cropWidth = this.state.originalWidth
            }

            if (cropHeight > this.state.originalHeight) {
              cropHeight = this.state.originalHeight
            }

            if (cropTop < this.state.originalTop) {
              cropTop = this.state.originalTop
            }

            const maximumBottom = this.state.originalHeight + this.state.originalTop
            const currentTop = cropTop + cropHeight

            if (currentTop > maximumBottom) {
              cropTop = maximumBottom - cropHeight
            }

            if (cropLeft < this.state.originalLeft) {
              cropLeft = this.state.originalLeft
            }

            const maximumRight = this.state.originalWidth + this.state.originalLeft
            const currentLeft = cropLeft + cropWidth

            if (currentLeft > maximumRight) {
              cropLeft = maximumRight - cropWidth
            }

            this.setState({cropLeft, cropTop, cropWidth, cropHeight})

            return {
              top: cropTop,
              left: cropLeft,
              width: cropWidth,
              height: cropHeight
            }
          }}
          onError={console.error.bind(console)}
          style={[
            MediaStyles.cropRect,
            {
              width: this.state.cropWidth,
              height: this.state.cropHeight,
              top: this.state.cropTop,
              left: this.state.cropLeft
            }
          ]}>
        </GestureView>
      )
    }
  }

  handleError(error) {
    AlertIOS.error(error)
  }

  handleUpdateFilter(value) {
    const activeFilter = this.state.activeFilter
    this.setState({
      [activeFilter]: value
    })
  }

  handleResetFilter(value) {
    const activeFilter = this.state.activeFilter
    this.setState({
      [activeFilter]: this.props.currentlySelected[activeFilter],
      activeFilter: null
    })
  }

  handleSetCropSize() {
    this.setState({
      width: this.state.cropWidth,
      height: this.state.cropHeight,
      top: this.state.cropTop,
      left: this.state.cropLeft,
      isCropping: false
    })
  }

  handleResetCropSize() {
    this.setState({
      width: this.props.originalWidth,
      height: this.state.originalHeight,
      left: this.state.originalLeft,
      top: this.state.originalTop,
      isCropping: false
    })
  }

  getEditOptions() {
    const activeFilter = this.state.activeFilter

    let controls
    if (activeFilter) {
      controls = (
        <View style={[
          MediaStyles.photoSaveControls
        ]}>
          <SliderIOS
            minimumValue={0}
            maximumValue={filterMaxValues[activeFilter]}
            onValueChange={this.handleUpdateFilter.bind(this)}
            value={this.state[activeFilter]} />
          <View style={[
            MediaStyles.photoSaveOptions,
            BaseStyles.row,
            BaseStyles.justifiedCols
          ]}>
            <TouchableOpacity onPress={this.handleResetFilter.bind(this)}>
              <MaterialIcon
                name="cancel"
                style={[
                  MediaStyles.resetBtn,
                  BaseStyles.textWhite,
                  BaseStyles.fontLarge
                ]} />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleSetActiveFilter.bind(this)}>
              <MaterialIcon
                name="save"
                style={[
                  MediaStyles.setFilterBtn,
                  BaseStyles.textWhite,
                  BaseStyles.fontLarge
                ]} />
            </TouchableOpacity>
          </View>
        </View>
      )
    } else if (this.state.isCropping) {
      controls = (
        <View style={[
          MediaStyles.adjustPhotoCropOptions,
          BaseStyles.row,
          BaseStyles.justifiedCols
        ]}>
          <TouchableOpacity onPress={this.handleSetCropSize.bind(this)}>
            <MaterialIcon
              name="save"
              style={[
                MediaStyles.photoCropSaveIcon,
                BaseStyles.textWhite,
                BaseStyles.fontLarge
              ]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleResetCropSize.bind(this)}>
            <MaterialIcon
              name="close"
              style={[
                MediaStyles.photoCropCancelIcon,
                BaseStyles.textWhite,
                BaseStyles.fontLarge
              ]} />
          </TouchableOpacity>
        </View>
      )
    }

    return (
      <View
        style={[
          MediaStyles.adjustPhotoControls,
          BaseStyles.darkBg,
          BaseStyles.paddingVert,
          BaseStyles.paddingHorz,
          BaseStyles.bottom
        ]}>
          {controls}
          <View style={[
            MediaStyles.adjustPhotoControlsOptions,
            BaseStyles.row,
            BaseStyles.justifiedCols
          ]}>
            {this.getPossibleOptions().map((props) => {
              return this.getOption(props)
            }, this)}
          </View>
      </View>
    )
  }

  handleToggleVisibility() {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  async handleSaveMedia() {
    if (this.state.isCropping) {
      this.handleSetCropSize()
    }

    const scale = this.props.width / this.state.width

    const width = this.state.width * scale
    const height = this.state.height * scale
    const top = (this.state.top - this.state.originalTop) * scale
    const left = (this.state.left - this.state.originalLeft) * scale

    this.setState({
      width,
      height,
      left,
      top
    })

    try {
      const base64 = await this.refs.surface.captureFrame()

      if (base64) {
        this.props.handleAddMedia({
          base64,
          width: this.props.width,
          height: this.props.height,
          type: "photo"
        })

        this.handleToggleVisibility()
      }
    } catch(error) {
      AlertIOS.alert("Failed to export image")
    }
  }

  render() {
    let gestureComponent
    if (this.state.isCropping) {
      gestureComponent = this.getGestureView()
    }

    return (
      <Modal
        animated={true}
        visible={this.state.isVisible}>
          <NavBar
            statusBarStyle='light-content'
            leftBtn={(
              <NavBtn
                icon='close'
                onPress={this.handleToggleVisibility.bind(this)} />
            )}
            rightBtn={(
              <NavBtn
                icon='save'
                onPress={this.handleSaveMedia.bind(this)} />
            )}
            title="Edit Media" />
          <View
            onLayout={(nativeEvent) => {
              // if (nativeEvent && nativeEvent.layout) {
              //   const viewportHeight = nativeEvent.layout.height - nativeEvent.layout.y
              //
              //   this.setState({viewportHeight})
              // }
            }}
            style={[
              BaseStyles.col1,
              MediaStyles.mediaEditModal
            ]}>
              {this.getComponent()}
              {gestureComponent}
          </View>
          {this.getEditOptions()}
      </Modal>
    )
  }
}
