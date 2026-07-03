import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTrailers } from '../actions/trailerActions'
import MovieInfo from '../components/MovieInfo';

class InfoPage extends Component {  
  
  componentDidMount() {
  	this.fetchTrailer()
  }

  componentDidUpdate(prevProps){
  	if (this.props.currentMovie.Title !== prevProps.currentMovie.Title)
  	{
  		this.fetchTrailer()
  	}
  }

  fetchTrailer = () => {
  	this.props.fetchTrailers(this.props.currentMovie.Title,this.props.currentMovie.Year)
  }

  handler = () => {
    this.props.fetchTrailers(this.props.currentMovie.Title)
  }

  handleLoading = () => {
    if(this.props.loading)
    {
      return <div className="state-message">Loading movie...</div>
    }
    else {
      return <MovieInfo currentMovie={this.props.currentMovie} trailer={this.props.trailer} handler={this.handler}/>
    }
  }

  render() {
    return (
    	this.handleLoading()
 	);
  }
}

const mapDispatchToProps = state => {
  return {
    trailer: state.TrailersReducer.trailer,
    loading: state.TrailersReducer.loading
  }
}

export default connect(mapDispatchToProps, {fetchTrailers})(InfoPage)