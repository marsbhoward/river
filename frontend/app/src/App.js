import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import StreamsPage from './containers/StreamsPage';
import MoviesPage from './containers/MoviesPage';
import './index.css';


class App extends Component {  
  //binds passed handler to App handler
  constructor(props){
    super(props)
    this.handler = this.handler.bind(this)
    this.state = {
      currentStream: localStorage.currentStream
    }

  }
// recieves id from passed handler and sets as state   
  handler = id => {
    this.setState({
      currentStream: id
    }, function () {
      localStorage.setItem( 'currentStream', id )
    })
  }

  //function to accecpt params and save it to state 
  
  render() {
    return (
      <Router>
        <div>
          <Route path="/" render={() => <div className="banner"> rIVer</div>} />
          
          <Route exact path='/streams' render={() => <StreamsPage handler={this.handler} />}  />
          <Route exact path='/streams/:id/movies' render={() => <MoviesPage handler= {this.state.currentStream}/>} />
        </div>
      </Router>
    );
  }
}

export default App;