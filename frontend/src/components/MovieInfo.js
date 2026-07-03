import React, { Component } from 'react';

class MovieInfo extends Component {

  render() {
    const currentMovie = this.props.currentMovie
    const videoId = this.props.trailer
    const fullsrc = 'https://www.youtube.com/embed/' + videoId
    const trailerUnavailable = videoId === "kJQP7kiw5Fk"

    const ratings = currentMovie.Ratings.map((rating, index) => (
      <li key={index}>{rating.Source}: {rating.Value}</li>
    ));

    return (
      <div className="movie-detail">
        <h2 className="page-title">{currentMovie.Title}</h2>
        <div className="movie-detail-layout">
          <img className="movie-detail-poster" alt={currentMovie.Title} src={currentMovie.Poster} />
          <div className="movie-detail-meta">
            <h4>Rated</h4>
            <p>{currentMovie.Rated}</p>
            <h4>Year</h4>
            <p>{currentMovie.Year}</p>
            <h4>Genre</h4>
            <p>{currentMovie.Genre}</p>
            <h4>Actors</h4>
            <p>{currentMovie.Actors}</p>
            <h4>Director</h4>
            <p>{currentMovie.Director}</p>
            <h4>Awards</h4>
            <p>{currentMovie.Awards}</p>
            <h4>Ratings</h4>
            <ul className="movie-ratings-list">{ratings}</ul>
            <h4>Plot</h4>
            <p>{currentMovie.Plot}</p>
          </div>
        </div>
        {trailerUnavailable ? (
          <p className="movie-trailer-error">Due to an issue with this site's connection to YouTube, the trailer can't be viewed at this time.</p>
        ) : (
          <iframe title="youtube" className="movie-trailer" id={videoId}
            src={fullsrc}
            frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
          </iframe>
        )}
      </div>
    )
  }
}
export default MovieInfo;
