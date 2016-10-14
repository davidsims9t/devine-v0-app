import React, {
  View,
  ListView,
  Text,
  Component
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { getFeed } from '../actions/feed'

// Components
import LoadingView from '../../components/loading'
import BoutiquePhoto from '../components/boutique/photo'
import BoutiqueOptions from './options'
import ProfileTabs from '../profile-tabs'

// Styles
import BaseStyles from '../../themes/default/base'
import BoutiqueStyles from '../../themes/boutique'

/**
 * @type {Array} orders - sort options
 */
const orders = [
  {text: 'NEW', option: 'createdAt'},
  {text: 'POPULAR', option: 'interactions'},
  {text: 'TAGS', option: 'tags'}
]

/**
 * @type {Object}
 */
const classNames = {
  'inspiration': 'Inspiration',
  'event': 'Event',
  'idea': 'Idea'
}

/**
 * @type {Array}
 */
const tabs = [
  {
    title: 'Inspiration',
    col: 'inspiration',
    countCol: 'inspirationsCount'
  },
  {
    title: 'Event',
    col: 'event',
    countCol: 'eventsCount'
  },
  {
    title: 'Idea',
    col: 'idea',
    countCol: 'ideasCount'
  }
]

const mapStateToProps = state => ({
  feedData: state.feed.feedData
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getFeedItem }, dispatch)
}

/**
 * This class displays the boutique's profile.
 */
class BoutiqueProfile extends Component {
  /**
   * Boutique profile
   *
   * @param object props
   * @return void
   */
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      currentTab: "inspiration",
      isDescending: true,
      layout: "listView",
      order: "createdAt",
      offset: 0,
      dataSource
    }
  }

  /**
   * Loads boutique feed items on component mount.
   *
   * @return {void}
   */
  componentDidMount() {
    this.props.getFeedItem({
      className: classNames[this.state.currentTab],
      offset: this.state.offset,
      order: this.state.order,
      isDescending: this.state.isDescending
    })
  }

  /**
   * Set's the current active tab tab
   *
   * @param {void} currentTab - the new tab value
   */
  setTab(currentTab) {
    this.setState({
      currentTab,
      offset: 0,
      isSearching: false
    })
  }

  /**
   * Set the sort order or layout view.
   *
   * @param {string} value - this can either be the sort order or the layout view.
   * @return {void}
   */
  setOrderOrLayoutView(value) {
    if (value == "listView" || value == "gridView") {
      this.setState({
        layout: value
      })
    } else {
      const isDescending = value == this.state.order

      this.setState({
        order,
        isDescending
      })
    }
  }

  /**
   *
   * @return {[type]} [description]
   */
  renderHeader() {
    const { routerData, user } = this.props
    const { boutique } = routerData

    return (
      <View style={[
        BoutiqueStyles.profileHeader,
        BaseStyles.col1,
      ]}>
        <BoutiquePhoto boutique={boutique} />
        <View style={[
          BoutiqueStyles.searchBar,
          BaseStyles.top,
          BaseStyles.translucentContainer,
          BaseStyles.paddingHorz,
          BaseStyles.paddingVert
        ]}>
          <SearchBar onChange={this.SearchQuery.bind(this)} />
          <SortBar
            selectedorder={this.state.order}
            selectedlayout={this.state.layout}
            orders={orders}
            boutique={this.props.boutique}
            onChange={this.order.bind(this)} />
        </View>
        <BoutiqueOptions
          user={this.props.user}
          userBoutique={this.props.userBoutique}
          boutique={this.props.route.boutique} />
        <ProfileTabs
          items={boutique}
          selectedTab={this.state.currentTab}
          SetTab={this.SetTab.bind(this)}
          tabs={tabs} />
      </View>
    )
  }

  /**
   * [renderRow description]
   * @param  {[type]} rowData [description]
   * @return {[type]}         [description]
   */
  renderRow(rowData) {
    const props = {
      user: this.props.user,
      boutique: this.props.boutique,
      rowData
    }

    if (rowData.className == "Idea") {
      if (this.state.layout == "listView") {
        const IdeaItem = require('../feed-items/ideas/item').default
        return (<IdeaItem {...props} />)
      } else if (this.state.layout == "gridView") {
        const IdeaCol = require('../feed-items/ideas/col').default
        return (<IdeaCol {...props} />)
      }
    } else if (rowData.className == "Event") {
      if (this.state.layout == "listView") {
        const EventItem = require('../feed-items/events/item').default
        return (<EventItem {...props} />)
      } else if (this.state.layout == "gridView") {
        const EventCol = require('../feed-items/events/col').default
        return (<EventCol {...props} />)
      }
    } else if (rowData.className == "Inspiration") {
      if (this.state.layout == "listView") {
        const InspirationItem = require('../feed-items/inspirations/item').default
        return (<InspirationItem {...props} />)
      } else if (this.state.layout == "gridView") {
        const InspirationCol = require('../feed-items/inspirations/col').default
        return (<InspirationCol {...props} />)
      }
    }
  }

  /**
   * Load more content when the user has reached the end of the scroll view.
   *
   * @return {void}
   */
  onEndReached() {
    if (this.state.hasScrolled && this.data.feedData.length == limit) {
      const offset = this.state.offset + limit
      const dataSource = this.state.dataSource.cloneWithRows(this.data.feedData)

      this.setState({
        offset,
        dataSource
      })
    }
  }

  /**
   * Renders the boutique profile.
   *
   * @return {object} component
   */
  render() {
    if (this.props.isLoading) {
      return (<LoadingView />)
    }

    const boutique = this.props.boutique || this.props.route.boutique

    let listStyles
    if (this.state.layout == "gridView") {
      listStyles = [
        BoutiqueStyles.gridView,
        BaseStyles.col1,
        BaseStyles.lightBg
      ]
    } else {
      listStyles = [
        BoutiqueStyles.listView,
        BaseStyles.col1,
        BaseStyles.whiteBg
      ]
    }

    return (
      <ListView
        style={listStyles}
        dataSource={this.state.dataSource.cloneWithRows(this.props.feedData)}
        renderHeader={this.renderHeader.bind(this)}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.onEndReached.bind(this)}
        onEndReachedThreshold={5}
        onScroll={this.onScroll.bind(this)}
        automaticallyAdjustContentInsets={false} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoutiqueProfile)
