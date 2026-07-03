const streamsAPI = 'http://localhost:3001/streams'
const URL = streamsAPI

export const fetchStreams = () => {
	return (dispatch) => {
		dispatch({ type: 'LOADING_STREAMS'})
		fetch(URL).then(response => {
      		return response.json()
    	}).then(responseJSON => {
      		dispatch({ type: 'ADD_STREAMS', streams: responseJSON})
    	})
	}
}