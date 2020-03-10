import React, { Component } from 'react';
let title

class Movie extends Component {
  handleOnClick = () => {
     console.log(this.props.movie)
     console.log(this)
    }
     //this.setstate({stream: this.props.currentStream})




  render() {
    title = this.props.movie.Title
    if (title){   
      return (
        <img onClick={this.handleOnClick} className= "movie" id={this.props.movie.Title} alt={this.props.movie.Title} src={this.props.movie.Poster}>
        </img>
      
      );
    }
    return (
    ""
    )
  }

};

export default Movie;