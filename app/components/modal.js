import React, {
  View,
  Text,
  Component,
  StatusBarIOS,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import BaseStyles from '../themes/default/base'
import NavBarStyles from '../themes/default/navbar'

export default class ModalWithNavBar extends Component {
  /**
   * Modal must be hidden by default.
   *
   * @param  {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  /**
   * Navbar style
   *
   * @param string title
   * @return object
   */
  getTitle(title) {
    return (
      <Text style={[
        NavBarStyles.navTitle,
        BaseStyles.fontMedium,
        BaseStyles.textWhite
      ]}>
        {this.props.title}
      </Text>
    )
  }

  /**
   * Get nav button
   *
   * @param {string} button
   * @return {object}
   */
  getButton(button) {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={[NavBarStyles.navBarBtn]}>
          <MaterialIcon
            name='close'
            style={[
              BaseStyles.fontMedium,
              BaseStyles.textWhite
            ]} />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  /**
   *
   *
   * @return {[type]} [description]
   */
  toggleVisibility() {
    this.setState({
      isVisible: !this.state.isVisible
    })
  }

  /**
   * Renders the modal component with navbar.
   *
   * @return {object} component
   */
  render() {
    StatusBarIOS.setStyle(this.props.statusBarStyle ? 'light-content' : 'default')

    return (
      <Modal
        visible={this.state.isVisible}
        animated={true}>
          <View style={[
            NavBarStyles.navBarContainer,
            BaseStyles.row,
            BaseStyles.justifiedCols,
            BaseStyles.verticalCenteredCols,
            BaseStyles.marginHorz,
          ]}>
            {this.getButton('leftBtn')}
            {this.getTitle()}
            {this.getButton('rightBtn')}
          </View>
      </Modal>
    )
  }
}
