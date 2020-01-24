import {getPopularMovies} from '../api/TMDbAPI'

export const SET_MOVIES = 'home-reducer/SET_MOVIES'
export const SET_FETCHING = 'home-reducer/SET_FETCHING'
export const SET_TOTAL_PAGES = 'home-reducer/SET_TOTAL_PAGE'
export const SET_CURRENT_PAGE = 'home-reducer/SET_CURRENT_PAGE'

const initialState = {
    movies: [],
    isFetching: false,
    totalPages: 1,
    currentPage: 1
}

  export const homeReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MOVIES:
            return {
                ...state,
                movies: [...state.movies, ...action.payload.movies]
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.payload.isFetching
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.payload.currentPage
            }
        case SET_TOTAL_PAGES:
            return{
                ...state,
                totalPages: action.payload.totalPages
            }             
        default: return state;

    }

}
export const setMovies = (movies) => ({type: SET_MOVIES, payload: {movies}})
export const setFetching = (isFetching) => ({type: SET_FETCHING, payload: {isFetching}})
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, payload: {currentPage}})
export const setTotalPage = (totalPages) => ({type: SET_TOTAL_PAGES, payload: {totalPages}})

export const setMoviesThunk = (page=1, language='en-US') => async(dispatch) =>{
    dispatch(setFetching(true))
    const response = await getPopularMovies(page, language)
    if(response.status === 200){
        dispatch(setMovies(response.data.results))
        dispatch(setCurrentPage(page))
        dispatch(setTotalPage(response.data.total_pages))
        dispatch(setFetching(false))
    }
}

export default homeReducer