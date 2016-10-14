import React, {
  View,
  Text,
  TouchableHighlight,
  Component,
  LinkingIOS,
  AlertIOS
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { truncateText } from '../../utils/string'
import { updateStats } from '../../actions/feed'

import BaseStyles from '../../themes/default/base'
import FeedStyles from '../../themes/default/feed'

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateStats }, dispatch)
}

/**
 * This class is responsible for rending the feed item description.
 */
class Description extends Component {
  /**
   * Parses description for tags and urls and makes them clickable
   *
   * @param {string} rawText - description to parse
   * @return {object}
   */
  parseContent(rawText) {
    const matches = rawText.trim().split(/\s+/)

    const processedText = matches.map((text) => {
      if (text.match(/^(#[a-z]{1})([a-z0-9_]+)$/ig)) {
        return (
          <Text style={[
            BaseStyles.textPrimary
          ]} onPress={() => this.onTagPress(text)}>
            {text}
          </Text>
        )
      } else if (text.match(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/ig)) {
        return (
          <Text style={[
            BaseStyles.textPrimary
          ]} onPress={() => this.onUrlPress(text)}>
            {text}
          </Text>
        )
      } else {
        return (
          <Text>{text} </Text>
        )
      }
    })

    return processedText
  }

  /**
   * Opens a URL and updates the inspiration stats.
   *
   * @param {string} url - url from description
   * @return {void}
   */
  onUrlPress(url) {
    try {
      this.props.updateStats({
        rowData: this.props.rowData,
        colName: "urlClicks",
        user: this.props.user,
        totalCount: "totalUrlClicksCount"
      })

      LinkingIOS.openURL(url)
    } catch(error) {
      AlertIOS.alert("Failed to open URL.")
    }
  }

  /**
   * Searches feed items with the matching tag
   *
   * @param string tag
   * @return void
   */
  onTagPress(tag) {
    // if (this.props.handleSetSearchQuery) {
    //   this.props.handleSetSearchQuery(tag)
    // }

    this.props.updateStats({
      rowData: this.props.rowData,
      clickItem: tag.replace(/#/, ''),
      clickItemColName: "tag",
      colName: "tagClicks",
      user: this.props.user,
      totalCount: "totalTagClicksCount"
    })
  }

  /**
   * Renders the feed item's title and price (optional)
   *
   * @return {object}
   */
  getTitle() {
    const rowData = this.props.rowData

    if (rowData && rowData.title && rowData.title.length) {
      const feedTitle = truncateText(rowData.title, 20)

      if (rowData.price) {
        return (
          <View style={[
            FeedStyles.titleRow,
            BaseStyles.marginHorz,
            BaseStyles.row,
            BaseStyles.justifiedCols,
            BaseStyles.verticalCenteredCols,
            BaseStyles.marginBottom
          ]}>
            <Text style={[
              FeedStyles.title,
              BaseStyles.fontSmall,
              BaseStyles.sansSerifMedium,
              BaseStyles.textLessMuted
            ]}>
              {feedTitle}
            </Text>
            {this.getPrice()}
          </View>
        )
      } else {
        return (
          <Text style={[
            FeedStyles.title,
            BaseStyles.fontMedium,
            BaseStyles.sansSerifMedium,
            BaseStyles.textLessMuted,
            BaseStyles.marginHorz,
            BaseStyles.marginBottom
          ]}>
            {feedTitle}
          </Text>
        )
      }
    }
  }

  /**
   * Render the feed item's price.
   *
   * @return {object}
   */
  getPrice() {
    const rowData = this.props.rowData

    if (!rowData.salePrice) {
      return (
        <Text style={[
          FeedStyles.price,
          BaseStyles.fontSmall,
          BaseStyles.sansSerifMedium,
          BaseStyles.textLessMuted
        ]}>
          ${rowData.price}
        </Text>
      )
    } else {
      return (
        <Text style={[
          FeedStyles.price,
          BaseStyles.fontSmall,
          BaseStyles.sansSerifMedium,
          BaseStyles.textLessMuted
        ]}>
          <Text style={[
            FeedStyles.originalPrice,
            BaseStyles.textMuted,
            BaseStyles.strikeThrough
          ]}>
            ${rowData.price}
          </Text>
          <Text style={[
            FeedStyles.salePrice,
            BaseStyles.marginLeft
          ]}>
            ${rowData.salePrice}
          </Text>
        </Text>
      )
    }
  }

  /**
   * Render the feed item's description.
   *
   * @return {object} component
   */
  getDescription() {
    const rowData = this.props.rowData

    if (rowData && rowData.description && rowData.description.length) {
      return (
        <Text style={[
          FeedStyles.description,
          BaseStyles.fontMedium,
          BaseStyles.sansSerifLight,
          BaseStyles.textLessMuted,
          BaseStyles.marginHorz,
          BaseStyles.marginBottom
        ]}>
          {this.parseContent(rowData.description)}
        </Text>
      )
    }

    return (<View></View>)
  }

  /**
   * Renders the feed title, price, and description
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        FeedStyles.descriptionContainer,
        BaseStyles.col1
      ]}>
        {this.getTitle()}
        {this.getDescription()}
      </View>
    )
  }
}

export default connect(null, mapDispatchToProps)(Description)
