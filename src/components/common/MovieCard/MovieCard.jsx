import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextTruncate from '../TextTruncate'
import { NavLink } from 'react-router-dom'
import noPoster from '../../../assets/img/no-poster.png'
import { deleteFirebaseItem, addFireBaseItem } from '../../../redux/auth-reducer'

const MovieCard = ({ movie, styles, user, moviesF }) => {



    return <Card className={styles.card}>

        <CardMedia
            className={styles.media}
            image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noPoster}
            title={movie.title}
        />
        <CardContent className={styles.content}>
            <Typography gutterBottom variant="h5" component="h2">
                {movie.original_title}
            </Typography>
            <Typography component="p">
                <TextTruncate text={movie.overview} numberCut={300} />
            </Typography>
        </CardContent>
        <CardActions className={styles.cardActions}>
            {user !== null
                ? moviesF[movie.id]
                    ? <Button  onClick={() => { deleteFirebaseItem(movie) }} className={styles.button} variant="contained" size="small" color="secondary">
                            Remove from Favs
                        </Button>

                    : <Button  onClick={() => { addFireBaseItem(movie) }} className={styles.button} variant="outlined" size="small" color="secondary">
                            Add to Favs
                        </Button>

                : <Button  disabled className={styles.button} variant="contained" size="small" color="secondary">
                        Add to Favs
                  </Button>
            }
            <Button  component={NavLink} to={`/film/${movie.id}`} className={styles.button} variant="contained" size="small" color="primary">
                Show details
            </Button>

        </CardActions>
    </Card>
}
export default MovieCard