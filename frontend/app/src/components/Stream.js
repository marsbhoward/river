import React, { Component } from 'react';
import logo from'../logo.svg';
import {Link} from 'react-router-dom'

class Stream extends Component {

  handleOnClick = () => {
     console.log(this.props.stream.name)
    }
     //this.setstate({stream: this.props.currentStream})


  render() {
    return (
        <Link to={`/streams/${this.props.stream.name}/movies`}>
          <img onClick={this.handleOnClick} className= "stream" id={this.props.stream.name} alt={this.props.stream.name} src={logo}></img>
        </Link>
    );
  }

};

export default Stream;