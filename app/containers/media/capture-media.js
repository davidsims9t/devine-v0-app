import React, {
  Text,
  View,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  Component,
  AlertIOS
} from 'react-native'
import Camera from 'react-native-camera'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import BaseStyles from '../../themes/default/base'
import MediaStyles from '../../themes/default/media'

const window = require('Dimensions').get('window')

export default class CaptureMedia extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRecording: false,
      barPosition: new Animated.Value(0),
      currentDuration: 0,
      minDuration: 5000,
      maxDuration: 30000,
      limitReached: false,
      flashMode: Camera.constants.FlashMode.off,
      deviceMode: Camera.constants.Type.back
    }
  }

  handleStartBarAnimation() {
    this.animRunning = true
    this.animBar = Animated.timing(
      this.state.barPosition,
      {
        toValue: window.width,
        duration: this.state.maxDuration - this.state.currentDuration
      }
    )

    this.animBar.start()
  }

  handleResetBarAnimation() {
    Animated.spring(this.state.barPosition, {toValue: 0}).start()
  }

  handleStopBarAnimation() {
    this.animRunning = false
    if (this.animBar) {
      this.animBar.stop()
    }
  }

  handlePhoto() {
    this.refs.recorder.capture((error, data) => {
      if (!error && data) {
        this.props.handleAddMedia(data)
        this.props.handleSelectMedia(data)
      } else {
        AlertIOS.alert(error)
      }
    })
  }

  handleRecord() {
    if (this.state.limitReached) {
      return
    }

    this.refs.recorder.capture((error, data) => {
      this.handleStartBarAnimation()
      this.setState({isRecording: true})
    })
  }

  handlePause() {
    if (!this.state.isRecording) {
      return
    }

    this.refs.recorder.stopCapture()
    this.handleStopBarAnimation()
    this.setState({
      isRecording: false,
      limitReached: true,
      currentDuration: 0
    })
  }

  getRenderBar() {
    return (
      <View style={[
        MediaStyles.recordBarWrapper,
        BaseStyles.transparentBg
      ]}>
        <Animated.View
          style={[
            MediaStyles.barGauge,
            {width: this.state.barPosition}
          ]} />
      </View>
    )
  }

  getRecordBtn() {
    if (!this.state.limitReached) {
      return (
        <TouchableOpacity
          onPressIn={this.handleRecord.bind(this)}
          onPressOut={this.handlePause.bind(this)}
          style={[
            MediaStyles.controlBtn
          ]}>
          <View style={[
            MediaStyles.innerControlBtn
          ]} />
        </TouchableOpacity>
      )
    } else {
      return (
        <View
          style={[
            MediaStyles.controlBtn
          ]}>
          <View style={[
            MediaStyles.innerControlBtn,
            BaseStyles.mediumBg
          ]} />
        </View>
      )
    }
  }

  getPhotoBtn() {
    return (
      <TouchableOpacity
        onPress={this.handlePhoto.bind(this)}
        style={[
          MediaStyles.controlBtn
        ]}>
        <View style={[
          MediaStyles.innerControlBtn
        ]} />
      </TouchableOpacity>
    )
  }

  getControlBtn() {
    return this.props.captureMode != "captureVideo" ?
      this.getPhotoBtn() :
      this.getRecordBtn()
  }

  getCaptureMode() {
    return this.props.captureMode != "captureVideo" ?
      Camera.constants.CaptureMode.still :
      Camera.constants.CaptureMode.video
  }

  handleToggleFlashMode() {
    const flashMode = this.state.flashMode == Camera.constants.FlashMode.on ?
      Camera.constants.FlashMode.off :
      Camera.constants.FlashMode.on

    this.setState({flashMode})
  }

  handleToggleDeviceMode() {
    const deviceMode = this.state.deviceMode == Camera.constants.Type.back ?
      Camera.constants.Type.front :
      Camera.constants.Type.back

    this.setState({deviceMode})
  }

  getFlashBtn() {
    const flashModeIcon = this.state.flashMode == Camera.constants.FlashMode.on ? 'flash-off' : 'flash-on'

    return (
      <TouchableHighlight onPress={this.handleToggleFlashMode.bind(this)}>
        <MaterialIcon
          name={flashModeIcon}
          style={[
            MediaStyles.flashMode,
            BaseStyles.textWhite,
            BaseStyles.fontLarge
          ]} />
      </TouchableHighlight>
    )
  }

  getDeviceModeBtn() {
    const deviceModeIcon = this.state.deviceMode == Camera.constants.Type.back ? 'camera-front' : 'camera-rear'

    return (
      <TouchableHighlight onPress={this.handleToggleDeviceMode.bind(this)}>
        <MaterialIcon
          name={deviceModeIcon}
          style={[
            MediaStyles.deviceMode,
            BaseStyles.textWhite,
            BaseStyles.fontLarge
          ]} />
      </TouchableHighlight>
    )
  }

  render() {
    return (
      <Camera
        ref="recorder"
        captureMode={this.getCaptureMode()}
        type={this.state.deviceMode}
        flashMode={this.state.flashMode}
        style={[
          MediaStyles.recordingContainer,
          BaseStyles.col1
        ]}>
          {this.getRenderBar()}
          <View style={[
            MediaStyles.captureBtnContainer,
            BaseStyles.transparentBg,
            BaseStyles.row,
            BaseStyles.justifiedCols,
            BaseStyles.verticalCenteredCols
          ]}>
            {this.getDeviceModeBtn()}
            {this.getControlBtn()}
            {this.getFlashBtn()}
          </View>
      </Camera>
    )
  }
}
