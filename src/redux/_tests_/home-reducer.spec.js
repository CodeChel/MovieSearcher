import * as homeR from '../home-reducer'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
import {getPopularMovies} from '../../api/TMDbAPI'

const initialState = {
    movies: [],
    isFetching: false,
    totalPages: 0,
    currentPage: 1
}



describe('Home app reducer', ()=>{
    it('SET_MOVIES set correct data in state', () => {
        const movies = [1,2,3]
        const action = {
            type: homeR.SET_MOVIES,
            payload: { movies}
        }



        expect(homeR.homeReducer(initialState, action)).toEqual({
            ...initialState,
            movies: movies
        })
    })
    it('SET_FETCHING set correct data in state', () => {
        const isFetching = true
        const action = {
            type: homeR.SET_FETCHING,
            payload: { isFetching}
        }



        expect(homeR.homeReducer(initialState, action)).toEqual({
            ...initialState,
            isFetching: isFetching
        })
    })
    it('SET_CURRENT_PAGE set correct data in state', () => {
        const currentPage = 2
        const action = {
            type: homeR.SET_CURRENT_PAGE,
            payload: {currentPage}
        }



        expect(homeR.homeReducer(initialState, action)).toEqual({
            ...initialState,
            currentPage: currentPage
        })
    })
    it('SET_TOTAL_PAGES set correct data in state', () => {
        const totalPages = 2
        const action = {
            type: homeR.SET_TOTAL_PAGES,
            payload: {totalPages}
        }



        expect(homeR.homeReducer(initialState, action)).toEqual({
            ...initialState,
            totalPages: totalPages
        })
    })
})
describe(' actions creators', () => {


    it('setMovies: should create action with data', () => {

        const movies = [1,2,3]
        const expectedAction =
        {
            type: homeR.SET_MOVIES,
            payload: { movies }
        }


        expect(homeR.setMovies(movies)).toEqual(expectedAction)
    })

    it('setFetching: should create action', () => {

        const isFetching = true
        const expectedAction =
        {
            type: homeR.SET_FETCHING,
            payload: { isFetching }
        }


        expect(homeR.setFetching(isFetching)).toEqual(expectedAction)

    })

    it('setCurrentPage: should create action', () => {

        const currentPage = 1
        const expectedAction =
        {
            type: homeR.SET_CURRENT_PAGE,
            payload: { currentPage }
        }


        expect(homeR.setCurrentPage(currentPage)).toEqual(expectedAction)

    })
    it('setTotalPage: should create action', () => {

        const totalPages = 10
        const expectedAction =
        {
            type: homeR.SET_TOTAL_PAGES,
            payload: { totalPages }
        }


        expect(homeR.setTotalPage(totalPages)).toEqual(expectedAction)

    })
})

jest.mock('../../api/TMDbAPI.jsx')
const middlewares = [thunk]

const mockStore = configureMockStore(middlewares)
describe('auth async actions ', () => {
    it('setMoviesThunk async thunk should dispatch async actions', async () => {

        const store = mockStore({})
        const response = {
            data:{
                page: 1,
                total_pages: 500,
                results: [1,2,3]

            },
            status: 200,
        }
        
        getPopularMovies.mockResolvedValueOnce(response)
 

        const expectedActions = [
            {
                type: homeR.SET_FETCHING,
                payload: {isFetching: true}
            },
            {
                type: homeR.SET_MOVIES,
                payload: {movies: response.data.results }
            },
            {
                type: homeR.SET_CURRENT_PAGE,
                payload: {currentPage: response.data.page }
            },
            {
                type: homeR.SET_TOTAL_PAGES,
                payload: {totalPages: response.data.total_pages }
            },
            {
                type: homeR.SET_FETCHING,
                payload: {isFetching: false}
            }
        ]
        const storeActions = store.getActions()
        await store.dispatch(homeR.setMoviesThunk())
        expect(storeActions).toEqual(expectedActions)
      
    })
})