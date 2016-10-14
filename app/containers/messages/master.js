import React, {
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  Component
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { getCurrentUser } from '../../actions/user'
import { getConversations } from '../../actions/messages'

// Components
import MessageRow from '../../components/messages/row'
import LoadingView from '../../components/loading'

// Styles
import BaseStyles from '../../themes/default/base'
import MessageStyles from '../../themes/default/message'

const mapStateToProps = state => ({
  conversations: state.messages.conversations,
  isLoading: state.messages.isLoading,
  user: state.user.currentUser
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getConversations, getCurrentUser }, dispatch)
}

/**
 * @type {Number} messageLimitPerPage - The number of messages to show per page.
 */
const messageLimitPerPage = 10

/**
 * This class is responsible for the message master view.
 */
class MessagesMaster extends Component {
  /**
   * Message master scene.
   *
   * @param {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource,
      hasScrolled: false,
      offset: 0
    }
  }

  /**
   * If the user is not logged in, then redirect to login screen.
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.getCurrentUser()
  }

  /**
   * Load more messages if we've reached the bottom of the list.
   *
   * @return {void}
   */
  onEndReached() {
    // if (this.state.hasScrolled && this.data.conversations.length == messageLimitPerPage) {
    //   const dataSource = this.state.dataSource.cloneWithRows(this.data.conversations)
    //
    //   this.setState({
    //     dataSource
    //   })
    // }
  }

  /**
   * Renders the message row component.
   *
   * @return {object}
   */
  renderRow() {
    return (<MessageRow />)
  }

  /**
   * Indicator to show that no messages have been sent or received yet.
   *
   * @return object
   */
  getNoMessagesAlert() {
    return (
      <View style={[
        MessageStyles.noCommentsAvailable,
        BaseStyles.col1,
        BaseStyles.row,
        BaseStyles.centeredCols,
        BaseStyles.verticalCenteredCols
      ]}>
        <Text style={[
          MessageStyles.noCommentsAvailableText,
          BaseStyles.textMuted,
          BaseStyles.sansSerifRegular,
          BaseStyles.fontMedium,
          BaseStyles.paddingHorz
        ]}>
          You have no messages in your inbox...
        </Text>
      </View>
    )
  }

  /**
   * Render message master list.
   *
   * @return {object}
   */
  render() {
    if (this.props.isLoading) {
      return (<LoadingView />)
    }

    if (!this.props.conversations || !this.props.conversations.length) {
      return this.getNoMessagesAlert()
    }

    return (
      <ListView
        dataSource={this.state.dataSource.cloneWithRows(this.props.conversations)}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={5}
        automaticallyAdjustContentInsets={false}
        style={[
          MessageStyles.messageLists,
          BaseStyles.whiteBg
        ]} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MessagesMaster)
