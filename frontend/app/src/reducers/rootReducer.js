import { combineReducers } from "redux";


const rootReducer = combineReducers({
	movies: moviesReducer,
	streams: streamsReducer
});

export default rootReducer;

function streamsReducer  (state = { streams: [], loading: false }, action) {
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

function moviesReducer  (state = { movies: [], loading: false }, action) {
   switch(action.type) {
    case 'LOADING_MOVIES':
      return {
        ...state,
        movies: [...state.movies],
        loading: true
      }
    case 'ADD_MOVIES':
      return {
        ...state,
        movies: action.movies,
        loading: false
      }
    default:
      return state;
  }
}




 
