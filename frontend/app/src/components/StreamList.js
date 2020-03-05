import React from 'react';
import '../index.css';
import Stream from './Stream';


class StreamList extends React.Component {


  render() {
    console.log(this)      
    const streamsList = this.props.streamInfo.map((stream, index) => {
      return <Stream key={index} stream={stream} />
    })
    
    return (
      <div className="streams-list">
          {streamsList}
      </div>
    )
  }
}

export default StreamList;