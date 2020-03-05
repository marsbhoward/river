const PROXY = "https://cors-anywhere.herokuapp.com/";
const streamsAPI = 'http://river-backend.herokuapp.com/streams'
const URL = PROXY + streamsAPI

export const fetchMovies = () => {
	return (dispatch) => {
		dispatch({ type: 'LOADING_MOVIES'})
		fetch(`${URL}/1/movies`).then(response => {
      		return response.json()
    	}).then(responseJSON => {
      		dispatch({ type: 'ADD_MOVIES', movies: responseJSON})
      	
    	})
	}
}