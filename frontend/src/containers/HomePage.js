import React, { useEffect } from 'react';
import { useAuth0 } from "../react-auth0-spa";
import { useHistory } from "react-router-dom";

  const streamsList = [
  {id: 1,name:"netflix"},{id: 2,name:"hulu"},{id: 3,name:"amazon"},
  {id: 4,name:"hbo"},{id: 5,name:"disney"},{id: 6,name:"apple"},
  {id: 7,name:"starz"},{id: 8,name:"dc"},{id: 9,name:"epix"},
  {id: 10,name:"cbs"},{id: 11,name:"shudder"},{id: 12,name:"amc"}
  ]

function HomePage(props) {  
  const { isAuthenticated, loginWithPopup} = useAuth0();
  const { loading, user } = useAuth0();
  const history = useHistory();

  let stlyes = {
    backgroundImage: "url('https://raw.githubusercontent.com/marsbhoward/river-frontend/master/src/streams_logos/streamsBackground.png')",
  }

  function handleClick() {
    history.push("/streams");
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      adapter.createUser(user.email, user.name).then(res => {
        user.id = res.id;
        return getUserStreams(user.id);
      }).then(() => {
        props.userID(user.id);
        history.push('/profile');
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  if (loading) {
    return <div className = "home">Loading...</div>;
  }

 
    return (
    <div>
        <div className = "home" style={stlyes}>
        {!isAuthenticated && (
          <div className = "home-col"> 
          </div>
           )}
           {!isAuthenticated && (
          <div className = "home-col-2"> 
            <h1>Find Your Streams</h1>
            <p> 
              River is the pathway to all of your streaming platforms.
              create an account and you will be able to browse your selected providers 
              movie catalogs, or you can click the streams button to view all available platforms. 
              <br/><br/>Select a movie and you can get the trailer, ratings, and more! 
            </p>
            <div className="home-buttons">
              <button className="btn btn-primary" onClick={() => loginWithPopup({})}>Log in</button>
              <button className="btn btn-secondary" onClick={handleClick}>Streams</button>
            </div>
          </div>
          
        )}    
      </div>
      <div>
         {isAuthenticated && (
            <div className="greeting">
              <h2> Hi {user.name} </h2>
              <h4> Please wait to be redirected </h4>
            </div>
        )}
      </div>
    </div>
    );
  }

  function getUserStreams(userID){
    return Promise.all(
      streamsList.map(stream => adapter.createUserStream(userID, stream.id))
    );
  }

  const adapter = {
    createUser: (email,username) => {
      return fetch(`http://localhost:3001/users`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email, username})
      })
    .then(res => res.json())       
    },

    createUserStream: (user_id,stream_id) => {
      return fetch(`http://localhost:3001/users/${user_id}/user_streams`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({user_id, stream_id})
      })
    .then(resp => resp.json())       
    }
  }



export default HomePage

