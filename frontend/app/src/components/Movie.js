import React, { Component } from 'react';
import logo from'../logo.svg';

class Movie extends Component {

  handleOnClick = () => {
     console.log(this.props.movie)
    }
     //this.setstate({stream: this.props.currentStream})




  render() {
    return (
        <img onClick={this.handleOnClick} className= "movie" id={this.props.movie} alt={this.props.movie.title} src={logo}>
        </img>
      
    );
  }

};

export default Movie;