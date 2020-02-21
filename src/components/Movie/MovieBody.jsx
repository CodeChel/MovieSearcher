
import React from 'react'
import styles from './Movie.module.scss'
import TableDescription from './TableDescription'
import SimilarMovieCard from './SimilarMovieCard'
import { Typography, Button } from '@material-ui/core'
import noPoster from '../../assets/img/no-poster.png'
import { deleteFirebaseItem, addFireBaseItem } from '../../redux/auth-reducer'
import GalleryPreview from './GalleryPreview'






const MovieBody = ({ user, movie, images, imagesIsFetch,
                     similarMovies, moviesF, filmId }) => {


    return <>
        <div className={styles.container}>
            <div className={styles.poster}>
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noPoster}
                    alt='poster' />
                {user !== null
                    ? <div className={styles.buttonContainer}>
                        {moviesF[movie.id]
                            ?
                            <Button fullWidth={true} onClick={() => { deleteFirebaseItem(movie) }}
                                variant="contained" size="large" color='secondary'>
                                Remove from favorites
                            </Button>

                            : <Button fullWidth={true} onClick={() => { addFireBaseItem(movie) }}
                                variant="outlined" size="large" color="secondary">
                                Add to Favorites
                              </Button>
                        }
                    </div>

                    : <Button fullWidth={true} disabled alt='need login for favor list'
                        variant="outlined" size="large" color="secondary">
                        Add to Favorites
                      </Button>
                }
            </div>
            <div className={styles.details}>
                <Typography variant="h4" gutterBottom component="h4" className={styles.movieName}>
                    {movie.title}
                </Typography>
                <GalleryPreview   images={images} filmId={filmId} imagesIsFetch={imagesIsFetch} />
                <TableDescription movie={movie} />
                <div className={styles.overview}>
                    <Typography gutterBottom variant="body1">
                        {movie.overview}
                    </Typography>
                </div>
            </div>
        </div>
        {
            similarMovies.length > 0 &&
            <div className={styles.containerSimilar}>
                <Typography className={styles.simillar} variant="h4" gutterBottom component="h4">
                    Similar Movies
                </Typography>
                <div className={styles.movieList}>

                    {similarMovies.slice(0, 10).map((movie) => {
                        return <SimilarMovieCard styles={styles} movie={movie} key={movie.id} />
                    })}
                </div>
            </div>
        }
    </>
}


export default MovieBody