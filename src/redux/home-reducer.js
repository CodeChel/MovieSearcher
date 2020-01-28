import { getPopularMovies, getSearcMovies } from '../api/TMDbAPI'

export const SET_MOVIES = 'home-reducer/SET_MOVIES'
export const SET_MORE_MOVIES = 'home-reducer/SET_MORE_MOVIES'

export const SET_FETCHING = 'home-reducer/SET_FETCHING'
export const SET_TOTAL_PAGES = 'home-reducer/SET_TOTAL_PAGE'
export const SET_CURRENT_PAGE = 'home-reducer/SET_CURRENT_PAGE'
export const SET_TOTAL_RESULTS = 'home-reducer/SET_TOTAL_RESULTS'
export const SET_SEARCH_WORD = 'home-reducer/SET_SEARCH_WORD'

const initialState = {
    movies: [],
    isFetching: false,
    totalPages: 1,
    currentPage: 1,
    totalResults: 0,
    searchWord: ''
}

export const homeReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_MOVIES:
            return {
                ...state,
                movies: action.payload.movies
            }
        case SET_MORE_MOVIES:
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
            return {
                ...state,
                totalPages: action.payload.totalPages
            }
        case SET_TOTAL_RESULTS:
            return {
                ...state,
                totalResults: action.payload.totalRes
            }
        case SET_SEARCH_WORD:
            return {
                ...state,
                searchWord: action.payload.searchWord
            }
        default: return state;

    }

}
export const setMovies = (movies) => ({ type: SET_MOVIES, payload: { movies } })
export const setMoreMovies = (movies) => ({ type: SET_MORE_MOVIES, payload: { movies } })
export const setTotalResults = (totalRes) => ({ type: SET_TOTAL_RESULTS, payload: { totalRes } })
export const setFetching = (isFetching) => ({ type: SET_FETCHING, payload: { isFetching } })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, payload: { currentPage } })
export const setTotalPage = (totalPages) => ({ type: SET_TOTAL_PAGES, payload: { totalPages } })
export const setSearchWord = (searchWord) => ({ type: SET_SEARCH_WORD, payload: { searchWord } })

export const setMoviesThunk = (page = 1, language = 'en-US') => async (dispatch, getState) => {
    dispatch(setFetching(true))

    const searchWord = getState().home.searchWord.trim()
    const response = searchWord.length > 0 ? await getSearcMovies(searchWord, page, language) : await getPopularMovies(page, language)
    if (response.status === 200) {
        dispatch(setMovies(response.data.results))
        dispatch(setCurrentPage(page))
        dispatch(setTotalResults(response.data.total_results))
        dispatch(setTotalPage(response.data.total_pages))
        dispatch(setFetching(false))
    }

}
export const setMMoviesThunk = (page, language = 'en-US') => async (dispatch, getState) => {
    dispatch(setFetching(true))
    const searchWord = getState().home.searchWord.trim()
    const response = searchWord.length > 0 ? await getSearcMovies(searchWord, page, language) : await getPopularMovies(page, language)

    if (response.status === 200) {
        dispatch(setMoreMovies(response.data.results))
        dispatch(setCurrentPage(page))
        dispatch(setTotalResults(response.data.total_results))
        dispatch(setTotalPage(response.data.total_pages))
        dispatch(setFetching(false))
    }




}


export default homeReducer