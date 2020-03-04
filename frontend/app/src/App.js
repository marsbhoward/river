import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from './actions/streamActions'
import StreamList from './components/StreamList'

class App extends Component {   
  
  componentDidMount() {
    console.log(this.props)
    this.props.fetchStreams()
  }
  
  handleLoading = () => {
    console.log(this.props.loading)
    if(this.props.loading) {
      return <div>Loading...</div>
    } else {
      return <StreamList streamInfo={this.props.streamInfo} />
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
    loading: state.loading
  }
}

export default connect(mapDispatchToProps, { fetchStreams })(App)