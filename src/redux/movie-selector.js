export const getMovie = (state) => {
    return state.moviePage.movie
}

export const getIsFetching = (state) => {
    return state.moviePage.isFetching
}

export const getSM = (state) => {
    return state.moviePage.similarMovies
}


