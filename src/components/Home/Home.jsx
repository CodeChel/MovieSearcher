import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setMoviesThunk, setMMoviesThunk } from '../../redux/home-reducer'
import { getMovies, getIsFetching, getTotalPages, getCurrentPage, getTotalResults, getSearchWord } from '../../redux/home-selector'
import MovieCard from './MovieCard/MovieCard'
import Preloader from '../common/Preloader'
import styles from './Home.module.scss'
import InfiniteScroll from "react-infinite-scroll-component"
import { getUser } from '../../redux/auth-selector'
import {getMoviesThunkF, addMovieThunk} from '../../redux/favorites-reducer'
import {getMoviesFav} from '../../redux/favorites-selector'

const Home = ({ movies, getMoviesThunkF, searchWord, setMMoviesThunk, 
                 favorites, totalPages, currentPage, setMoviesThunk, user}) => {


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
            {movies.map((movie, index) => <MovieCard 
                                            getMoviesThunkF={getMoviesThunkF}  
                                            user={user} 
                                            styles={styles} 
                                            key={index} 
                                            movie={movie} 
                                            favorites={favorites} 
                                            addMovieThunk={addMovieThunk}
                                            />)}
        </div>
    </InfiniteScroll>
}




const mapStateToProps = (state) => ({
    movies: getMovies(state),
    isFetching: getIsFetching(state),
    totalPages: getTotalPages(state),
    currentPage: getCurrentPage(state),
    totalResults: getTotalResults(state),
    searchWord: getSearchWord(state),
    user: getUser(state),
    favorites: getMoviesFav(state)
})

export default connect(mapStateToProps, {
    setMoviesThunk, setMMoviesThunk, getMoviesThunkF, addMovieThunk
})(Home)