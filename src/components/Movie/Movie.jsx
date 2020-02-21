import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Preloader from '../common/Preloader'
import styles from './Movie.module.scss'
import { setMovieThunk, resetState, setImagesThunk } from '../../redux/movie-reducer'
import { getMovie, getIsFetching, getSM, getImages, getImagesIsFetch } from '../../redux/movie-selector'
import { withRouter, Route } from 'react-router-dom'
import { compose } from 'redux'
import Container from '@material-ui/core/Container'
import { getUser, getMoviesFB } from '../../redux/auth-selector'
import { addMovieFav, removeMovie, } from '../../redux/auth-reducer'
import Gallery from './Gallery'
import { Switch, useParams } from 'react-router'
import MovieBody from './MovieBody'

const Movie = ({ user, movie, isFetching, setMovieThunk, resetState, 
                setImagesThunk, images, imagesIsFetch,
                 similarMovies,  moviesF,   }) => {

    const filmId = useParams().filmId;
    useEffect(() => {
        setMovieThunk(filmId)
        return () => {
            resetState()
        }
    }, [setMovieThunk, filmId, resetState])

    

    useEffect(() => {
        setImagesThunk(filmId)
    }, [setImagesThunk, filmId])
    

    return <Container maxWidth="lg">
        {isFetching
            ? <Preloader size={60} />
            : <Switch>
                <Route path={`/film/${filmId}/gallery`} render={() => <Gallery filmId={filmId}  images={images} />} />
                <Route  path={`/film/${filmId}`} render={() => <MovieBody user={user} movie={movie} images={images} filmId={filmId} 
                                                                              moviesF={moviesF}  imagesIsFetch={imagesIsFetch} similarMovies={similarMovies} />} 
                />
                
            </Switch>
            }
            
    </Container >


}




const mapStateToProps = (state) => ({
    movie: getMovie(state),
    isFetching: getIsFetching(state),
    similarMovies: getSM(state),
    user: getUser(state),
    moviesF: getMoviesFB(state),
    images: getImages(state),
    imagesIsFetch: getImagesIsFetch(state)
})

export default compose(
    connect(mapStateToProps, 
        { setMovieThunk, resetState, addMovieFav, removeMovie, setImagesThunk }),
    withRouter

)(Movie)