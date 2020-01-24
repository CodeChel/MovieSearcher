import React from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActionArea from '@material-ui/core/CardActionArea'
import { Typography } from '@material-ui/core'
import TextTruncate from '../common/TextTruncate'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router-dom'


const SimilarMovieCard = ({ movie, styles }) => {
    const history = useHistory()

    return <Card className={styles.card} onClick={() => {
        history.push('/film/' + movie.id)
   }}>
        <CardActionArea className={styles.actionArea}>
        <CardMedia
                className={styles.media}
                image={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                title={movie.title}
            />
        <CardContent className={styles.content}>
            <Typography  variant="h6" gutterBottom component="h5">
                {movie.original_title}
            </Typography>
            <Typography variant="body2" component="p">
                <TextTruncate text={movie.overview} numberCut={300} />
            </Typography>
        </CardContent>
        </CardActionArea>
            
   

    </Card>
}
export default SimilarMovieCard