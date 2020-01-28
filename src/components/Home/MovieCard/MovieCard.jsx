import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextTruncate from '../../common/TextTruncate'
import {NavLink} from 'react-router-dom'
import noPoster from '../../../assets/img/no-poster.png'

const MovieCard = ({ movie, styles }) => {
 
    return <Card className={styles.card}>

        <CardMedia
            className={styles.media}
            image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : noPoster}
            title={movie.title}
        />
        <CardContent className={styles.content}>
            <Typography gutterBottom variant="h5" component="h2">
                {movie.original_title }
            </Typography>
            <Typography component="p">
                <TextTruncate text={movie.overview} numberCut={300} />
            </Typography>
        </CardContent>
        <CardActions className={styles.cardActions}>
            <Button className={styles.button} variant="contained" size="small" color="primary">
                Add to Favorites
            </Button>
            <Button component={NavLink}  to={`/film/${movie.id}`} className={styles.button} variant="contained" size="small" color="secondary">
               Show details
            </Button>
           
        </CardActions>
    </Card>
}
export default MovieCard