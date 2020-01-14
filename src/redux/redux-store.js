import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunkMiddleware from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const reducers = combineReducers({
  
})


 const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))



 export default store