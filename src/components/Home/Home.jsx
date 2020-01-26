import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setMoviesThunk, setMMoviesThunk } from '../../redux/home-reducer'
import { getMovies, getIsFetching, getTotalPages, getCurrentPage } from '../../redux/home-selector'
import MovieCard from './MovieCard/MovieCard'
import Preloader from '../common/Preloader'
import styles from './Home.module.scss'
import InfiniteScroll from 'react-infinite-scroller'


const Home = ({ movies, isFetching, setMMoviesThunk, totalPages, currentPage, setMoviesThunk }) => {

    //initial set
    useEffect(() => {
        setMoviesThunk()
    }, [setMoviesThunk])
    const loadMoreMovies = () => {
        setMMoviesThunk(currentPage + 1)
    }
    return <InfiniteScroll
        pageStart={0}
        loadMore={loadMoreMovies}
        hasMore={true}
        loader={<Preloader />}
        className={styles.container}

    >


        {movies.map((movie, index) => <MovieCard styles={styles} key={index} movie={movie} />)}


    </InfiniteScroll>


}




const mapStateToProps = (state) => ({
    movies: getMovies(state),
    isFetching: getIsFetching(state),
    totalPages: getTotalPages(state),
    currentPage: getCurrentPage(state)
})

export default connect(mapStateToProps, {
    setMoviesThunk, setMMoviesThunk
})(Home)