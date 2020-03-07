const PROXY = "https://cors-anywhere.herokuapp.com/";
const streamsAPI = 'http://river-backend.herokuapp.com/streams'
const URL = PROXY + streamsAPI
let i = 0
let movielist = []


//	fetch(`http://www.omdbapi.com/?t=${movie}+&apikey=6b46131b`).then(response => {

export const fetchMovies = () => {
	return (dispatch) => {
		dispatch({ type: 'LOADING_MOVIES'})
		fetch(`${URL}/1/movies`).then(response => {
      		return response.json()
    	}).then(responseJSON => {
    		Promise.all(
    			responseJSON.map(
    				title => fetch(`http://www.omdbapi.com/?t=${title}+&apikey=6b46131b`)
    				.then(resp => {
    					return resp.json()
    				})
    			)
    			).then(listOfMovies => {
    			dispatch({ type: 'ADD_MOVIES', movies: listOfMovies})	
    			})
    		
    	})
	}
}



