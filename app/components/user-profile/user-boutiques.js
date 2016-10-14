import React, {
  View,
  TouchableHighlight,
  Text,
  Component,
  ListView
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getUserBoutique } from '../../actions/user-boutique'

const mapStateToProps = state => ({
  userBoutique: state.userBoutique.results,
  isLoading: state.userBoutique.isLoading
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getUserBoutique }, dispatch)
}

// Components
import LoadingView from '../loading'
import UserPhoto from '../user-photo'

// Styles
import ProfileStyles from '../../themes/default/profile'
import BaseStyles from '../../themes/default/base'

/**
 * This class is responsible for displaying a user's list of popular boutiques.
 */
class UserBoutiques extends Component {
  /**
   * List of the user's boutiques.
   *
   * @param {object} props
   * @return {void}
   */
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource
    }
  }

  /**
   * Load boutiques the user is following
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.getUserBoutique({
      userId: this.props.user.objectId,
      isFollowing: true
    })
  }

  /**
   * Render the user boutique component.
   *
   * @param {object} rowData - the user boutique record data
   * @return {object} component
   */
  renderRow(rowData) {
    return (
      <TouchableHighlight
        style={[
          ProfileStyles.boutiquePress,
          BaseStyles.paddingVert,
          BaseStyles.paddingHorz
        ]}
        underlayColor="#ccc"
        onPress={this.actions.routes.boutiqueProfile(rowData)}>
          <View style={[
            ProfileStyles.boutique,
            BaseStyles.row,
            BaseStyles.col,
            BaseStyles.verticalCenteredCols
          ]}>
            <UserPhoto
              style={[
                BaseStyles.marginBottom
              ]}
              user={rowData.boutique}
              photoSize="small" />
            <Text style={[
              ProfileStyles.boutiqueTitle,
              BaseStyles.textCenter,
              BaseStyles.textDark,
              BaseStyles.textCenter,
              BaseStyles.sansSerifMedium,
              BaseStyles.fontExtraSmall
            ]}>
              {String(rowData.boutique.name).toUpperCase()}
            </Text>
          </View>
      </TouchableHighlight>
    )
  }

  /**
   * Display this component if the user isn't following any boutiques yet.
   *
   * @return {object} component
   */
  getUserBoutiquePlaceholder() {
    return (
      <View style={[
        ProfileStyles.usersBoutiques,
        BaseStyles.whiteBg,
        BaseStyles.paddingVert,
        BaseStyles.paddingHorz
      ]}>
        <Text style={[
          ProfileStyles.usersBoutiquesText,
          BaseStyles.textLessMuted,
          BaseStyles.sansSerifRegular,
          BaseStyles.fontSmall
        ]}>
          Nothing to show...
        </Text>
      </View>
    )
  }

  /**
   * Renders a list of the user's boutiques in horizontal order.
   *
   * @return {object} component
   */
  getUserBoutiquesList() {
    return (
      <View style={[
        ProfileStyles.usersBoutiques,
        BaseStyles.row,
        BaseStyles.justifiedCols,
        BaseStyles.whiteBg
      ]}>
        <ListView
          style={[
            ProfileStyles.userBoutiquesList,
            BaseStyles.col1
          ]}
          dataSource={this.state.dataSource.cloneWithRows(this.props.userBoutique)}
          horizontal={true}
          renderRow={this.renderRow.bind(this)}
          automaticallyAdjustContentInsets={false} />
      </View>
    )
  }

  /**
   * Render the user boutique component.
   *
   * @return {object} component
   */
  render() {
    console.log(this.props.userBoutique)

    if (this.props.isLoading) {
      return (<LoadingView />)
    }

    let component
    if (this.props.userBoutique.length) {
      component = this.getUserBoutiquesList()
    } else {
      component = this.getUserBoutiquePlaceholder()
    }

    return (
      <View style={[
        ProfileStyles.usersBoutiquesContainer
      ]}>
        <Text style={[
          ProfileStyles.usersBoutiquesLabel,
          BaseStyles.textDark,
          BaseStyles.marginHorz,
          BaseStyles.marginBottom,
          BaseStyles.sansSerifBold
        ]}>
          MY BOUTIQUES
        </Text>
        {component}
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBoutiques)
