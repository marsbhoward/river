import React from 'react';
import logo from'../logo.svg';
import '../index.css';

class StreamList extends React.Component {
  listStreams = () => {
   return this.props.streamInfo.map(stream => <img key={stream.id} className= "stream" src={logo} alt={stream.name} />)
  }

  render() {
    return (
      <div className="streams-list">
        {this.listStreams()}

      </div>
    )
  }
}

export default StreamList;