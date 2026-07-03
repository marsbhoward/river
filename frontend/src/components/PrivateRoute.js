import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth0 } from '../react-auth0-spa';

// Wraps Route so that pages depending on a logged-in user (e.g. anything
// reading localStorage.currentUserID) redirect to the homepage instead of
// breaking when hit directly by a logged-out user.
const PrivateRoute = ({ render, exact, path }) => {
  const { loading, isAuthenticated } = useAuth0();

  return (
    <Route
      exact={exact}
      path={path}
      render={props => {
        if (loading) return null;
        return isAuthenticated ? render(props) : <Redirect to="/" />;
      }}
    />
  );
};

export default PrivateRoute;
