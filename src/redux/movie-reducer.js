import {getMovie} from '../api/TMDbAPI'

export const SET_MOVIE = 'movie-reducer/SET_MOVIE'
export const SET_FETCHING = 'movie-reducer/SET_FETCHING'


const initialState = {
    movie: null,
    isFetching: true
}

 export const movieReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MOVIE:
            return {
                ...state,
                movie: action.payload.movie
            }
            case SET_FETCHING:
                return {
                    ...state,
                    isFetching: action.payload.isFetching
                }       
        default: return state;

    }

}
export const setMovie = (movie) => ({type: SET_MOVIE, payload: {movie}})
export const setFetching = (isFetching) => ({type: SET_FETCHING, payload: {isFetching}})

export const setMovieThunk = (movieId, language='en-US') => async(dispatch) =>{
    dispatch(setFetching(true))
    
    const response = await getMovie(movieId, language)
    
    if(response.status === 200) {
        dispatch(setMovie(response.data))
        console.log(response.data)
        dispatch(setFetching(false))
    }
 }


export default movieReducer