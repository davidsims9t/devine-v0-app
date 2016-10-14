import React, {
  Text,
  View,
  Image,
  ListView,
  TouchableHighlight,
  Component
} from 'react-native'
import TimeAgo from 'react-native-timeago'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

// Components
import UserPhoto from '../user-photo'

// Utils
import { truncateText } from '../../utils/string'

// Styles
import BaseStyles from '../../themes/default/base'
import MessageStyles from '../../themes/default/message'

/**
 * This class is responsible for displaying an individual message row.
 */
export default class MessageRow extends Component {
  /**
   * Render message content component.
   *
   * @param {object} rowData - the message data
   * @return {object}
   */
  getContent(rowData) {
    let textStyle
    if (!rowData.isRead) {
      textStyle = BaseStyles.textLessMuted
    }

    const excerpt = truncateText(rowData.message)

    return (
      <View style={[
        MessageStyles.contentContainer,
        BaseStyles.col1,
        BaseStyles.marginHorz
      ]}>
        <Text style={[
          MessageStyles.sender,
          BaseStyles.fontSmall,
          BaseStyles.textDark,
          BaseStyles.sansSerifRegular,
          BaseStyles.marginBottom
        ]}>
          {rowData.userDisplayName}
        </Text>
        <Text style={[
          MessageStyles.content,
          BaseStyles.fontSmall,
          BaseStyles.textDark,
          BaseStyles.sansSerifRegular
        ]}>
          {excerpt}
        </Text>
      </View>
    )
  }

  /**
   * Renders the sender's photo, display name, and last message time.
   *
   * @param {object} rowData
   * @return {object} component
   */
  getSenderDetails(rowData) {
    let name = "Anonymous User"
    if (rowData.fromUser && rowData.fromUser.username) {
      name = rowData.fromUser.username
    }

    return (
      <View style={[
        MessageStyles.contentContainer,
        BaseStyles.row,
        BaseStyles.justifiedCols,
        BaseStyles.marginHorz,
        BaseStyles.marginVert,
        BaseStyles.borderBottom
      ]}>
        <Text style={[
          MessageStyles.senderName,
          BaseStyles.sansSerifMedium,
          BaseStyles.fontMedium,
          BaseStyles.textDark
        ]}>
          {name}
        </Text>
        <Text style={[
          MessageStyles.sentTime,
          BaseStyles.fontSmall,
          BaseStyles.textMuted,
          BaseStyles.sansSerifLight
        ]}>
          <TimeAgo time={rowData.createdAt} />
        </Text>
      </View>
    )
  }

  /**
   * Render conversation row.
   *
   * @param {object} rowData - the conversation row
   * @return {object} component
   */
  renderRow(rowData) {
    let isRead
    if (!rowData.isRead) {
      rowStyle = BaseStyles.whiteBg
    } else {
      rowStyle = BaseStyles.lightBg
    }

    return (
      <TouchableHighlight
        style={[
          rowStyle,
          BaseStyles.paddingHorz,
          BaseStyles.marginBottom
        ]}
        underlayColor="#efefef">
          <View style={[
            MessageStyles.conversation,
            BaseStyles.paddingVert,
            BaseStyles.borderBottom,
            BaseStyles.row
          ]}>
            <UserPhoto user={rowData.fromUser} photoSize="small" />
            {this.getContent(rowData)}
          </View>
      </TouchableHighlight>
    )
  }
}
