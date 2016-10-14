import React, {
  View,
  Text,
  Component,
  LinkingIOS,
  AlertIOS,
  TouchableOpacity
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { updateStats } from '../../actions/feed'

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateStats }, dispatch)
}

import BaseStyles from '../../themes/default/base'
import FeedStyles from '../../themes/default/feed'

/**
 * This class is responsible for displaying the boutique info in a feed item row.
 */
class BoutiqueInfo extends Component {
  /**
   * Navigate to google maps.
   *
   * @return {void}
   */
  onMapNavigate() {
    const user = this.props.user
    const rowData = this.props.rowData
    const address = rowData.address + ' ' + rowData.city + ', ' + rowData.state + ' ' + rowData.zip
    const url = 'http://maps.google.com/?q=' + address

    try {
      this.props.updateFeedStats({
        rowData,
        colName: "uniqueBoutiqueAddressClicks",
        user,
        totalCount: "totalBoutiqueAddressClicksCount"
      })

      LinkingIOS.canOpenURL(url, (isSupported) => {
        if (isSupported) {
          LinkingIOS.openURL(url)
        } else {
          AlertIOS.alert("Failed to open maps.")
        }
      })
    } catch(error) {
      AlertIOS.alert("Failed to open URL.")
    }
  }

  /**
   * Displays the boutique address.
   *
   * @return {object} component
   */
  getAddress() {
    let address = []
    const boutique = this.props.rowData.boutique

    if (boutique) {
      if (boutique.address) {
        address.push(boutique.address)
      }

      if (boutique.city) {
        address.push(boutique.city)
      }

      if (boutique.state) {
        address.push(boutique.state)
      }

      if (boutique.zip) {
        address.push(boutique.zip)
      }
    }

    let addressComponent
    if (address.length) {
      addressComponent = (
        <View style={[
          FeedStyles.address,
          BaseStyles.row,
          BaseStyles.verticalCenteredCols,
          BaseStyles.marginBottom
        ]}>
          <MaterialIcon
            name="place"
            style={[
              FeedStyles.addressIcon,
              BaseStyles.textPrimary,
              BaseStyles.fontSmall
            ]} />
          <Text
            style={[
              FeedStyles.addressText,
              BaseStyles.textPrimary,
              BaseStyles.fontSmall,
              BaseStyles.paddingHorz
            ]}>
              {address.join(", ")}
          </Text>
        </View>
      )
    }

    return addressComponent
  }

  /**
   * Render boutique address
   *
   * @return {object}
   */
  render() {
    return (
      <TouchableOpacity
        style={[
          FeedStyles.contactContainer,
          BaseStyles.marginHorz,
          BaseStyles.marginVert
        ]}
        onPress={this.onMapNavigate.bind(this)}>
          {this.getAddress()}
      </TouchableOpacity>
    )
  }
}

export default connect(null, mapDispatchToProps)(BoutiqueInfo)
