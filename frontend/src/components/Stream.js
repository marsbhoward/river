import React, { Component } from 'react';
import netflix from'../streams_logos/netflix.png';
import hulu from'../streams_logos/hulu.png';
import amazon from'../streams_logos/amazon.png';
import hbo from'../streams_logos/hbo.png';
import disney from'../streams_logos/disney.png';
import starz from'../streams_logos/starz.png'
import dc from'../streams_logos/dc.png'
import apple from'../streams_logos/apple.png'
import epix from'../streams_logos/epix.png'
import cbs from'../streams_logos/cbs.png'
import shudder from'../streams_logos/shudder.png'
import amc from'../streams_logos/amc.png'
import logo from'../logo.png'
import {Link} from 'react-router-dom'

const STREAM_LOGOS = {
  netflix, hulu, amazon, hbo, disney, starz, dc, apple, epix, cbs, shudder, amc,
};

export class Stream extends Component {

  handleOnClick = () => {
    //returns the selected Stream id to streamsList
    this.props.handler(this.props.stream.id,this.props.stream.name)
    }


  render() {
    const streamSrc = STREAM_LOGOS[this.props.stream.name] || logo;
    if (this.props.stream.name){
      return (
          <Link className="stream-tile" to={`/streams/${this.props.stream.name}/movies`}>
            <img onClick={this.handleOnClick} className="stream-tile-logo" id={this.props.stream.id} alt={this.props.stream.name} src={streamSrc}></img>
          </Link>
      );
    }
  }

};

export default Stream;
