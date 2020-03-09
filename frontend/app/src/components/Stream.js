import React, { Component } from 'react';
import logo from'../logo.svg';
import {Link} from 'react-router-dom'


export class Stream extends Component {

  handleOnClick = () => {
    this.setState({
        currentStream: this.props.stream.id
    });
    //returns the selected Stream id to streamsList
    this.props.handler(this.props.stream.id)
 
    }
     


  render() {
    return (
        <Link to={{
          pathname: `/streams/${this.props.stream.name}/movies`,
          state: `hi`
        }}>
          <img onClick={this.handleOnClick} className= "stream" id={this.props.stream.id} alt={this.props.stream.name} src={logo}></img>
        </Link>
    );
  }

};

export default Stream;