import React, { Component } from 'react';
import netflix from'../streams_logos/netflix.png';
import hulu from'../streams_logos/hulu.png';
import amazon from'../streams_logos/amazon.png';
import hbo from'../streams_logos/hbo.png';
import disney from'../streams_logos/disney.png';
import showtime from'../streams_logos/showtime.png';
import logo from'../logo.svg'
import {Link} from 'react-router-dom'

let streamSrc
export class Stream extends Component {

    constructor(props){
    super(props)
    this.state = {
      logo: "",
      currentStream: "" 
    }
  }

  componentDidMount() {
    switch (this.props.stream.name) {
      case "netflix":
        this.setState({logo: netflix})
        break;
      case "hulu":
        this.setState({logo: hulu})
        break;
      case "amazon":
        this.setState({logo: amazon})
        break;
      case "disney":
        this.setState({logo: disney})
        break;
      case "hbo":
        this.setState({logo: hbo})
        break;         
      case "showtime":
        this.setState({logo: showtime})
        break;                               
      default:
        this.setState({logo: logo})
        break;
    }
    console.log(this)
  } 


  handleOnClick = () => {
    this.setState({
        currentStream: this.props.stream.id
    });
    //returns the selected Stream id to streamsList
    this.props.handler(this.props.stream.id)
    console.log(this)
    }
     

  render() {
    streamSrc = this.state.logo
    return (
        <Link to={`/streams/${this.props.stream.name}/movies`}>
          <img onClick={this.handleOnClick} className= "stream" id={this.props.stream.id} alt={this.props.stream.name} src={streamSrc}></img>
        </Link>
    );
  }

};

export default Stream;