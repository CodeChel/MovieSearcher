import * as homeR from '../home-reducer'

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import expect from 'expect'
const initialState = {
    movies: [],
    isFetching: false
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
})