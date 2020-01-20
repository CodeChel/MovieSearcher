import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunkMiddleware from 'redux-thunk'
import homeReducer from './home-reducer'
import movieReducer from "./movie-reducer"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
    home: homeReducer,
    moviePage: movieReducer
})


 const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))



 export default store