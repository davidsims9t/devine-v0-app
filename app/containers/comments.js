import React, {
  View,
  ListView,
  Text,
  Component,
  AlertIOS
} from 'react-native'
import Sound from 'react-native-simple-sound'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getRelationalData } from '../actions/feed'
import { subscribe, unsubscribe } from '../actions/subscriptions'

const mapStateToProps = state => ({
  comments: state.feed.relationData
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getRelationalData }, dispatch)
}

import LoadingView from '../components/loading'
import Comment from '../components/comments/comment'
import CommentReply from '../components/comments/reply'

import BaseStyles from '../themes/default/base'
import CommentStyles from '../themes/default/feed'

class CommentsMaster extends Component {
  /**
   * Constructor for comments list
   *
   * @param object props
   * @return void
   */
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource
    }
  }

  /**
   * Query the comments for a given feed item
   *
   * @return void
   */
  componentDidMount() {
    if (this.props.routerData.rowData) {
      this.props.getRelationalData(
        this.props.routerData.rowData,
        "Comments",
        "comments",
        {isDeleted: false}
      )
    }
  }

  /**
   * Unsubscribe to comment thread
   *
   * @return void
   */
  componentWillUnmount() {
    if (this.props.route.rowData) {
      this.props.onUnsubscribe(this.props.route.rowData.objectId)
    }
  }

  /**
   * Push new comments onto the feed when received from Pusher
   *
   * @return void
   */
  // componentWillReceiveProps() {
  //   const messageProps = this.props.messages
  //
  //   if (messageProps.event == 'comment:add' && messageProps.data && JSON.parse(messageProps.data)) {
  //     if (data.user.objectId != this.props.user.objectId) {
  //       let messages = this.state.messages
  //       const data = JSON.parse(messageProps.data)
  //       messages.push(data)
  //
  //       Sound.enable(true)
  //       Sound.play('sounds-1055-your-turn.aac')
  //
  //       this.setState({messages})
  //     }
  //   }
  // }

  /**
   * Render comment
   *
   * @param object rowData
   * @return void
   */
  renderRow(rowData) {
    return (<Comment rowData={rowData} />)
  }

  /**
   * Comment reply box
   *
   * @return object
   */
  getReply() {
    if (this.props.user && this.props.route.rowData) {
      return (
        <CommentReply
          rowData={this.props.route.rowData}
          user={this.props.user} />
      )
    }
  }

  /**
   * Indicator to show that no comments have been made yet.
   *
   * @return {object} component
   */
  getNoCommentsAlert() {
    return (
      <View style={[
        CommentStyles.noCommentsAvailable,
        BaseStyles.col1,
        BaseStyles.row,
        BaseStyles.centeredCols,
        BaseStyles.verticalCenteredCols
      ]}>
        <Text style={[
          CommentStyles.noCommentsAvailableText,
          BaseStyles.textMuted,
          BaseStyles.sansSerifRegular,
          BaseStyles.fontMedium,
          BaseStyles.paddingHorz
        ]}>
          No comments have been made yet...
        </Text>
      </View>
    )
  }

  /**
   * Renders comment list.
   *
   * @return {object} component
   */
  render() {
    if (!this.props.isLoading) {
      return (<LoadingView />)
    }

    if (!this.props.comments) {
      return this.getNoCommentsAlert()
    }

    return (
      <View style={[
        CommentStyles.commentContainer,
        BaseStyles.col1
      ]}>
        <ListView
          dataSource={this.state.dataSource.cloneWithRows(this.props.comments)}
          renderRow={this.renderRow.bind(this)}
          style={[
            CommentStyles.commentsList,
            BaseStyles.col1,
            BaseStyles.whiteBg,
            BaseStyles.replyMargin
          ]}
          automaticallyAdjustContentInsets={false} />
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsMaster)
