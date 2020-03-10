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
      return <div>Loading Movies...</div>
    } else {
      return (
      <div>
      <MovieList movieCards={this.props.movieCards}/>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        {this.handleLoading()}
      </div>
    );
  }
}



const mapDispatchToProps = state => {
  return {
    movieCards: state.MoviesReducer.movies,
    currentStream : state.StreamsReducer.currentStream,
    loading: state.MoviesReducer.loading
  }
}

export default connect(mapDispatchToProps, {fetchMovies})(MoviesPage)