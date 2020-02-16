import {getMovie, getSimilarMovie} from '../api/TMDbAPI'

export const SET_MOVIE = 'movie-reducer/SET_MOVIE'
export const SET_FETCHING = 'movie-reducer/SET_FETCHING'
export const RESET = 'movie-reducer/RESET'
export const SET_SIMILAR_MOVIES = 'movie-reducer/SET_SIMILAR_MOVIES'


const initialState = {
    movie: null,
    isFetching: true,
    similarMovies: [],
    genresIsFetch: false
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
            case SET_SIMILAR_MOVIES:
                return{
                    ...state,
                    similarMovies: action.payload.movies
                }           
            case  RESET:
                return initialState
        default: return state;

    }

}

export const setMovie = (movie) => ({type: SET_MOVIE, payload: {movie}})
export const setFetching = (isFetching) => ({type: SET_FETCHING, payload: {isFetching}})
export const resetState = () => ({type: RESET})
export const setSimilarMovie = (movies) => ({type: SET_SIMILAR_MOVIES, payload: {movies}})




export const setMovieThunk = (movieId, language='en-US') => async(dispatch) =>{
    dispatch(setFetching(true))
    
    const response = await getMovie(movieId, language)
    
    if(response.status === 200) {
        dispatch(setMovie(response.data))
        const responseSimilar = await getSimilarMovie(movieId, language)

        if(responseSimilar.status === 200) {
            dispatch(setSimilarMovie(responseSimilar.data.results))
        }
        dispatch(setFetching(false))
    }

 }


export default movieReducer