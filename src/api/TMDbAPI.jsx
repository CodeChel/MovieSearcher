import * as axios from 'axios'

const apiKey = 'b3ce68707f91bff40f7a33979b7852ef'
const  baseURL = 'https://api.themoviedb.org/3/'

export const getPopularMovies = (page=1, language='en-US') => {
    return axios.get(`${baseURL}movie/popular?api_key=${apiKey}&language=${language}&page=${page}`).then(res => res)

}

export const getMovie = (movieId, language='en-US') => {
    return axios.get(`${baseURL}movie/${movieId}?api_key=${apiKey}&language=${language}`).then(res => res)

}

export const getSimilarMovie = (movieId, language='en-US') => {
    return axios.get(`${baseURL}movie/${movieId}/similar?api_key=${apiKey}&language=${language}`).then(res => res)

}

export const getSearch = (query='', page=1, language='en-US') => {
    return axios.get(`${baseURL}search/movie?api_key=${apiKey}&language=${language}&query=${query}&page=${page}`)
    .then(res => res)

}