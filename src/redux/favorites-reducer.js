

import { db } from '../firebase/firebase'
import firebase from 'firebase'
const databaseRef = db.ref()

const usersFS = databaseRef.child('users');

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
    movies: [],
    isAddingMovie: false,
    movieAddError: false,
    isDeletionMovie: false,
    isDeletionError: false,
    isSettingMovies: false,
    isSettingMoviesErr: false
}

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MOVIE_REQUEST:
            return {
                ...state,
                isAddingMovie: true
            }
        case ADD_MOVIE_SUCCESS:
            return {
                ...state,
                movies: [
                    ...state.movies,
                    action.payload.movie
                ]
            }
        case ADD_MOVIE_FAILURE:
            return {
                ...state,
                movieAddError: true
            }
        case DELETE_MOVIE_REQUEST:
            return {
                ...state,
                isDeletionMovie: true
            }
        case DELETE_MOVIE_SUCCESS:
            return {
                ...state,
                movies: state.movies.filter(m => m !== action.payload.movie)
            }
        case DELETE_MOVIE_FAILURE:
            return {
                ...state,
                isDeletionError: true
            }
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

    db.collection('users').doc(`${userId}/movies/`)
    .onSnapshot( doc => {
        dispatch(getMovies(doc.data()))
    })
}

export const addMovieThunk = (userId, movieId) => async (dispatch) => {
        const user = firebase.auth().currentUser
        if (user != null) {
            const uid = user.uid
            const doc = db.collection('users/').doc(`${uid}/movies/`)
            const temp = doc.get().then(res => res.data())

            if (temp) { //проверяем если есть уже закладки
                doc.set(Object.assign({}, temp, { [movieId]: movieId }));  //добавляем новую закладку к существующим
            } else {
                doc.set({ [movieId]: movieId }) // добавляем новую закладку если их вапще нет
            }
        }
    }


export default favoritesReducer