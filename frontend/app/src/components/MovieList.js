import React from 'react';
import '../index.css';
import Movie from './Movie';


class MovieList extends React.Component {


  render() {
    console.log(this)      
    const moviesList = this.props.movieCards.map((movie, index) => {
      return <Movie key={index} movie={movie} />
    })
    
    return (
      <div className="movie-list">
          {moviesList}
      </div>
    )
  }
}

export default MovieList;