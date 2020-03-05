import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import StreamsPage from './containers/StreamsPage';
import MoviesPage from './containers/MoviesPage';


class App extends Component {   
  
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route exact path='/streams' render={() => <StreamsPage />} />
          <Route path='/streams/:id/movies' render={() => <MoviesPage />} />
        </div>
      </Router>
    );
  }
}

export default App;