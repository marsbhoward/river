import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movieActions'
import MovieList from '../components/MovieList'

class MoviesPage extends Component {   
  
  componentDidMount() {

  this.props.fetchMovies(this.props.handler)

  }
  
  handleLoading = () => {
    if(this.props.loading) {
      return <div className="state-message">Loading movies...</div>
    } else {
      return <MovieList movieCards={this.props.movieCards}/>
    }
  }

  render() {
    return (
      <div className="App">
        <h2 className="page-title">{this.props.streamName.toUpperCase()}</h2>
        {this.handleLoading()}
      </div>
    );
  }
}



const mapDispatchToProps = state => {
  return {
    movieCards: state.MoviesReducer.movies,
    loading: state.MoviesReducer.loading
  }
}

export default connect(mapDispatchToProps, {fetchMovies})(MoviesPage)