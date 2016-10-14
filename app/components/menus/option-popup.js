import React, {
  View,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  Component,
  Modal
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Zocial from 'react-native-vector-icons/Zocial'

import BaseStyles from '../../themes/default/base'

export default class OptionPopup extends Component {
  /**
   * Pop-up constructor
   *
   * @param object props
   * @return void
   */
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  /**
   * Hides the modal on component unmount
   *
   * @return void
   */
  componentWillUnmount() {
    this.setState({
      isVisible: false
    })
  }

  /**
   * Return option row
   *
   * @param object props
   * @return object
   */
  getOptionRow(props) {
    let icon
    if (props.icon != "facebook" && props.icon != "twitter") {
      icon = (
        <MaterialIcon
          name={props.icon}
          style={[
            fontColor,
            BaseStyles.fontSmall
          ]} />
      )
    } else {
      icon = (
        <Zocial
          name={props.icon}
          style={[
            fontColor,
            BaseStyles.fontSmall
          ]} />
      )
    }

    let fontColor = BaseStyles.textLessMuted
    if (props.isDisabled) {
      fontColor = BaseStyles.textMuted
    }

    const component = (
      <View style={[
        BaseStyles.row,
        BaseStyles.verticalCenteredCols
      ]}>
        <View style={[
          BaseStyles.icon
        ]}>
          {icon}
        </View>
        <Text style={[
          fontColor,
          BaseStyles.fontSmall,
          BaseStyles.sansSerifRegular,
          BaseStyles.marginHorz
        ]}>
          {props.text}
        </Text>
      </View>
    )

    if (!props.isDisabled) {
      return (
        <TouchableHighlight
          onPress={() => props.onPress(props)}
          underlayColor="#ccc"
          style={[
            BaseStyles.paddingHorz,
            BaseStyles.paddingVert,
            BaseStyles.borderBottomLight
          ]}>
            {component}
        </TouchableHighlight>
      )
    } else {
      return (
        <View style={[
          BaseStyles.paddingHorz,
          BaseStyles.paddingVert,
          BaseStyles.borderBottomLight
        ]}>
          {component}
        </View>
      )
    }
  }

  /**
   * Toggle modal visibility
   *
   * @return void
   */
  handleSetVisible() {
    this.setState({isVisible: !this.state.isVisible})
  }

  /**
   * Get option pop-up heading
   *
   * @return object
   */
  getHeading() {
    const heading = this.props.options.heading

    return (
      <View style={[
        BaseStyles.lightBg,
        BaseStyles.paddingHorz,
        BaseStyles.paddingVert,
        BaseStyles.row,
        BaseStyles.verticalCenteredCols,
        BaseStyles.justifiedCols
      ]}>
        <Text style={[
          BaseStyles.sansSerifBold,
          BaseStyles.textDark,
          BaseStyles.fontSmall
        ]}>
          {heading}
        </Text>
        <TouchableOpacity onPress={this.handleSetVisible.bind(this)}>
          <MaterialIcon
            name="close"
            style={[
              BaseStyles.textLessMuted,
              BaseStyles.fontSmall,
              BaseStyles.textRight
            ]} />
        </TouchableOpacity>
      </View>
    )
  }

  /**
   * Render option pop-up modal
   *
   * @return object
   */
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.state.isVisible}>
          <View style={[
            BaseStyles.translucentOverlay,
            BaseStyles.row,
            BaseStyles.verticalCenteredCols
          ]}>
            <View style={[
              BaseStyles.marginHorz,
              BaseStyles.whiteBg,
              BaseStyles.col1
            ]}>
              {this.getHeading()}
              {this.props.options.list.map((props) => {
                return this.getOptionRow(props)
              }, this)}
            </View>
          </View>
      </Modal>
    )
  }
}
