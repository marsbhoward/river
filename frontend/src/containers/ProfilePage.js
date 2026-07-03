import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserStreams } from '../actions/userStreamActions'
import Profile from '../components/Profile';
import { Auth0Context } from "../react-auth0-spa";


let selectList = []
class ProfilePage extends Component {
 static contextType = Auth0Context; 

  constructor(props){
    super(props)
    this.state = {
      streamEdit: false
    }
  } 
  
  componentDidMount() {
    this.props.fetchUserStreams(this.props.userId)
  }

  componentDidUpdate(prevProps){
  }

  fetchUserStreams = (id) => {
    this.setState({
      userID: id
    })
  }

  handleLists = (stream) => {
    stream.selected = !stream.selected;

    if(selectList.indexOf(stream) === -1){
      selectList.push(stream)
    }
    else {
      let index = selectList.indexOf(stream);
      selectList.splice(index,1);
    }

    this.forceUpdate()
  }

  handleClick = () => {
    this.setState({
      streamEdit: true
    })
  }

  handleDone = () => {
    this.setState({
      streamEdit: false
    })

    //add method that edits backend here
    selectList.forEach( stream =>{
      adapter.editStream(stream.id,stream.selected,stream.user_id,stream.stream_id).then(data => data)
    })
    if (selectList.length>0){
        alert("changes saved")
    }
    selectList = [];
  }

  handleLoading = (id) => {
    if(this.props.loading) {
      return <div className="state-message">Loading streams...</div>
    } else {
      return <Profile userID={id} userStreams={this.props.userStreams} handleLists={this.handleLists} editClicked={this.state.streamEdit}/>
    }
  }

  scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.scrollTo({ top: 0, behavior: 'smooth' });
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
  }

  render() {
    const { loading, user } = this.context;

    if (loading || !user) {
      return <div className="profile state-message">Loading...</div>;
    }

    return (
      <div className="profile">
        <div className="profile-header">
          <img src={user.picture} alt="Profile" />
          <h2>Hi, {user.name}</h2>
          <p>{user.email}</p>
          {this.state.streamEdit
            ? <button className="btn btn-primary" onClick={this.handleDone}>Done</button>
            : <button className="btn btn-secondary" onClick={this.handleClick}>Edit Streams</button>
          }
        </div>
        {this.handleLoading(this.props.userId)}
        <button className="scroll-to-top-button" onClick={this.scrollToTop} aria-label="Return to top">&#8593;</button>
      </div>
    );
  }
}

  const adapter = {
    editStream: (id,selected,user_id,stream_id) => {
      return fetch(`http://localhost:3001/users/${user_id}/user_streams/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({id,selected,user_id,stream_id}),
        headers: { "Content-Type": "application/json" },
        
      })
    .then(res => res.json())       
    },
  }
const mapDispatchToProps = state => {
  return {
    userStreams: state.StreamsReducer.streams,
    loading: state.StreamsReducer.loading
  }
}


export default connect(mapDispatchToProps, {fetchUserStreams})(ProfilePage)