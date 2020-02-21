import React from 'react'
import styles from './Gallery.module.scss'
import { useHistory, Route, Link } from 'react-router-dom'
import GalleryImage from './GalleryImage'
import WithLinkMUI from '../common/WithLinkMUI'

const Gallery = ({ images, filmId }) => {
    const history = useHistory()


    return <div>
        <div className={styles.backBlock}>
            <WithLinkMUI to={`/film/${filmId}`}>Back to Movie</WithLinkMUI >
        </div>
        <div className={styles.galleryFull}>
            {images.map((i, index) => {
                return <img  onClick={() => history.push(`gallery/image/${index}`)} className={styles.albumImg} src={`https://image.tmdb.org/t/p/w300/${i.file_path}`} alt='poster' />
            })
            }
            <Route path={`/film/${filmId}/gallery/image/:imgId`} render={() => <GalleryImage images={images} />} />
        </div>
    </div>
}


export default Gallery