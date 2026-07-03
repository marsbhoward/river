import React, { Component } from 'react';

class Movie extends Component {

  handleOnClick = () => {
    this.props.handler(this.props.movie);
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    const title = this.props.movie.Title
    if (!title) {
      return "";
    }
    return (
      <div className="movie-tile" onClick={this.handleOnClick}>
        <img id={title} alt={title} src={this.props.movie.Poster} />
      </div>
    );
  }

};

export default Movie;
