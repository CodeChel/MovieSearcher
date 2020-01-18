import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setMoviesThunk } from '../../redux/home-reducer'
import { getMovies, getIsFetching, getTotalPages, getCurrentPage } from '../../redux/home-selector'
import MovieCard from './MovieCard/MovieCard'
import Preloader from '../common/Preloader'
import styles from './Home.module.scss'

const Home = ({ movies, isFetching, totalPages, currentPage, setMoviesThunk }) => {

    useEffect(() => {
        if (movies.length === 0) setMoviesThunk()
    }, [movies, setMoviesThunk])
    return isFetching
        ? <Preloader />
        : <div className={styles.container}>
            {movies.map((movie, index) => <MovieCard key={index} movie={movie} />)}
        </div>

}




const mapStateToProps = (state) => ({
    movies: getMovies(state),
    isFetching: getIsFetching(state),
    totalPages: getTotalPages(state),
    currentPage: getCurrentPage(state)
})

export default connect(mapStateToProps, {
    setMoviesThunk
})(Home)