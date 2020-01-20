import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../common/Preloader'
import styles from './Movie.module.scss'
import {setMovieThunk} from '../../redux/movie-reducer'
import { getMovie, getIsFetching } from '../../redux/movie-selector'
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

const Movie = ({ movie, isFetching, setMovieThunk, ...props}) => {

    useEffect(() => {
        if (movie === null) setMovieThunk(props.match.params.filmId)
    }, [movie, setMovieThunk, props.match.params.filmId])
    return isFetching
        ? <Preloader />
        : <div>

        </div>
}




const mapStateToProps = (state) => ({
    movie: getMovie(state),
    isFetching: getIsFetching(state)
})

export default compose(
    connect(mapStateToProps, {setMovieThunk}),
    withRouter

    )
    (Movie)