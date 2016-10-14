import React, {
  Text,
  View,
  ListView,
  Component,
  AlertIOS,
  Image
} from 'react-native'
import TimeAgo from 'react-native-timeago'
import _ from 'lodash'
import InvertibleScrollView from 'react-native-invertible-scroll-view'
import Sound from 'react-native-simple-sound'
import Video from 'react-native-video'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { getMessages } from '../../actions/messages'
import { subscribe, unsubscribe } from '../../actions/subscriptions'

// Components
import LoadingView from '../../components/loading'
import ContactInfo from '../../components/contact-info'
import Reply from '../../components/comments/reply'
import UserPhoto from '../../components/user-photo'
import { getType } from '../../utils/media'

// Styles
import BaseStyles from '../../themes/default/base'
import MessageStyles from '../../themes/default/message'

const mapStateToProps = state => ({
  messages: state.messages.messages,
  subscriptions: state.subscriptions.messages,
  isLoading: state.messages.isLoading || state.subscriptions.isLoading
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getMessages, subscribe, unsubscribe }, dispatch)
}

/**
 * This class is responsible for the message detail view.
 */
class MessagesDetail extends Component {
  /**
   * isContactActive is set to true/false when the userActive flag is sent by Pusher.
   * isContactWriting is sent when a user begins typing a messaging.
   *
   * @param {object} props - inherited props
   * @return {void}
   */
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource,
      isContactActive: false,
      isContactWriting: false
    }
  }

  /**
   * Handles the loading of messages.
   *
   * @return {void}
   */
  componentDidMount() {
    // this.onSubscribe()
  }

  /**
   * Unsubscribe from messages on component unmount.
   *
   * @return {void}
   */
  componentWillUnmount() {
    // this.onUnsubscribe()
  }

  /**
   * Subscribe to messages on component mount.
   *
   * @return {void}
   */
  onSubscribe() {
    const { boutique, user, routerData } = this.props
    const channel = `presence_${user.objectId}-${boutique.objectId}`

    if (channel) {
      this.props.subscribe(channel, null, user.objectId)
    } else {
      AlertIOS.alert("Failed to retrieve contact details.")
    }
  }

  /**
   * Unsubscribe from messages.
   *
   * @return {void}
   */
  onUnsubscribe() {
    const { boutique, user, routerData } = this.props
    const channel = `presence_${user.objectId}-${boutique.objectId}`

    if (channel) {
      this.props.unsubscribe(channel, null, user.objectId)
    } else {
      AlertIOS.alert("Failed to retrieve contact details.")
    }
  }

  /**
   * Set contact as active or inactive
   *
   * @param {object} data - from Pusher
   * @return {void}
   */
  onToggleContactActive(data) {
    // const props = this.props
    // const contact = props.route.contact.user
    //
    // if (data.userId && props.route && contact && contact.objectId == data.userId) {
    //   this.setState({
    //     isContactActive: !this.state.isContactActive
    //   })
    // }
  }

  /**
   *
   *
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  onMessageAdded(data) {
    if (data.fromUser.objectId != this.props.user.objectId) {
      Sound.enable(true)
      Sound.play('sounds-1055-your-turn.aac')

      let messages = this.state.messages
      messages.push(data)

      this.setState({
        messages,
        isContactWriting: false
      })
    }
  }

  /**
   * Display contact component.
   *
   * @return {object} component
   */
  getContactInfo() {
    const { routerData, user } = this.props

    const boutique = routerData.boutique
    const contact = routerData.contact
    const isContactActive = this.state.isContactActive

    return (
      <ContactInfo
        isContactActive={isContactActive}
        contact={contact}
        user={user}
        boutique={boutique} />
    )
  }

  /**
   * Renders the message reply text box.
   *
   * @return {object}
   */
  getReply() {
    const { user, routerData } = this.props
    const { contact, boutique } = routerData

    if (user && boutique && (contact || userIds)) {
      return (
        <Reply
          isContactActive={this.state.isContactActive}
          isContactWriting={this.state.isContactWriting}
          user={user}
          contact={contact}
          boutique={boutique} />
      )
    }
  }

  /**
   * Returns message content.
   *
   * @param {object} rowData - message row content
   * @param {bool} isFromCurrentUser - format the content depending on if the message is from the current user or not
   * @return {object} component
   */
  getContent(rowData, isFromCurrentUser) {
    let msgContainerStyle = [BaseStyles.mediumBg, BaseStyles.marginLeft]
    let msgStyle = BaseStyles.textLessMuted
    let user = rowData.toUser
    if (isFromCurrentUser) {
      msgContainerStyle = [MessageStyles.blueBg, BaseStyles.marginRight]
      msgStyle = BaseStyles.textWhite
      user = rowData.fromUser
    }

    let message

    if (rowData.message) {
      message = rowData.message
    }

    if (rowData.media && rowData.media.source._url) {
      const mediaType = getType(rowData.media.source._url)

      if (mediaType == 'photo') {
        message = (
          <Image
            source={{ uri: rowData.media.source._url }}
            resizeContent="contain"
            style={[
              MessageStyles.media
            ]} />
        )
      } else if (mediaType == 'video') {
        message = (
          <Video
            style={[
              MessageStyles.media
            ]}
            muted={true}
            pause={true}
            source={{ uri: rowData.media.source._url }} />
        )
      } else {
        AlertIOS.alert("Failed to add file. Unknown file type.")
      }
    }

    return (
      <View style={[
        MessageStyles.contentContainer,
        BaseStyles.paddingVert,
        BaseStyles.paddingHorz,
        BaseStyles.col1,
        msgContainerStyle
      ]}>
        <Text style={[
          MessageStyles.content,
          msgStyle
        ]}>
          {message}
        </Text>
      </View>
    )
  }

  /**
   * Render message content.
   *
   * @param {object} rowData - message data
   * @return {object}
   */
  renderRow(rowData) {
    let displayOrder = []

    if (rowData) {
      const userId = this.props.user.objectId
      const { toUser, fromUser } = rowData

      if (_.some(fromUser, {objectId: userId})) {
        displayOrder.push(this.getContent(rowData, true))
        displayOrder.push((
          <UserPhoto user={fromUser} photoSize="small" />
        ))
      } else {
        displayOrder.push((
          <UserPhoto user={toUser} photoSize="small" />
        ))
        displayOrder.push(this.getContent(rowData, false))
      }
    }

    return (
      <View style={[
        MessageStyles.messageRow,
        BaseStyles.paddingVert,
        BaseStyles.paddingHorz,
        BaseStyles.row
      ]}>
        {displayOrder}
      </View>
    )
  }

  /**
   * Return data from Parse and Pusher.
   *
   * @return {array} dataSource
   */
  getDataSource() {
    let dataSource = []

    if (this.props.messages) {
      this.props.messages.map(message => {
        dataSource.push(message)
      })
    }

    return dataSource
  }

  /**
   * Render message thread list component.
   *
   * @return {object} component
   */
  render() {
    if (this.props.isLoading) {
      return (<LoadingView />)
    }

    const dataSource = this.state.dataSource.cloneWithRows(this.getDataSource())

    return (
      <View style={[
        MessageStyles.detailContainer,
        BaseStyles.col1
      ]}>
        {this.getContactInfo()}
        <ListView
          renderScrollComponent={props => <InvertibleScrollView {...props} inverted />}
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false}
          style={[
            MessageStyles.messageDetailList,
            BaseStyles.col1,
            BaseStyles.lightBg,
            BaseStyles.replyMargin
          ]} />
        {this.getReply()}
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesDetail)
