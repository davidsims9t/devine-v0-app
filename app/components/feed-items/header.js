import React, {
  View,
  Image,
  Text,
  TouchableOpacity,
  Component,
  AlertIOS
} from 'react-native'
import TimeAgo from 'react-native-timeago'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import UserPhoto from '../user-photo'

// Styles
import BaseStyles from '../../themes/default/base'
import FeedStyles from '../../themes/default/feed'

/**
 * This class is responsible for rendering the feed item header.
 */
export default class FeedItemHeader extends Component {
  /**
   * Returns the author's photo
   *
   * @return {object}
   */
  getAuthorPhoto() {
    const rowData = this.props.rowData
    const user = this.props.user

    return (<UserPhoto photoSize="extraSmall" user={user} />)
  }

  /**
   *
   * @return {[type]} [description]
   */
  onBoutiqueNavigate() {

  }

  /**
   * Return the author's name
   *
   * @return {object}
   */
  getAuthorName() {
    const rowData = this.props.rowData
    const stylist = rowData.stylist
    const boutique = rowData.boutique

    let name = "Anonymous Stylist"
    if (rowData) {
      if (stylist && stylist.username && boutique && boutique.name) {
        name = (
          <Text style={[
            FeedStyles.authorName,
            BaseStyles.fontMedium,
            BaseStyles.textDark,
            BaseStyles.marginHorz,
            BaseStyles.sansSerifRegular
          ]}>
            {stylist.username} @
            <Text style={[
              FeedStyles.boutiqueName,
              BaseStyles.sansSerifMedium
            ]}>
              {boutique.name}
            </Text>
          </Text>
        )
      } else if (boutique && boutique.name) {
        name = boutique.name
      }
    }

    return (
      <TouchableOpacity
        style={[
          FeedStyles.authorNamePress
        ]}
        onPress={this.onBoutiqueNavigate.bind(this)}>
          <Text style={[
            FeedStyles.authorName,
            BaseStyles.fontMedium,
            BaseStyles.textDark,
            BaseStyles.marginHorz,
            BaseStyles.sansSerifRegular
          ]}>
            {name}
          </Text>
      </TouchableOpacity>
    )
  }

  /**
   * Toggle the feed share options
   *
   * @return {void}
   */
  onToggleOptionMenu() {
    this.refs.feedItemOptionModal.onSetVisible()
  }

  /**
   * Render row header
   *
   * @return {object}
   */
  getRowHeader() {
    return (
      <View style={[
        FeedStyles.header,
        BaseStyles.row,
        BaseStyles.verticalCenteredCols,
        BaseStyles.justifiedCols,
        BaseStyles.marginHorz,
        BaseStyles.marginBottom
      ]}>
        <View style={[
          FeedStyles.authorInfo,
          BaseStyles.row,
          BaseStyles.verticalCenteredCols
        ]}>
          {this.getAuthorPhoto()}
          {this.getAuthorName()}
        </View>
        <View style={[
          FeedStyles.headerRight,
          BaseStyles.row,
          BaseStyles.verticalCenteredCols
        ]}>
          <Text style={[
            FeedStyles.creationDate,
            BaseStyles.textMuted,
            BaseStyles.fontSmall
          ]}>
            <TimeAgo time={this.props.rowData.createdAt} />
          </Text>
        </View>
      </View>
    )
  }

  /**
   * Render the grid header.
   *
   * @return {object} component
   */
  getGridHeader() {
    return (
      <View style={[
        FeedStyles.header,
        BaseStyles.marginHorz
      ]}>
        <View style={[
          FeedStyles.creationDate,
          BaseStyles.row,
          BaseStyles.justifiedCols,
          BaseStyles.marginBottom
        ]}>
          <View style={[
            FeedStyles.authorInfo,
            BaseStyles.row,
            BaseStyles.verticalCenteredCols
          ]}>
            {this.getAuthorPhoto()}
            {this.getAuthorName()}
          </View>
        </View>
        <View style={[
          FeedStyles.creationDateRow,
          BaseStyles.marginBottom
        ]}>
          <Text style={[
            FeedStyles.creationDate,
            BaseStyles.textMuted,
            BaseStyles.fontSmall
          ]}>
            <TimeAgo time={this.props.rowData.createdAt} />
          </Text>
        </View>
      </View>
    )
  }

  /**
   * Renders the feed item's header component.
   *
   * @return {object} component
   */
  render() {
    if (!this.props.isGridLayout) {
      return this.getRowHeader()
    } else {
      return this.getGridHeader()
    }
  }
}
