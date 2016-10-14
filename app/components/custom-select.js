import React, {
  View,
  Text,
  TouchableWithoutFeedback,
  Modal,
  PickerIOS,
  TouchableHighlight,
  Component
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import t from 'tcomb-form-native'
import _ from 'lodash'
const Select = t.form.Select

import BaseStyles from '../themes/default/base'

class SelectModal extends Component {
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
    const options = this.props.options.map(
      ({value, text}) => <PickerIOS.Item key={value} value={value} label={text} />
    )

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
                      BaseStyles.textDark
                    ]} />
              </TouchableWithoutFeedback>
            </View>
            <View style={[
              BaseStyles.mediumBg,
              BaseStyles.paddingHorz,
              BaseStyles.paddingVert,
            ]}>
              <PickerIOS
                ref="input"
                selectedValue={this.props.value}
                onValueChange={this.props.onChange}>
                  {options}
              </PickerIOS>
            </View>
          </View>
      </Modal>
    )
  }
}

class CustomSelect extends Select {
  render() {
    let locals = super.getLocals()

    let stylesheet = locals.stylesheet
    let selectStyle = stylesheet.select.normal
    let errorBlockStyle = stylesheet.errorBlock

    if (locals.hasError) {
      selectStyle = stylesheet.select.error
    }

    let error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null

    let value = "-"
    if (locals.value) {
      value = _.find(locals.options, {value: locals.value}).text
    }

    return (
      <View>
        <SelectModal
          ref="selectModal"
          onChange={locals.onChange}
          options={locals.options}
          value={locals.value} />
        <View style={[
          BaseStyles.whiteBg,
          BaseStyles.paddingVertSmall,
          BaseStyles.paddingHorz
        ]}>
          <TouchableHighlight
            style={[{selectStyle}, BaseStyles.borderBottomLight]}
            onPress={() => this.refs.selectModal.handleSetVisible()}
            underlayColor="#ccc">
              <Text style={[
                BaseStyles.sansSerifRegular,
                BaseStyles.fontSmall,
                BaseStyles.textDark,
              ]}>
                {value}
              </Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

module.exports = CustomSelect
