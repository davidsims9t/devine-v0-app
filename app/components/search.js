import React, {
  View,
  Text,
  TouchableHighlight,
  Component,
  TextInput
} from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

import SearchStyles from '../themes/default/search'
import BaseStyles from '../themes/default/base'

/**
 * This class is responsible for the search text input.
 */
export default class SearchTextInput extends Component {
  /**
   * Render the search text input.
   *
   * @return {object} component
   */
  render() {
    return (
      <View style={[
        SearchStyles.searchContainer,
        BaseStyles.searchContainer,
        BaseStyles.marginBottom
      ]}>
        <TextInput
          style={[
            SearchStyles.searchField,
            BaseStyles.textFieldWithIcon,
            BaseStyles.textInput,
            BaseStyles.fontSmall,
            BaseStyles.textLessMuted
          ]}
          placeholder="Search"
          clearButtonMode="always"
          value={this.props.searchQuery}
          onChangeText={this.props.onSetSearchQuery} />
        <MaterialIcon
          name="search"
          style={[
            SearchStyles.searchIcon,
            BaseStyles.textMuted,
            BaseStyles.fontExtraSmall,
            BaseStyles.searchIcon
          ]} />
      </View>
    )
  }
}
