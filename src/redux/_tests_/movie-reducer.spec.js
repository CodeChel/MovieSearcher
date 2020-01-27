import * as movieR from '../movie-reducer'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import {getMovie, getSimilarMovie} from '../../api/TMDbAPI'

const initialState = {
    movie: null,
    isFetching: true,
    similarMovies: []
}



describe('Movie app reducer', ()=>{
    it('SET_MOVIE set correct data in state', () => {
        const movie = 1
        const action = {
            type: movieR.SET_MOVIE,
            payload: { movie}
        }



        expect(movieR.movieReducer(initialState, action)).toEqual({
            ...initialState,
            movie: movie
        })
    })
    it('SET_FETCHING set correct data in state', () => {
        const isFetching = true
        const action = {
            type: movieR.SET_FETCHING,
            payload: { isFetching}
        }



        expect(movieR.movieReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: isFetching
        })
    })
    it('RESET should reset state', () => {
 
        const action = {
            type: movieR.RESET
        }
        const prevState = {

        }


        expect(movieR.movieReducer(prevState, action)).toEqual({
            ...initialState
        })
    })

    it('SET_SIMILAR_MOVIES should set correct data in state', () => {
        const data = [1,2,3] 
        const action = {
            type: movieR.SET_SIMILAR_MOVIES,
            payload: {movies: data}
        }
       

        expect(movieR.movieReducer(initialState, action)).toEqual({
            ...initialState,
            similarMovies: data
        })
    })

    it('SET_SIMILAR_MOVIES should set correct data in state', () => {
        const data = [1,2,3] 
        const action = {
            type: movieR.SET_SIMILAR_MOVIES,
            payload: {movies: data}
        }
       

        expect(movieR.movieReducer(initialState, action)).toEqual({
            ...initialState,
            similarMovies: data
        })
    })
})

describe('actions creators', () => {


    it('setMovie: should create action with data', () => {

        const movie = 1
        const expectedAction =
        {
            type: movieR.SET_MOVIE,
            payload: { movie }
        }


        expect(movieR.setMovie(movie)).toEqual(expectedAction)
    })
    it('setFetching should create action with data', () => {

        const isFetching = true
        const expectedAction =
        {
            type: movieR.SET_FETCHING,
            payload: { isFetching }
        }


        expect(movieR.setFetching(isFetching)).toEqual(expectedAction)
    })
    it('resetState should create correct action', () => {

        const expectedAction =
        {
            type: movieR.RESET,
        }


        expect(movieR.resetState()).toEqual(expectedAction)
    })

    it('setSimilarMovies should create correct action with data', () => {

        const movies = [1,2,3]
        const expectedAction =
        {
            type: movieR.SET_SIMILAR_MOVIES,
            payload: { movies }
        }


        expect(movieR.setSimilarMovie(movies)).toEqual(expectedAction)
    })

})

jest.mock('../../api/TMDbAPI.jsx')
const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)
describe('auth async actions ', () => {
    it('setMovieThunk async thunk should dispatch async actions', async () => {

        const store = mockStore({})
        const response = {
            data: 1,
            status: 200,
        }
        const responseSimilar = {
                  data: {
                        results: [1,2,3]
                  },
              status: 200,
           }
                
      getSimilarMovie.mockResolvedValueOnce(responseSimilar)
      getMovie.mockResolvedValueOnce(response)
 

        const expectedActions = [
            {
                type: movieR.SET_FETCHING,
                payload: {isFetching: true}
            },
            {
                type: movieR.SET_MOVIE,
                payload: {movie: response.data }
            },
            {
                type: movieR.SET_SIMILAR_MOVIES,
                payload: {movies: responseSimilar.data.results }
            },
            {
                type: movieR.SET_FETCHING,
                payload: {isFetching: false}
            }
        ]
        const storeActions = store.getActions()
        await store.dispatch(movieR.setMovieThunk())
        expect(storeActions).toEqual(expectedActions)
      
    })
 
})