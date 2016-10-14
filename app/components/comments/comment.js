import React, {
  View,
  Image,
  Text,
  Component
} from 'react-native'
import TimeAgo from 'react-native-timeago'

import UserPhoto from '../user-photo'
import ArticleInfo from '../article'

import BaseStyles from '../../themes/default/base'
import CommentStyles from '../../themes/default/feed'

export default class Comment extends Component {
  /**
   * Render the comment author's photo and username
   *
   * @return object
   */
  getHeader() {
    let name = "Anonymous User"
    let user = this.props.rowData.user

    if (user && user.username) {
      name = user.username
    }

    return (
      <View style={[
        CommentStyles.authorInfo,
        BaseStyles.col1,
        BaseStyles.row,
        BaseStyles.justifiedCols
      ]}>
        <Text style={[
          CommentStyles.authorName,
          BaseStyles.sansSerifMedium,
          BaseStyles.textDark,
          BaseStyles.fontMedium
        ]}>
          {name}
        </Text>
        <Text style={[
          CommentStyles.postDate,
          BaseStyles.sansSerifRegular,
          BaseStyles.textMuted,
          BaseStyles.fontExtraSmall
        ]}>
          <TimeAgo time={this.props.rowData.createdAt} />
        </Text>
      </View>
    )
  }

  /**
   * Render article component
   *
   * @return object
   */
  getWebArticle() {
    const comment = this.props.rowData
    if (comment.metaUrl && comment.metaImage && comment.metaDescription && comment.metaTitle) {
      return (
        <ArticleInfo rowData={comment} />
      )
    }
  }

  /**
   * Return message component
   *
   * @return object
   */
  getComment() {
    const message = this.props.rowData.message

    return (
      <View style={[
        BaseStyles.col1,
        CommentStyles.content,
        BaseStyles.marginLeft
      ]}>
        {this.getHeader()}
        <Text style={[
          CommentStyles.contentText,
          BaseStyles.sansSerifRegular,
          BaseStyles.textDark,
          BaseStyles.fontMedium,
          BaseStyles.paddingVert
        ]}>
          {message}
        </Text>
        {this.getWebArticle()}
      </View>
    )
  }

  /**
   * Render comment
   *
   * @return object
   */
  render() {
    return (
      <View style={[
        CommentStyles.comment,
        BaseStyles.col1,
        BaseStyles.marginVert,
        BaseStyles.marginHorz,
        BaseStyles.borderBottomLight,
        BaseStyles.row
      ]}>
        <UserPhoto user={this.props.rowData.user} photoSize="small" />
        {this.getComment()}
      </View>
    )
  }
}
