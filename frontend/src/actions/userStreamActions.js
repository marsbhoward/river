const userStreamsAPI = 'http://localhost:3001/users/'

export const fetchUserStreams = (userID) => {
	const streamURL = `${userStreamsAPI}${userID}/user_streams`
	return (dispatch) => {
		dispatch({ type: 'LOADING_STREAMS'})
		fetch(streamURL).then(response => {
      		return response.json()
    	}).then(responseJSON => {
      		dispatch({ type: 'ADD_STREAMS', streams: responseJSON})
    	})
	}
}