export const getUser = (state) => {
    return state.auth.user
}

export const getIsVerifying = (state) => {
    return state.auth.isVerifying
}

export const getMoviesFB = (state) => {
    return state.auth.movies
}