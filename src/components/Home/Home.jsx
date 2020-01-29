import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setMoviesThunk, setMMoviesThunk } from '../../redux/home-reducer'
import { getMovies, getIsFetching, getTotalPages, getCurrentPage, getTotalResults, getSearchWord } from '../../redux/home-selector'
import MovieCard from './MovieCard/MovieCard'
import Preloader from '../common/Preloader'
import styles from './Home.module.scss'
import InfiniteScroll from "react-infinite-scroll-component"

const Home = ({ movies, totalResults, searchWord, setMMoviesThunk, totalPages, currentPage, setMoviesThunk }) => {


    useEffect(() => {
        setMoviesThunk()
    }, [setMoviesThunk, searchWord])
    const loadMoreMovies = () => {
        setMMoviesThunk(currentPage + 1)
    }

    return <InfiniteScroll

        dataLength={movies.length}
        next={loadMoreMovies}
        hasMore={totalPages > currentPage}
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
    totalResults: getTotalResults(state),
    searchWord: getSearchWord(state)
})

export default connect(mapStateToProps, {
    setMoviesThunk, setMMoviesThunk
})(Home)