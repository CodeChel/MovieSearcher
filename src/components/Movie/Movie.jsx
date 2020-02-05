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
import SimilarMovieCard from './SimilarMovieCard'
import { Typography, Button } from '@material-ui/core'
import noPoster from '../../assets/img/no-poster.png'
import { getUser } from '../../redux/auth-selector'

const Movie = ({ user, movie, isFetching, setMovieThunk, resetState, setSimMovieThunk, similarMovies, ...props }) => {

    useEffect(() => {
        setMovieThunk(props.match.params.filmId)
        return () => {
            resetState()
        }
    }, [setMovieThunk, props.match.params.filmId, resetState])
    return <Container maxWidth="lg">
        {isFetching
            ? <Preloader size={60} />
            : <>
                <div className={styles.container}>
                    <div className={styles.poster}>
                        <img
                            src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noPoster}
                            alt='poster' />
                        <Button fullWidth={true} 
                                disabled={user === null}
                                variant="contained" size="large" color="primary">
                                Add to Favorites
                        </Button>
                    </div>
                    <div className={styles.details}>
                        <Typography variant="h4" gutterBottom component="h4">
                            {movie.title}
                        </Typography>
                        <TableDescription movie={movie} />
                        <div className={styles.overview}>
                            <Typography gutterBottom variant="body1">
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

                            {similarMovies.slice(0, 10).map((movie) => {
                                return <SimilarMovieCard styles={styles} movie={movie} key={movie.id} />
                            })}
                        </div>
                    </div>
                }
            </>}
    </Container >


}




const mapStateToProps = (state) => ({
    movie: getMovie(state),
    isFetching: getIsFetching(state),
    similarMovies: getSM(state),
    user: getUser(state)
})

export default compose(
    connect(mapStateToProps, { setMovieThunk, resetState }),
    withRouter

)(Movie)