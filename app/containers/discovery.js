import React, {
  Component,
  ListView,
  View,
  Text
} from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getFeed } from '../actions/discovery'
import { subscribe, unsubscribe } from '../actions/subscriptions'

// Components
import IdeaItem from '../components/feed-items/ideas/item'
import InspirationItem from '../components/feed-items/inspirations/item'
import EventItem from '../components/feed-items/events/item'
import LoadingView from '../components/loading'

// Styles
import BaseStyles from '../themes/default/base'

const mapStateToProps = state => ({
  feedData: state.discovery.feedData,
  isLoading: state.discovery.isLoading || state.subscriptions.isLoading,
  messages: state.subscriptions.messages
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ getFeed, subscribe, unsubscribe }, dispatch)
}

/**
 * This class displays the user's feed.
 */
class Discovery extends Component {
  /**
   * Constructor for Discovery list component.
   *
   * @param {object} props - inherited props
   * @return {void}
   */
  constructor(props) {
    super(props)

    const dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    this.state = {
      dataSource,
      offset: 0
    }
  }

  /**
   * Return the feed list from the remote server.
   *
   * @return {void}
   */
  componentDidMount() {
    const userId = this.props.user.objectId
    const offset = this.state.offset

    this.props.getFeed(userId, offset)

    if (userId) {
      this.props.subscribe(userId)
    }
  }

  /**
   * Unsubscribe from channel on unmount.
   *
   * @return {void}
   */
  componentWillUnmount() {
    const userId = this.props.user.objectId

    if (userId) {
      this.props.unsubscribe(userId)
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

    if (rowData.className == "Idea") {
      return (<IdeaItem {...props} />)
    } else if (rowData.className == "Event") {
      return (<EventItem {...props} />)
    } else if (rowData.className == "Inspiration") {
      return (<InspirationItem {...props} />)
    } else {
      return (<View></View>)
    }
  }

  /**
   * Load more content when the user has reached the end of the scroll view.
   *
   * @return {void}
   */
  onEndReached() {
    this.setState({
      offset: ++this.state.offset
    })

    const userId = this.props.user.objectId
    const offset = this.state.offset

    this.props.getFeed(userId, offset)
  }

  /**
   * Render the discovery feed.
   *
   * @return {object} component
   */
  render() {
    if (this.props.isLoading || !this.props.feedData) {
      return (<LoadingView />)
    }

    // onScroll={(e) => console.log(e.nativeEvent.contentOffset)}

    return (
      <ListView
        style={[
          BaseStyles.col1
        ]}
        dataSource={this.state.dataSource.cloneWithRows(this.props.feedData)}
        renderRow={this.renderRow.bind(this)}
        onEndReached={this.onEndReached.bind(this)} />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Discovery)
