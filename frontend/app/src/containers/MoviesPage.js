import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '../actions/movieActions'
import MovieList from '../components/MovieList'


class MoviesPage extends Component {   
  
  componentDidMount() {
    this.props.fetchMovies()
  }
  
  handleLoading = () => {
    if(this.props.loading) {
      return <div>Loading Movies...</div>
    } else {
      return <MovieList movieCard={this.props.movieCard}/>
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Movies Page</h1>
        {this.handleLoading()}
      </div>
    );
  }
}



const mapDispatchToProps = state => {
  return {
    streamInfo: state.streams,
    currentStream: state.currentStream,
    loading: state.loading
  }
}

export default connect(mapDispatchToProps, { fetchMovies })(MoviesPage)