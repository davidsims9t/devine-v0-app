import React, {
  Component,
  AlertIOS,
  LinkingIOS,
  View,
  Text,
  ScrollView,
  TouchableWithoutFeedback
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import moment from 'moment'

import BaseStyles from '../../themes/default/base'
import BoutiqueStyles from '../../themes/default/boutique'

/**
 * This class displays the boutique info view.
 */
export default class BoutiqueInfo extends Component {
  /**
   * Displays the boutique's opening and closing times for the given day
   *
   * @param object day opening/closing times for the day
   * @return object
   */
  getDay(day) {
    let openHours
    let closedHours

    if (day.isEnabled && day.open && day.close) {
      openHours = (
        <Text style={[
          BoutiqueStyles.openTime,
          BaseStyles.col1,
          BaseStyles.textDark,
          BaseStyles.sansSerifRegular,
          BaseStyles.fontSmall
        ]}>
          {moment(day.open).format('h:mm a')}
        </Text>
      )

      closedHours = (
        <Text style={[
          BoutiqueStyles.closeTime,
          BaseStyles.col1,
          BaseStyles.textDark,
          BaseStyles.sansSerifRegular,
          BaseStyles.fontSmall
        ]}>
          {moment(day.close).format('h:mm a')}
        </Text>
      )
    } else {
      openHours = (
        <Text style={[
          BoutiqueStyles.closedAllDay,
          BaseStyles.col1,
          BaseStyles.textDark,
          BaseStyles.sansSerifRegular,
          BaseStyles.fontSmall
        ]}>
          Closed All Day
        </Text>
      )
    }

    return (
      <View style={[
        BoutiqueStyles.hours,
        BaseStyles.col1,
        BaseStyles.row,
        BaseStyles.paddingVert,
        BaseStyles.borderBottomLight
      ]}>
        <Text style={[
          BoutiqueStyles.day,
          BaseStyles.col1,
          BaseStyles.textDark,
          BaseStyles.sansSerifMedium,
          BaseStyles.fontSmall
        ]}>
          {day.day}
        </Text>
        {openHours}
        {closedHours}
      </View>
    )
  }

  /**
   * Returns the boutique's operating hours
   *
   * @return object
   */
  getHours() {
    return (
      <View style={[
        BoutiqueStyles.hoursContainer
      ]}>
        <Text style={[
          BoutiqueStyles.hoursHeadingText,
          BaseStyles.sansSerifBold,
          BaseStyles.textDark,
          BaseStyles.fontSmall,
          BaseStyles.marginVert
        ]}>
          HOURS
        </Text>
        <View style={[
          BoutiqueStyles.hoursHeading,
          BaseStyles.row,
          BaseStyles.justifiedCols,
          BaseStyles.marginVert
        ]}>
          <View style={[
            BaseStyles.col1
          ]}>
          </View>
          <Text style={[
            BoutiqueStyles.hoursHeading,
            BaseStyles.col1,
            BaseStyles.textLessMuted,
            BaseStyles.sansSerifMedium,
            BaseStyles.fontSmall
          ]}>
            OPEN
          </Text>
          <Text style={[
            BoutiqueStyles.hoursHeading,
            BaseStyles.col1,
            BaseStyles.textLessMuted,
            BaseStyles.sansSerifMedium,
            BaseStyles.fontSmall
          ]}>
            CLOSED
          </Text>
        </View>
        {this.props.routerData.boutique.hours.map(day => {
          return this.getDay(day)
        }, this)}
      </View>
    )
  }

  /**
   * Email the boutique
   *
   * @return void
   */
  openEmail() {
    const boutique = this.props.routerData.boutique

    try {
      LinkingIOS.openURL('mailto:' + boutique.email)
    } catch(error) {
      AlertIOS.alert("Failed to open email")
    }
  }

  /**
   * Calls the boutique if they have a phone number
   *
   * @return void
   */
  openPhone() {
    const boutique = this.props.routerData.boutique

    try {
      LinkingIOS.openURL('tel:' + boutique.phone)
    } catch(error) {
      AlertIOS.alert("Failed to call phone.")
    }
  }

  /**
   * Renders the boutique's contact info such as email and phone
   *
   * @return object
   */
  getContactInfo() {
    const boutique = this.props.routerData.boutique

    return (
      <View style={[
        BoutiqueStyles.contactHeading
      ]}>
        <Text style={[
          BoutiqueStyles.contactHeadingText,
          BaseStyles.sansSerifBold,
          BaseStyles.textDark,
          BaseStyles.fontSmall,
          BaseStyles.marginVert
        ]}>
          CONTACT
        </Text>
        <View style={[
          BoutiqueStyles.emailHeading,
          BaseStyles.marginVert,
          BaseStyles.borderBottomLight
        ]}>
          <TouchableWithoutFeedback onPress={this.openEmail.bind(this)}>
            <View style={[
              BoutiqueStyles.hoursHeading,
              BaseStyles.row
            ]}>
              <MaterialIcon
                name="email"
                style={[
                  BaseStyles.textPrimary,
                  BaseStyles.sansSerifRegular,
                  BaseStyles.fontMedium
                ]} />
              <Text
                style={[
                  BaseStyles.textPrimary,
                  BaseStyles.sansSerifRegular,
                  BaseStyles.fontMedium
                ]}>
                  {boutique.email}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.openPhone.bind(this)}>
            <View style={[
              BaseStyles.row
            ]}>
              <MaterialIcon
                name="phone"
                style={[
                  BaseStyles.textPrimary,
                  BaseStyles.sansSerifRegular,
                  BaseStyles.fontMedium
                ]} />
              <Text
                style={[
                  BaseStyles.textPrimary,
                  BaseStyles.sansSerifRegular,
                  BaseStyles.fontMedium
                ]}>
                  {boutique.phone}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  /**
   * Renders a scrollable list of the boutique contact info and hours.
   *
   * @return {object} component
   */
  render() {
    return (
      <ScrollView
        contentContainerStyle={[
          BoutiqueStyles.infoContainer,
          BaseStyles.marginHorz,
          BaseStyles.col1
        ]}>
          {this.getContactInfo()}
          {this.getHours()}
      </ScrollView>
    )
  }
}
