
export const getMovies = (state) => {
    return  state.home.movies
}
export const getIsFetching = (state) => {
    return  state.home.isFetching
}
export const getTotalPages = (state) => {
    return  state.home.totalPages
}
export const getCurrentPage = (state) => {
    return  state.home.currentPage
}
export const getTotalResults = (state) => {
    return  state.home.totalResults
}
export const getSearchWord = (state) => {
    return  state.home.searchWord
}

export const getSearchOptions = (state) =>{
    return state.home.searchOptions
}

export const getGenresSelctor = (state) =>{
    return state.home.genres
}

export const getGenresIsFetch = (state) =>{
    return state.home.genresIsFetch
}
