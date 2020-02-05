

import { db } from '../firebase/firebase'
import firebase from 'firebase'

export const ADD_MOVIE_REQUEST = "favorites-reducer/ADD_MOVIE_REQUEST"
export const ADD_MOVIE_SUCCESS = "favorites-reducer/ADD_MOVIE_SUCCESS"
export const ADD_MOVIE_FAILURE = "favorites-reducer/ADD_MOVIE_FAILURE"

export const DELETE_MOVIE_REQUEST = "favorites-reducer/DELETE_MOVIE_REQUEST"
export const DELETE_MOVIE_SUCCESS = "favorites-reducer/DELETE_MOVIE_SUCCESS"
export const DELETE_MOVIE_FAILURE = "favorites-reducer/DELETE_MOVIE_FAILURE"

export const GET_MOVIES_REQUEST = "favorites-reducer/GET_MOVIES_REQUEST"
export const GET_MOVIES_SUCCESS = "favorites-reducer/GET_MOVIES_SUCCESS"
export const GET_MOVIES_FAILURE = "favorites-reducer/GET_MOVIES_FAILURE"


const initialState = {
    movies: {},
    isAddingMovie: false,
    movieAddError: false,
    isDeletionMovie: false,
    isDeletionError: false,
    isSettingMovies: false,
    isSettingMoviesErr: false
}

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_MOVIES_REQUEST:
            return {
                ...state,
                isSettingMovies: true
            }
        case GET_MOVIES_FAILURE:
            return {
                ...state,
                isSettingMoviesErr: true
            }
        case GET_MOVIES_SUCCESS:
            return {
                ...state,
                movies: action.payload.movies
            }
        default:
            return state;
    }
}
export const requestMovies = () => ({ type: GET_MOVIES_REQUEST })
export const moviesError = () => ({ type: GET_MOVIES_FAILURE })
export const getMovies = (movies) => ({ type: GET_MOVIES_SUCCESS, payload: { movies } })

export const addMovie = (movie) => ({ type: ADD_MOVIE_SUCCESS, payload: { movie } })
export const addMovieRequest = () => ({ type: ADD_MOVIE_REQUEST })
export const addMovieError = () => ({ type: ADD_MOVIE_FAILURE })


export const deleteMovieRequest = () => ({ type: DELETE_MOVIE_REQUEST })
export const deleteMovie = (movie) => ({ type: DELETE_MOVIE_SUCCESS, payload: { movie } })
export const deleteMovieError = () => ({ type: DELETE_MOVIE_FAILURE })




export const getMoviesThunkF = (userId) => async (dispatch) => {
    const movies = db.collection('users').doc(`${userId}`).collection('movies').get()
 
    .onSnapshot((doc)=>{
        console.log(doc.data())
        dispatch(getMovies(doc.data()))
    })
   
    }

export const addMovieThunk = (userId, movie) => {
        db.collection('users').doc(`${userId}`).collection('movies')
            .doc(`${movie.id}`).set({
                title: movie.title,
                id: movie.id,
                poster_path: movie.poster_path,
                atTime: Date.now()
            })

    }

    export default favoritesReducer