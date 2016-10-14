import React, {
  ListView,
  Component,
  View,
  Text
} from 'react-native'
import _ from 'lodash'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// import IdeaItem from '../components/feed-items/ideas/item'
import InspirationItem from '../components/feed-items/inspirations/item'
// import EventItem from '../components/feed-items/events/item'

import SearchTextInput from '../components/search'
import LoadingView from '../components/loading'

import SearchStyles from '../themes/default/search'
import BaseStyles from '../themes/default/base'

import { getSearchResults } from '../actions/search'

const mapStateToProps = state => ({
  searchResults: state.search.searchResults || [],
  isLoading: state.search.isLoading
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getSearchResults }, dispatch)
}

/**
 * This class handles user searches via Algolia.
 */
class Search extends Component {
  /**
   *
   * @param object props
   * @return void
   */
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      searchQuery: "",
      currentPage: 0,
      dataSource
    }
  }

  /**
   * Render feed row component.
   *
   * @param {object} rowData - data for a single feed row.
   * @return {object} component
   */
  renderRow(rowData) {
    const props = {
      actions: this.props.actions,
      user: this.props.user,
      rowData
    }

    // if (rowData.className == "Idea") {
    //   return (<IdeaItem {...props} />)
    // } else if (rowData.className == "Event") {
    //   return (<EventItem {...props} />)
    // } else if (rowData.className == "Inspiration") {
      return (<InspirationItem {...props} />)
    // }
  }

  /**
   * Load more content when the user has reached the end of the scroll view.
   *
   * @return {void}
   */
  onEndReached() {
    if (this.props.searchResults.length) {
      const indices = [
        {
          name: "inspiration",
          hitsPerPage: 8,
          page: ++this.state.currentPage
        },
        {
          name: "idea",
          hitsPerPage: 4,
          page: ++this.state.currentPage
        }
      ]

      this.props.getSearchResults(this.state.searchQuery, indices)
    }
  }

  /**
   * Sets the current search query state.
   *
   * @param {string} searchQuery - the search query
   * @return {void}
   */
  onSetSearchQuery(searchQuery) {
    this.setState({
      searchQuery,
      currentPage: 0
    })

    if (searchQuery.length) {
      const indices = [
        {
          name: "inspiration",
          hitsPerPage: 8
        },
        {
          name: "idea",
          hitsPerPage: 4
        }
      ]

      this.props.getSearchResults(searchQuery, indices)
    }
  }

  /**
   * Renders the search results.
   *
   * @return {object} component
   */
  getSearchResults() {
    let searchResults = []
    _.times(this.props.searchResults.length, index => {
      _.times(this.props.searchResults[index].hits.length, index2 => {
        searchResults.push(this.props.searchResults[index].hits[index2])
      })
    })

    if (!searchResults.length && this.state.searchQuery.length) {
      component = (
        <View style={[
          BaseStyles.col1,
          BaseStyles.row,
          BaseStyles.centeredCols,
          BaseStyles.verticalCenteredCols
        ]}>
          <Text style={[
            BaseStyles.sansSerifMedium,
            BaseStyles.fontLarge,
            BaseStyles.textLessMuted
          ]}>
            No results found...
          </Text>
        </View>
      )
    } else if (!this.state.searchQuery.length) {
      component = (
        <View style={[
          BaseStyles.col1,
          BaseStyles.row,
          BaseStyles.centeredCols,
          BaseStyles.verticalCenteredCols
        ]}>
          <Text style={[
            BaseStyles.sansSerifMedium,
            BaseStyles.fontLarge,
            BaseStyles.textLessMuted
          ]}>
            Search for something...
          </Text>
        </View>
      )
    } else if (this.props.isLoading) {
      component = (<LoadingView />)
    } else {
      component = (
        <ListView
          style={[
            SearchStyles.listContainer,
            BaseStyles.col1
          ]}
          dataSource={this.state.dataSource.cloneWithRows(searchResults)}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this.onEndReached.bind(this)} />
      )
    }

    return component
  }

  /**
   * Render the search results.
   *
   * @return {object}
   */
  render() {
    return (
      <View style={[
        SearchStyles.container,
        BaseStyles.col1
      ]}>
        <View style={[
          BaseStyles.translucentContainer,
          BaseStyles.paddingVert,
          BaseStyles.paddingHorz
        ]}>
          <SearchTextInput
            searchQuery={this.state.searchQuery}
            onSetSearchQuery={(searchQuery) => this.onSetSearchQuery(searchQuery)} />
        </View>
        {this.getSearchResults()}
      </View>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
