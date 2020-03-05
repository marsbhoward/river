import React from 'react';
import '../index.css';
import Movie from './Movie';

class MovieList extends React.Component {


  render() {
    //console.log(this)      
    //const streamsList = this.props.streamInfo.map((stream, index) => {
    //  return <Stream key={index} stream={stream} />
    //})
    
    return (
      <div className="movies-list">
        <h1>Movies</h1>
      </div>
    )
  }
}

export default MovieList;