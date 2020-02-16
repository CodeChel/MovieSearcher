import { getSearcMovies, getMovieDiscover, getGenresList } from '../api/TMDbAPI'

export const SET_MOVIES = 'home-reducer/SET_MOVIES'
export const SET_MORE_MOVIES = 'home-reducer/SET_MORE_MOVIES'

export const SET_FETCHING = 'home-reducer/SET_FETCHING'
export const SET_TOTAL_PAGES = 'home-reducer/SET_TOTAL_PAGE'
export const SET_CURRENT_PAGE = 'home-reducer/SET_CURRENT_PAGE'
export const SET_TOTAL_RESULTS = 'home-reducer/SET_TOTAL_RESULTS'
export const SET_SEARCH_WORD = 'home-reducer/SET_SEARCH_WORD'
export const SET_SEARCH_OPTIONS = 'home-reducer/SET_SEARCH_OPTIONS'
export const SET_GENRES_SUCCESS = 'home-reducer/SET_GENRES_SUCCESS'
export const GENRES_IS_FETCHING = 'home-reducer/GENRES_IS_FETCHING'

const initialState = {
    movies: [],
    searchOptions: {
        with_genres: [],
        sort_by: 'popularity',
        year: '',
        asc: false,
        vote_average: ''
    },
    genres: [],
    genresIsFetch: false,
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
        case SET_SEARCH_OPTIONS:
            return {
                ...state,
                searchOptions: { ...action.payload.options }
            }
        case SET_GENRES_SUCCESS:
            return {
                ...state,
                genres: action.payload.genres
            }
        case GENRES_IS_FETCHING:
            return {
                ...state,
                genresIsFetch: action.payload.isFetching
            }
        default: return state

    }

}
export const setMovies = (movies) => ({ type: SET_MOVIES, payload: { movies } })
export const setMoreMovies = (movies) => ({ type: SET_MORE_MOVIES, payload: { movies } })
export const setTotalResults = (totalRes) => ({ type: SET_TOTAL_RESULTS, payload: { totalRes } })
export const setFetching = (isFetching) => ({ type: SET_FETCHING, payload: { isFetching } })
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, payload: { currentPage } })
export const setTotalPage = (totalPages) => ({ type: SET_TOTAL_PAGES, payload: { totalPages } })
export const setSearchWord = (searchWord) => ({ type: SET_SEARCH_WORD, payload: { searchWord } })
export const setSearchOptions = (options) => ({ type: SET_SEARCH_OPTIONS, payload: { options } })
export const setGenres = (genres) => ({type: SET_GENRES_SUCCESS, payload: {genres}})
export const genresIsFetching = (isFetching) => ({type: GENRES_IS_FETCHING, payload: {isFetching}})

export const setMoviesThunk = (page = 1, language = 'en-US', options) => async (dispatch, getState) => {
    dispatch(setFetching(true))

    const searchWord = getState().home.searchWord.trim()
    const response = searchWord.length > 0 ? await getSearcMovies(searchWord, page, language) : await getMovieDiscover(page, language, options)
    if (response.status === 200) {
        dispatch(page > 1 ? setMoreMovies(response.data.results) : setMovies(response.data.results))
        dispatch(setCurrentPage(page))
        dispatch(setTotalResults(response.data.total_results))
        dispatch(setTotalPage(response.data.total_pages))
        dispatch(setFetching(false))
    }

}

export const getGenres = () => async dispatch =>{
    dispatch(genresIsFetching(true))
    const response = await getGenresList()
    dispatch(setGenres(response.data['genres']))
    dispatch(genresIsFetching(false))
    
}

export default homeReducer