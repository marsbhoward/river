import React, { Component } from 'react';
import netflix from '../streams_logos/netflix.png';
import hulu from '../streams_logos/hulu.png';
import amazon from '../streams_logos/amazon.png';
import hbo from '../streams_logos/hbo.png';
import disney from '../streams_logos/disney.png';
import apple from '../streams_logos/apple.png';
import starz from '../streams_logos/starz.png';
import dc from '../streams_logos/dc.png';
import epix from '../streams_logos/epix.png';
import cbs from '../streams_logos/cbs.png';
import shudder from '../streams_logos/shudder.png';
import amc from '../streams_logos/amc.png';
import logo from '../logo.png';
import { Link } from 'react-router-dom';

// Keyed by Stream#id from the backend seed data (db/seeds.rb).
const STREAM_INFO = {
  1: { logo: netflix, name: 'netflix' },
  2: { logo: hulu, name: 'hulu' },
  3: { logo: amazon, name: 'amazon' },
  4: { logo: hbo, name: 'hbo' },
  5: { logo: disney, name: 'disney' },
  6: { logo: apple, name: 'apple' },
  7: { logo: starz, name: 'starz' },
  8: { logo: dc, name: 'dc' },
  9: { logo: epix, name: 'epix' },
  10: { logo: cbs, name: 'cbs' },
  11: { logo: shudder, name: 'shudder' },
  12: { logo: amc, name: 'amc' },
};

export class UserStream extends Component {

  handleOnClick = () => {
    const { name } = STREAM_INFO[this.props.stream.stream_id] || {};
    this.props.handler(this.props.stream.stream_id, name);
  }

  render() {
    const streamId = this.props.stream;
    const { logo: streamLogo, name: streamName } = STREAM_INFO[streamId.stream_id] || { logo, name: '' };

    if (this.props.streamLinks === true) {
      return (
        <Link className="stream-tile" to={`/streams/${streamName}/movies`}>
          <img onClick={this.handleOnClick} className="stream-tile-logo" id={streamId.stream_id} alt={streamName} src={streamLogo}></img>
        </Link>
      );
    }

    const isSelected = this.props.stream.selected === true;
    const editable = this.props.editClicked === true;
    const cardClass = `stream-tile ${isSelected ? 'stream-on' : 'stream-off'}${editable ? ' editable' : ''}`;

    return (
      <div
        className={cardClass}
        id={streamId.stream_id}
        onClick={editable ? () => this.props.handleLists(streamId) : undefined}
      >
        <img className="stream-tile-logo" alt={streamName} src={streamLogo}></img>
        <span className="stream-toggle-light"></span>
      </div>
    );
  }
}

export default UserStream;
