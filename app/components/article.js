import React, {
  View,
  Image,
  Text,
  TouchableHighlight,
  LinkingIOS,
  AlertIOS,
  Component
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import BaseStyles from '../themes/default/base'

/**
 * This class is responsible for rendering an web article preview used with ideas, messages, and comments.
 */
export default class ArticleInfo extends Component {
  /**
   * Returns the Open Graph image for the web page or a placeholder if there isn't one.
   *
   * @return {object}
   */
  getArticlePhoto() {
    let rowData = this.props.rowData

    if (rowData && rowData.metaImage && rowData.metaImage.length) {
      return (
        <Image source={{uri: rowData.metaImage}} style={[
          BaseStyles.articleImage
        ]} />
      )
    }

    return (
      <View style={[
        BaseStyles.mediumBg,
        BaseStyles.verticalCenteredCols,
        BaseStyles.paddingVertExtraLarge,
        BaseStyles.paddingHorzExtraLarge,
        BaseStyles.centeredCols
      ]}>
        <MaterialIcon
          name="web"
          style={[
            BaseStyles.textLessMuted,
            BaseStyles.fontExtraLarge
          ]} />
      </View>
    )
  }

  /**
   * Renders the article details.
   *
   * @return {object}
   */
  getArticleDetails() {
    let rowData = this.props.rowData
    let metaTitle = "Unknown Title"
    let metaDescription = "Unknown Description"

    if (rowData
      && rowData.metaTitle
      && rowData.metaTitle.length
      && rowData.metaDescription
      && rowData.metaDescription.length) {
        metaTitle = rowData.metaTitle
        metaDescription = rowData.metaDescription
    }

    return (
      <View style={[
        BaseStyles.articleDetails,
        BaseStyles.marginLeft,
        BaseStyles.col1
      ]}>
        <Text style={[
          BaseStyles.articleTitle,
          BaseStyles.sansSerifMedium,
          BaseStyles.textDark,
          BaseStyles.fontMedium
        ]}>
          {metaTitle}
        </Text>
        <Text style={[
          BaseStyles.articleDescription,
          BaseStyles.sansSerifRegular,
          BaseStyles.textLessMuted,
          BaseStyles.fontSmall,
          BaseStyles.paddingVert
        ]}>
          {metaDescription}
        </Text>
      </View>
    )
  }

  /**
   * Opens a URL.
   *
   * @return void
   */
  onOpenLink() {
    const url = this.props.rowData.metaUrl

    if (url) {
      LinkingIOS.canOpenURL(url, (isSupported) => {
        if (isSupported) {
          LinkingIOS.openURL(url)
        } else {
          AlertIOS.alert("Failed to open URL.")
        }
      })
    } else {
      AlertIOS.alert("Failed to open URL.")
    }
  }

  /**
   * Renders the article component.
   *
   * @return {object}
   */
  render() {
    return (
      <TouchableHighlight
        onPress={this.onOpenLink.bind(this)}
        underlayColor="#ccc">
          <View style={[
            BaseStyles.article,
            BaseStyles.col1,
            BaseStyles.row,
            BaseStyles.marginHorz,
            BaseStyles.marginBottom
          ]}>
            {this.getArticlePhoto()}
            {this.getArticleDetails()}
          </View>
      </TouchableHighlight>
    )
  }
}
