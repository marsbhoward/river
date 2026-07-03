import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { withRouter } from 'react-router-dom'

const NavBar = withRouter(({ history }) => {
  const { isAuthenticated, logout } = useAuth0();

  return (
    <nav className="nav-bar">
      <span className="nav-brand" onClick={() => { history.push('/') }}>
        RIVER
      </span>

      <div className="nav-links">
        {isAuthenticated && <span className="nav-link" onClick={() => { history.push('/profile') }}>Profile</span>}
        {isAuthenticated && <span className="nav-link" onClick={() => { history.push('/userstreams') }}>Streams</span>}
        {isAuthenticated && <span className="nav-link nav-link-logout" onClick={() => logout({ returnTo: 'https://river-wheat.vercel.app/' })}>Log Out</span>}
      </div>
    </nav>
  );
});

export default NavBar;
