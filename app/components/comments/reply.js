import React, {
  View,
  TouchableWithoutFeedback,
  DeviceEventEmitter,
  TextInput,
  Text,
  Component,
  AlertIOS
} from 'react-native'
import Sound from 'react-native-simple-sound'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Styles
import BaseStyles from '../../themes/default/base'
import CommentStyles from '../../themes/default/comments'

/**
 * @type {Object} types - contains a map of classes to pointer names.
 */
const types = {
  "Inspiration": "inspiration",
  "Event": "event",
  "Idea": "idea"
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({  }, dispatch)
}

/**
 * This class is responsible for displaying the comment reply field.
 */
export default class CommentReply extends Component {
  /**
   * Reply to a comment
   *
   * @param {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    this.state = {
      commentText: "",
      commentBoxLocation: 0
    }
  }

  /**
   *
   *
   * @return void
   */
  componentWillMount() {
    DeviceEventEmitter.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    DeviceEventEmitter.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
  }

  /**
   * Shows the keyboard.
   *
   * @param {object} e
   * @return {void}
   */
  keyboardWillShow(e) {
    this.setState({commentBoxLocation: e.endCoordinates.height - 48})
  }

  /**
   * Hide the keyboard.
   *
   * @param {object} e - event
   * @return {void}
   */
  keyboardWillHide(e) {
    this.setState({commentBoxLocation: 0})
  }

  /**
   * Displays the send button.
   *
   * @return {object}
   */
  getSendBtn() {
    if (!this.state.commentText.length) {
      return (
        <View style={[
          CommentStyles.disabledBtn,
          BaseStyles.marginHorz
        ]}>
          <Text style={[
            CommentStyles.disabledBtnText,
            BaseStyles.textLessMuted,
            BaseStyles.sansSerifRegular,
            BaseStyles.fontMedium
          ]}>
            Post
          </Text>
        </View>
      )
    } else {
      return (
        <View style={[
          CommentStyles.sendBtn,
          BaseStyles.marginHorz
        ]}>
          <TouchableWithoutFeedback
            onPress={this.onPostComment.bind(this)}>
              <Text style={[
                CommentStyles.sendMessageText,
                BaseStyles.sansSerifRegular,
                BaseStyles.fontMedium,
                BaseStyles.textLessMuted
              ]}>
                Post
              </Text>
          </TouchableWithoutFeedback>
        </View>
      )
    }
  }

  /**
   * Post a new comment and add a relation to the feed item
   *
   * @return {void}
   */
  onPostComment() {
    const rowData = this.props.rowData

    const types = {
      "Inspiration": "inspiration",
      "Idea": "idea",
      "Event": "event"
    }

    const props = {
      user: this.props.user,
      message: this.state.commentText,
      channel: this.props.rowData.objectId,
      userDisplayName: this.props.user.username,
      userPhoto: this.props.user.photo,
      type: types[this.props.rowData.className],
      isDeleted: false
    }

  }

  /**
   * Text input field for replying to comments.
   *
   * @return {object} component
   */
  getMessageBox() {
    return (
      <TextInput
        keyboardType="default"
        autoCapitalize="none"
        returnKeyType="done"
        enablesReturnKeyAutomatically={true}
        multiline={true}
        style={[
          BaseStyles.msgTextBox,
          BaseStyles.col1,
          BaseStyles.textInput
        ]}
        value={this.state.commentText}
        onChangeText={(commentText) => this.setState({commentText})}
        placeholder="Comment" />
    )
  }

  /**
   * Render reply for comments.
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        CommentStyles.replyContainer,
        BaseStyles.replyBox,
        {bottom: this.state.commentBoxLocation}
      ]}>
        <View style={[
          CommentStyles.reply,
          BaseStyles.mediumBg,
          BaseStyles.paddingHorz,
          BaseStyles.paddingVertSmall
        ]}>
          <View style={[
            CommentStyles.reply,
            BaseStyles.row,
            BaseStyles.justifiedCols,
            BaseStyles.verticalCenteredCols
          ]}>
            {this.getMessageBox()}
            {this.getSendBtn()}
          </View>
        </View>
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentReply)
