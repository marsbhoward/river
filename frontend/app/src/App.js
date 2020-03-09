import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import StreamsPage from './containers/StreamsPage';
import MoviesPage from './containers/MoviesPage';



class App extends Component {  
  //binds passed handler to App handler
  constructor(props){
    super(props)

    this.handler = this.handler.bind(this)
  }
// recieves id from passed handler and sets as state   
  handler = id => {
    this.setState({
      currentStream: id
    }, function () {
      console.log(this.state.currentStream);
    })
    
    
  } 
  
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" render={() => <div>Home</div>} />
          <Route exact path='/streams' render={() => <StreamsPage handler={this.handler} />} />
          <Route exact path='/streams/:id/movies' render={() => <MoviesPage handler= {this.state.currentStream} />} />
        </div>
      </Router>
    );
  }
}

export default App;