import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import styles from './MovieCard.module.scss'



const MovieCard = ({ movie }) => {

    return <Card className={styles.card}>

        <CardMedia
            className={styles.media}
            image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            title="Poster"
        />
        <CardContent className={styles.content}>
            <Typography gutterBottom variant="h5" component="h2">
                {movie.original_title}
            </Typography>
            <Typography component="p">{movie.overview}</Typography>
        </CardContent>
        <Button variant="contained" size="small" color="primary">
            Add to Favorites
            </Button>

    </Card>
}
export default MovieCard