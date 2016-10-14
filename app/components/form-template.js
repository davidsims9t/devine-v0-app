import React, {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  SwitchIOS,
  PickerIOS,
  Component,
  Modal
} from 'react-native'

import BaseStyles from '../themes/default/base'

/**
 * Custom textbox to be use with the Tcomb form plugin.
 *
 * @param  {object} locals - props passed from tcomb library
 * @return {object} component
 */
function textbox(locals) {
  let stylesheet = locals.stylesheet
  let errorBlockStyle = stylesheet.errorBlock
  let textboxStyle = stylesheet.textbox.normal
  let controlLabelStyle = stylesheet.controlLabel.normal

  if (locals.hasError) {
    textboxStyle = stylesheet.textbox.error
  }

  if (locals.editable === false) {
    textboxStyle = stylesheet.textbox.notEditable
  }

  if (locals.multiline === true) {
    textboxStyle = stylesheet.textbox.multiline
  }

  let error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null
  let label = locals.label ? <View style={[BaseStyles.marginVert, BaseStyles.marginHorz]}><Text style={controlLabelStyle}>{locals.label}</Text></View> : null

  return (
    <View>
      {label}
      <View style={[
        BaseStyles.whiteBg,
        BaseStyles.paddingHorz,
        BaseStyles.paddingVertSmall
      ]}>
        <View style={[
          BaseStyles.borderBottomLight
        ]}>
          <TextInput
            ref="input"
            autoCapitalize={locals.autoCapitalize}
            autoCorrect={locals.autoCorrect}
            autoFocus={locals.autoFocus}
            bufferDelay={locals.bufferDelay}
            clearButtonMode={locals.clearButtonMode}
            editable={locals.editable}
            enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
            keyboardType={locals.keyboardType}
            multiline={locals.multiline}
            onBlur={locals.onBlur}
            onEndEditing={locals.onEndEditing}
            onFocus={locals.onFocus}
            onSubmitEditing={locals.onSubmitEditing}
            password={locals.password}
            placeholderTextColor={locals.placeholderTextColor}
            returnKeyType={locals.returnKeyType}
            selectTextOnFocus={locals.selectTextOnFocus}
            secureTextEntry={locals.secureTextEntry}
            selectionState={locals.selectionState}
            onChangeText={(value) => locals.onChange(value)}
            placeholder={locals.placeholder}
            style={textboxStyle}
            value={locals.value} />
        </View>
        {error}
      </View>
    </View>
  )
}

/**
 * Custom check box to be use with the Tcomb form plugin.
 *
 * @param  {object} locals - props passed from tcomb library
 * @return {object} component
 */
function checkbox(locals) {
  let stylesheet = locals.stylesheet
  let checkboxStyle = stylesheet.checkbox.normal
  let errorBlockStyle = stylesheet.errorBlock
  let controlLabelStyle = stylesheet.controlLabel.normal

  if (locals.hasError) {
    checkboxStyle = stylesheet.checkbox.error
  }

  let error = locals.hasError && locals.error ? <Text style={errorBlockStyle}>{locals.error}</Text> : null
  let label = locals.label ? <Text style={controlLabelStyle}>{locals.label}</Text> : null

  let heading
  if (locals.path[0] == "shouldReceiveReminder") {
    heading = (
      <Text style={[
        controlLabelStyle,
        BaseStyles.marginHorz,
        BaseStyles.marginVert
      ]}>
        SCHEDULE REMINDER
      </Text>
    )
  }

  return (
    <View>
      {heading}
      <View style={[
        BaseStyles.whiteBg,
        BaseStyles.paddingVert,
        BaseStyles.paddingHorz,
        BaseStyles.row,
        BaseStyles.justifiedCols
      ]}>
        <Text style={[
          BaseStyles.sansSerifRegular,
          BaseStyles.fontSmall,
          BaseStyles.textDark
        ]}>
          {locals.label}
        </Text>
        <SwitchIOS
          ref="input"
          disabled={locals.disabled}
          onTintColor={locals.onTintColor}
          thumbTintColor={locals.thumbTintColor}
          tintColor={locals.tintColor}
          style={checkboxStyle}
          onValueChange={(value) => locals.onChange(value)}
          value={locals.value} />
        {error}
      </View>
    </View>
  )
}

/**
 * Custom select to use with the Tcomb form plugin.
 *
 * @param  {object} locals - props passed from tcomb library
 * @return {object} component
 */
function select(locals) {
  return (
    <View></View>
  )
}

/**
 * Custom datepicker to use with the Tcomb form plugin.
 *
 * @param  {object} locals - props passed from tcomb library
 * @return {object} component
 */
function datepicker(locals) {
  return (
    <View></View>
  )
}

/**
 * Custom form wrapper to use with the Tcomb form plugin.
 *
 * @param  {object} locals - props passed from tcomb library
 * @return {object} component
 */
function struct(locals) {
  let stylesheet = locals.stylesheet

  let rows = locals.order.map(function (name) {
    return locals.inputs[name]
  })

  return (
    <View>
      {rows}
    </View>
  )
}

module.exports = {
  textbox,
  checkbox,
  select,
  datepicker,
  struct
}
