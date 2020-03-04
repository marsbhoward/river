const streamsReducer = (state = { streams: [], loading: false }, action) => {
   switch(action.type) {
    case 'LOADING_STREAMS':
      return {
        ...state,
        streams: [...state.streams],
        loading: true
      }
    case 'ADD_STREAMS':
      return {
        ...state,
        streams: action.streams,
        loading: false
      }
    default:
      return state;
  }
}
 
export default streamsReducer;