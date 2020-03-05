import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import StreamsPage from './containers/StreamsPage';

class App extends Component {   
  
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route path='/streams' render={() => <StreamsPage />} />
        </div>
      </Router>
    );
  }
}

export default App;