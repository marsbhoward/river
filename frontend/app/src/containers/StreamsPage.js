import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../actions/streamActions'
import StreamList from '../components/StreamList'


class StreamsPage extends Component {   
  
  componentDidMount() {
    this.props.fetchStreams()
  }
  
  handleLoading = () => {
    if(this.props.loading) {
      return <div>Loading...</div>
    } else {
      return <StreamList streamInfo={this.props.streamInfo} currentStream={this.props.currentStream} />
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Streams</h1>
        {this.handleLoading()}
      </div>
    );
  }
}



const mapDispatchToProps = state => {
  return {
    streamInfo: state.streams,
    currentStream: state.currentStream,
    loading: state.loading
  }
}

export default connect(mapDispatchToProps, { fetchStreams })(StreamsPage)