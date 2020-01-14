export const SET_MOVIES = 'home-reducer/SET_MOVIES'
export const SET_FETCHING = 'home-reducer/SET_FETCHING'


const initialState = {
    movies: [],
    isFetching: false
}

 export const homeReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MOVIES:
            return {
                ...state,
                movies: action.payload.movies
            }
            case SET_FETCHING:
            return {
                ...state,
                isFetching: action.payload.isFetching
            }   
        default: return state;

    }

}
export const setMovies = (movies) => ({type: SET_MOVIES, payload: {movies}})
export const setFetching = (isFetching) => ({type: SET_MOVIES, payload: {isFetching}})

export default homeReducer