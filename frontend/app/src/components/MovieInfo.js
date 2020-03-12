import React, { Component } from 'react';
class MovieInfo extends Component {
  render() {
  	let currentMovie = this.props.currentMovie
  	const ratings = currentMovie.Ratings.map((rating, index) =>(
  		<li style={{textAlign : 'justify'}} key={index}>| {rating.Source}: {rating.Value} |</li>
 	));
 	
  	console.log(currentMovie.Ratings)
    return (
    	 <div className = "show_Movie" >
        <img className= "selected_Movie" alt={currentMovie.Title} src={currentMovie.Poster}></img>
          <h1> {currentMovie.Title} </h1>
          <h4> Rated: {currentMovie.Rated} </h4> 
          <h4> Genre: {currentMovie.Genre} </h4>
          <h5> Actors: {currentMovie.Actors} </h5>
          <h5> Director: {currentMovie.Director} </h5>
          <h5> Awards: {currentMovie.Awards} </h5>
		  <h4> Ratings <br/>
		  <h5 style={{display: 'inline-flex',margin: 40, listStyle: 'none'}}> {ratings} </h5>
		  </h4>
          <h4> Plot</h4>
          <h5>{currentMovie.Plot} </h5>
          
          
        </div>
    )
  }
}
export default MovieInfo;

