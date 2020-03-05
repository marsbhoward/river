import React, { Component } from 'react';
import logo from'../logo.svg';

class Movie extends Component {

  handleOnClick = () => {
     console.log(this.props.stream.name)
    }
     //this.setstate({stream: this.props.currentStream})


  render() {
    return (
        <img onClick={this.handleOnClick} className= "stream" id={this.props.stream.name} alt={this.props.stream.name} src={logo}>
        </img>
      
    );
  }

};

export default Movie;