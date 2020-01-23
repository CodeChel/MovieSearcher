import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../common/Preloader'
import styles from './Movie.module.scss'
import { setMovieThunk, resetState } from '../../redux/movie-reducer'
import { getMovie, getIsFetching, getSM } from '../../redux/movie-selector'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import Container from '@material-ui/core/Container'
import TableDescription from './TableDescription'
import MovieCard from '../Home/MovieCard/MovieCard'
import Carousel from 'react-material-ui-carousel'
import SimilarMovieCard from './SimilarMovieCard'

const Movie = ({ movie, isFetching, setMovieThunk, resetState, setSimMovieThunk, similarMovies, ...props }) => {

    useEffect(() => {
        setMovieThunk(props.match.params.filmId)
        return () => {
            resetState()
        }
    }, [setMovieThunk, props.match.params.filmId, resetState])
    return isFetching
        ? <Preloader />
        : <Container maxWidth="lg">
            <div className={styles.container}>
                <img className={styles.poster}
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='poster' />
                <div className={styles.detiles}>
                    <h1>{movie.title}</h1>
                    <TableDescription movie={movie} />
                    <div className={styles.overview}>
                        {movie.overview}
                    </div>
                </div>
            </div>
            {similarMovies.length > 0 &&
                <div className={styles.container}>
                    Similar Movies:
                    <Carousel>
                        {similarMovies.map((movie, index) => {
                               return <SimilarMovieCard styles={styles} movie={movie} key={movie.id} />
                        })}
                    </Carousel>
                </div>
            }
        </Container>
}




const mapStateToProps = (state) => ({
    movie: getMovie(state),
    isFetching: getIsFetching(state),
    similarMovies: getSM(state)
})

export default compose(
    connect(mapStateToProps, { setMovieThunk, resetState }),
    withRouter

)(Movie)