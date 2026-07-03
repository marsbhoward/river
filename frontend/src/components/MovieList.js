import React from 'react';
import '../index.css';
import Movie from './Movie';
import InfoPage from '../containers/InfoPage'
import {withRouter} from 'react-router-dom';

class MovieList extends React.Component {

  constructor(props){
    super(props)
    this.state = {clicked: false, currentMovie: null}
  }

  handler = (movie) => {
    this.setState({
      currentMovie: movie,
      clicked: true
    })
  }

  handleBack = () => {
    this.setState({clicked: false, currentMovie: null})
  }

  render() {
    if (this.state.clicked) {
      return (
        <div>
          <button className="btn btn-secondary back-button" onClick={this.handleBack}>&larr; Back to browsing</button>
          <InfoPage currentMovie={this.state.currentMovie}/>
        </div>
      )
    }

    const moviesList = this.props.movieCards.map((movie, index) => (
      <Movie key={index} movie={movie} handler={this.handler}/>
    ))

    return (
      <div className="movie-grid">
          {moviesList}
      </div>
    )
  }
}

export default withRouter(MovieList);
