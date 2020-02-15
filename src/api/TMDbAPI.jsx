import * as axios from 'axios'

const apiKey = 'b3ce68707f91bff40f7a33979b7852ef'
const  baseURL = 'https://api.themoviedb.org/3/'





// export const getPopularMovies = (page=1, language='en-US') => {
//     return axios.get(`${baseURL}movie/popular?api_key=${apiKey}&language=${language}&page=${page}`).then(res => res)

// }

export const getMovieDiscover = ({sort_by, asc, page=1, primary_release_year, vote_average, with_genres, language='en-US'}) =>{
    const sort  = sort_by + (asc ? '.desc' : '.asc')
    const release = primary_release_year.trim()
    const rating =  vote_average.trim()
    return axios.get(`${baseURL}discover/movie?api_key=${apiKey}
    &language=${language}
    &sortBy=${sort}&page=${page}
    ${release.length>0 ? '&primary_release_year='+ release : ''}
    ${rating.length>0 ? '&vote_average='+rating : ''}
    ${with_genres.length>0 ? 'with_genres='+with_genres : '' }`)
    .then(res => res)
}

export const getMovie = (movieId, language='en-US') => {
    return axios.get(`${baseURL}movie/${movieId}?api_key=${apiKey}&language=${language}`).then(res => res)

}

export const getSimilarMovie = (movieId, language='en-US') => {
    return axios.get(`${baseURL}movie/${movieId}/similar?api_key=${apiKey}&language=${language}`).then(res => res)

}

export const getSearcMovies = (query='', page=1, language='en-US') => {
    return axios.get(`${baseURL}search/movie?api_key=${apiKey}&language=${language}&query=${query}&page=${page}`)
    .then(res => res)
}

export const getGenresList = (language='en-US') => {
    return axios.get(`${baseURL}genre/movie/list?api_key=${apiKey}&language=${language}`)
    .then(res => res) 
}