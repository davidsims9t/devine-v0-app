import React, {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Modal,
  DatePickerIOS,
  Component
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import t from 'tcomb-form-native'
const DatePicker = t.form.DatePicker

import BaseStyles from '../themes/default/base'

/**
 * This class is responsible for rendering a date picker modal.
 */
class DatePickerModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isVisible: false
    }
  }

  handleSetVisible() {
    this.setState({isVisible: !this.state.isVisible})
  }

  render() {
    return (
      <Modal
        style={BaseStyles.col1}
        transparent={true}
        animated={true}
        visible={this.state.isVisible}>
          <View style={[
            BaseStyles.bottom,
            BaseStyles.col1
          ]}>
            <View style={[
              BaseStyles.col1,
              BaseStyles.whiteBg,
              BaseStyles.paddingHorz,
              BaseStyles.paddingVert,
              BaseStyles.borderTop,
              BaseStyles.borderBottom
            ]}>
              <TouchableWithoutFeedback
                onPress={this.handleSetVisible.bind(this)}>
                  <MaterialIcon
                    name="close"
                    style={[
                      BaseStyles.textRight,
                      BaseStyles.fontMedium,
                      BaseStyles.textLessMuted
                    ]} />
              </TouchableWithoutFeedback>
            </View>
            <View style={[
              BaseStyles.mediumBg,
              BaseStyles.paddingHorz,
              BaseStyles.paddingVert,
            ]}>
              <DatePickerIOS
                ref="input"
                mode={this.props.mode}
                date={this.props.date}
                onDateChange={(value) => {
                  this.props.onChange(new Date(value))
                }} />
            </View>
          </View>
      </Modal>
    )
  }
}

class CustomDatePicker extends DatePicker {
  render() {
    let locals = super.getLocals()

    let stylesheet = locals.stylesheet
    let selectStyle = stylesheet.select.normal
    let errorBlockStyle = stylesheet.errorBlock
    let controlLabelStyle = stylesheet.controlLabel.normal

    if (locals.hasError) {
      selectStyle = stylesheet.select.error
    }

    let error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null

    const date = new Date(locals.value)

    // @TODO: Find a better work-around this this
    let heading = locals.path[0] == 'startTime' ? <View style={[BaseStyles.marginVert, BaseStyles.marginHorz]}><Text style={controlLabelStyle}>RELEASE SCHEDULE</Text></View> : null

    const month = date.getMonth() + 1
    const day = date.getDate()
    const year = date.getFullYear()
    const minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()

    const amPM = date.getHours() >= 12 ? "pm" : "am"
    let hours = date.getHours()
    if (hours == 12 || hours == 24) {
      hours = 12
    } else {
      hours = hours % 12
    }

    let dateValue = month + "/" + day + "/" + year + " " + hours + ":" + minutes + " " + amPM
    if (locals.mode == "date") {
      dateValue = month + " / " + day + " / " + year
    } else if (locals.mode == "time") {
      dateValue = hours + " : " + minutes + " " + amPM
    }

    return (
      <View>
        <DatePickerModal
          ref="dateModal"
          minimumDate={locals.minimumDate}
          maximumDate={locals.maximumDate}
          mode={locals.mode}
          onChange={locals.onChange}
          date={locals.value} />
        {heading}
        <View style={[
          BaseStyles.whiteBg,
          BaseStyles.paddingVert,
          BaseStyles.paddingHorz
        ]}>
          <TouchableHighlight
            style={selectStyle}
            onPress={() => this.refs.dateModal.handleSetVisible()}
            underlayColor="#ccc">
              <View style={[
                BaseStyles.row,
                BaseStyles.justifiedCols,
                BaseStyles.verticalCenteredCols
              ]}>
                <Text style={[
                  BaseStyles.sansSerifRegular,
                  BaseStyles.fontSmall,
                  BaseStyles.textDark
                ]}>
                  {locals.label}
                </Text>
                <Text style={[
                  BaseStyles.sansSerifRegular,
                  BaseStyles.fontSmall,
                  BaseStyles.textDark
                ]}>
                  {dateValue}
                </Text>
              </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

module.exports = CustomDatePicker
