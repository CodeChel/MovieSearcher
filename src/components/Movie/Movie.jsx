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
import { Typography, Button } from '@material-ui/core'

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
                <div className={styles.poster}>
                    <img 
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt='poster' />
                    <Button fullWidth={true}
                     variant="contained" size="large" color="primary">Add to Favorites</Button>
                </div>
                <div className={styles.details}>
                    <Typography variant="h4" gutterBottom component="h4">
                        {movie.title}
                     </Typography>
                    <TableDescription movie={movie} />
                    <div className={styles.overview}>
                        <Typography  gutterBottom variant="body1">
                            {movie.overview}
                        </Typography>
                    </div>
                </div>
            </div>
            {similarMovies.length > 0 &&
                <div className={styles.containerSimilar}>
                    <Typography variant="h4" gutterBottom component="h4">
                        Similar Movies
                     </Typography>
                    <div className={styles.movieList}>

                        {similarMovies.slice(0, 10).map((movie, index) => {
                            return <SimilarMovieCard styles={styles} movie={movie} key={movie.id} />
                        })}
                    </div>
                </div>
            }
        </Container >
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