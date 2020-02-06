import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setMoviesThunk, setMMoviesThunk } from '../../redux/home-reducer'
import {  getIsFetching, getTotalPages, getCurrentPage, getTotalResults, getSearchWord } from '../../redux/home-selector'
import MovieCard from './MovieCard/MovieCard'
import Preloader from '../common/Preloader'
import styles from './Home.module.scss'
import { getUser, getMoviesFB } from '../../redux/auth-selector'
import { objIsEmpty } from '../../utils/utils'

const Home = ({   user, moviesF }) => {


      return  user === null
      ?    <div> Please, login for adding movies to Favorites</div>
      :    objIsEmpty 
          ? <div>You haven’t added anything yet ..</div>
          : <div className={styles.container}>
            {
                moviesF.map(
                    movie => <MovieCard
                                        user={user}
                                        styles={styles}
                                        key={movie.id}
                                        movie={movie}
                                        moviesF={moviesF}/>
                    )
            }
        </div>

}




const mapStateToProps = (state) => ({
    isFetching: getIsFetching(state),
    totalPages: getTotalPages(state),
    currentPage: getCurrentPage(state),
    totalResults: getTotalResults(state),
    searchWord: getSearchWord(state),
    user: getUser(state),
    moviesF: getMoviesFB(state)
})

export default connect(mapStateToProps, {
    setMoviesThunk, setMMoviesThunk
})(Home)