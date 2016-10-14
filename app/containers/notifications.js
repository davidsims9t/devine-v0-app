import React, {
  View,
  TouchableHighlight,
  Text,
  Modal,
  AlertIOS,
  ListView,
  Component
} from 'react-native'
import TimeAgo from 'react-native-timeago'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { getNotifications, markUserNotificationAsSeen } from '../actions/notifications'

const mapStateToProps = state => ({
  notifications: state.notifications.notifications
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getNotifications, markUserNotificationAsSeen }, dispatch)
}

// Components
import LoadingView from '../components/loading'

// Styles
import BaseStyles from '../themes/default/base'
import NotificationStyles from '../themes/default/notifications'

/**
 * @type {Object}
 */
const classTypes = {
  "inspiration": "Inspiration",
  "idea": "Idea",
  "event": "Event"
}

/**
 * This class is responsible for displaying user notifications.
 */
class NotificationsModal extends Component {
  /**
   * Constructor for notifications modal.
   *
   * @param {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource,
      isModalVisible: false
    }
  }

  /**
   * Hide notifications on unmount.
   *
   * @return {void}
   */
  componentWillUnmount() {
    this.hideNotificationsModal()
  }

  /**
   * Load user notifications when modal is shown.
   *
   * @return {void}
   */
  showNotificationsModal() {
    const userId = this.props.user.objectId

    if (userId) {
      this.props.getNotifications(userId, true)
    }
  }

  /**
   * Mark user notifications as seen when modal is hidden.
   *
   * @return {void}
   */
  hideNotificationsModal() {
    const notifications = this.props.notifications

    if (notifications.length) {
      this.props.markUserNotificationAsSeen(notifications)
    }
  }

  /**
   * Render notification item row.
   *
   * @param {object} rowData - the notification record
   * @return {object}
   */
  renderRow(rowData) {
    const types = {
      "comment": {
        "onPress": this.props.actions.routes.comments(rowData),
        "icon": "comment"
      }
    }

    // "message": {
    //   "onPress": () => this.props.actions.routes.messageDetail(rowData),
    //   "icon": "message"
    // }

    const type = rowData.type

    if (!types[type]) {
      return
    }

    let photo
    if (!rowData.photo) {
      photo = (
        <View style={[
          BaseStyles.photoSmall,
          BaseStyles.mediumBg,
          BaseStyles.row,
          BaseStyles.verticalCenteredCols,
          BaseStyles.centeredCols
        ]}>
          <MaterialIcon
            name="user"
            style={[
              BaseStyles.fontSmall,
              BaseStyles.textLessMuted
            ]} />
        </View>
      )
    } else {
      photo = (
        <Image
          resizeMode="contain"
          style={BaseStyles.photoSmall}
          source={{uri: rowData.photo}} />
      )
    }

    return (
      <TouchableHighlight
        onPress={types[type].onPress}
        underlayColor="#efefef"
        style={[
          NotificationStyles.notificationPress,
          BaseStyles.col1
        ]}>
          <View style={[
            NotificationStyles.notificationItem,
            BaseStyles.paddingHorz,
            BaseStyles.paddingVert,
            BaseStyles.borderBottomLight,
            BaseStyles.row
          ]}>
            {photo}
            <View style={[
              NotificationStyles.notificationDetails,
              BaseStyles.col1,
              BaseStyles.marginLeft
            ]}>
              <View style={[
                NotificationStyles.userDetails,
                BaseStyles.row,
                BaseStyles.justifiedCols,
                BaseStyles.marginBottom
              ]}>
                <FontAwesome
                  name={types[type].icon}
                  style={[
                    NotificationStyles.fontIcon,
                    BaseStyles.textDark,
                    BaseStyles.fontExtraSmall
                  ]} />
                <Text style={[
                  NotificationStyles.notificationDate,
                  BaseStyles.sansSerifLight,
                  BaseStyles.textMuted,
                  BaseStyles.fontExtraSmall
                ]}>
                  <TimeAgo time={rowData.createdAt} />
                </Text>
              </View>
              <Text style={[
                NotificationStyles.excerpt,
                BaseStyles.sansSerifRegular,
                BaseStyles.textDark,
                BaseStyles.fontSmall
              ]}>
                {rowData.excerpt}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
    )
  }

  /**
   * Render notification list component.
   *
   * @return {object} component
   */
  render() {
    if (this.props.isLoading) {
      return (<LoadingView />)
    }

    return (
      <Modal
        visible={this.state.isModalVisible}
        transparent={true}
        animated={true}>
          <ListView
            style={[
              NotificationStyles.feedList,
              BaseStyles.col1
            ]}
            dataSource={this.state.dataSource.cloneWithRows(this.props.notifications)}
            renderRow={this.renderRow.bind(this)}
            automaticallyAdjustContentInsets={false} />
      </Modal>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsModal)
