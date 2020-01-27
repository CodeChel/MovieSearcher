import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setMoviesThunk, setMMoviesThunk } from '../../redux/home-reducer'
import { getMovies, getIsFetching, getTotalPages, getCurrentPage, getTotalResults } from '../../redux/home-selector'
import MovieCard from './MovieCard/MovieCard'
import Preloader from '../common/Preloader'
import styles from './Home.module.scss'
import InfiniteScroll from "react-infinite-scroll-component"

const Home = ({ movies, totalResults, setMMoviesThunk, totalPages, currentPage, setMoviesThunk }) => {
  

    useEffect(() => {
        setMoviesThunk()
    }, [])
    const loadMoreMovies = () => {
        setMMoviesThunk(currentPage + 1)
    }

    return <InfiniteScroll

        dataLength={movies.length}
        next={loadMoreMovies}
        hasMore={Math.ceil(totalResults/20) <= totalPages }
        className={styles.scrollContainer}
        loader={<Preloader size={60} />}
        scrollThreshold={0.95}
    >
        <div className={styles.container}>
            {movies.map((movie, index) => <MovieCard styles={styles} key={index} movie={movie} />)}
        </div>
    </InfiniteScroll>
}




const mapStateToProps = (state) => ({
    movies: getMovies(state),
    isFetching: getIsFetching(state),
    totalPages: getTotalPages(state),
    currentPage: getCurrentPage(state),
    totalResults: getTotalResults(state)
})

export default connect(mapStateToProps, {
    setMoviesThunk, setMMoviesThunk
})(Home)