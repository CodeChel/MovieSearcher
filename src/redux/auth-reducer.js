
import firebase from 'firebase'
import { db } from '../firebase/firebase'

export const LOGIN_REQUEST = "auth-reducer/LOGIN_REQUEST"
export const LOGIN_SUCCESS = "auth-reducer/LOGIN_SUCCESS"
export const LOGIN_FAILURE = "auth-reducer/LOGIN_FAILURE"

export const LOGOUT_REQUEST = "auth-reducer/LOGOUT_REQUEST"
export const LOGOUT_SUCCESS = "auth-reducer/LOGOUT_SUCCESS"
export const LOGOUT_FAILURE = "auth-reducer/LOGOUT_FAILURE"

export const VERIFY_REQUEST = "auth-reducer/VERIFY_REQUEST"
export const VERIFY_SUCCESS = "auth-reducer/VERIFY_SUCCESS"

export const GET_MOVIES_SUCCESS = "auth-reducer/GET_MOVIES_SUCCESS"

const initialState = {
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    logoutError: false,
    isAuthenticated: false,
    user: null,
    movies: {}
}


export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoggingIn: true,
                loginError: false
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: true,
                user: action.payload.user
            }
        case LOGIN_FAILURE:
            return {
                ...state,
                isLoggingIn: false,
                isAuthenticated: false,
                loginError: true
            }
        case LOGOUT_REQUEST:
            return {
                ...state,
                isLoggingOut: true,
                logoutError: false
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isLoggingOut: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAILURE:
            return {
                ...state,
                isLoggingOut: false,
                logoutError: true
            }
        case VERIFY_REQUEST:
            return {
                ...state,
                isVerifying: true,
                verifyingError: false
            }
        case VERIFY_SUCCESS:
            return {
                ...state,
                isVerifying: false
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

export const getMovies = (movies) => ({ type: GET_MOVIES_SUCCESS, payload: { movies } })

const requestLogin = () => {
    return {
        type: LOGIN_REQUEST
    };
};

const receiveLogin = user => {
    return {
        type: LOGIN_SUCCESS,
        payload: { user }
    };
};

const loginError = () => {
    return {
        type: LOGIN_FAILURE
    };
};

const requestLogout = () => {
    return {
        type: LOGOUT_REQUEST
    };
};

const receiveLogout = () => {
    return {
        type: LOGOUT_SUCCESS
    };
};

const logoutError = () => {
    return {
        type: LOGOUT_FAILURE
    };
};

const verifyRequest = () => {
    return {
        type: VERIFY_REQUEST
    };
};

const verifySuccess = () => {
    return {
        type: VERIFY_SUCCESS
    };
}



export const loginWithGoogle = () => async dispatch => {
    dispatch(requestLogin())
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')
    try {
        const result = await firebase.auth().signInWithPopup(provider)
        dispatch(receiveLogin(result.user))
        await dispatch(getMoviesFavOnce())
        dispatch(addMoviesListener())
    } catch (error) {
        dispatch(loginError())
    }
}

export const logoutUser = () => async dispatch => {
    dispatch(requestLogout())
    try {
        await firebase.auth().signOut()
        dispatch(receiveLogout())
    } catch (error) {
        dispatch(logoutError())
    }
}

export const verifyAuth = () => async dispatch => {
    dispatch(verifyRequest());
    firebase
        .auth()
        .onAuthStateChanged(async user => {
            if (user !== null) {
                await dispatch(receiveLogin(user))
                await dispatch(getMoviesFavOnce())
                dispatch(addMoviesListener())
            }
            dispatch(verifySuccess())
        })
}

export const getMoviesFavOnce = () => async dispatch => {
    const userId = firebase.auth().currentUser.uid
    const moviesColl = db.collection('users').doc(`${userId}`).collection('movies')
    const doc = await moviesColl.get()
    const documents = {}

    doc.forEach(doc => {
        documents[doc.id] = doc.data()
    })
    dispatch(getMovies(documents))
}
export const addMoviesListener = () => dispatch => {
    const userId = firebase.auth().currentUser.uid
    const moviesColl = db.collection('users').doc(`${userId}`).collection('movies')


    moviesColl.onSnapshot(async doc => {
        const moviesDocs = await moviesColl.get()
        const documents = {}

        moviesDocs.forEach(doc => {
            documents[doc.id] = doc.data()
        })
        dispatch(getMovies(documents))
    })

}
export const addMovieFav = movie => async dispatch => {


    

    try {
        await addFireBaseItem(movie)
        dispatch(getMoviesFavOnce())
    } catch (err) {
        console.log(err)
    }
    
    
}
export const deleteFirebaseItem = async movie => {
    const userId = firebase.auth().currentUser.uid
    await db.collection('users').doc(`${userId}`).collection('movies').doc(`${movie.id}`).delete()
}
export const addFireBaseItem = async movie => {
    const userId = firebase.auth().currentUser.uid

    await db.collection('users').doc(`${userId}`).collection('movies').doc(`${movie.id}`).set({
        ...movie,
        atTime: Date.now()
    })
}
export const removeMovie = movie => async dispatch => {
    

    try {
        await deleteFirebaseItem(movie)
        dispatch(getMoviesFavOnce())
    } catch (err) {
        console.log(err)
    }

}



export default authReducer