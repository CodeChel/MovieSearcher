import React from 'react'
import Preloader from '../common/Preloader'
import styles from './Gallery.module.scss'
import { Route, useHistory, Switch } from 'react-router-dom'
import GalleryImage from './GalleryImage'


const GalleryPreview = ({ id, setImagesThunk, images, imagesIsFetch, match }) => {
    React.useEffect(() => {
        setImagesThunk(id)
    }, [setImagesThunk, id])
    const history = useHistory()

    return <div>
        <Route path={`/film/${match.params.filmId}/image/:imgId`} render={() => <GalleryImage images={images} />} />
        {imagesIsFetch
            ? <Preloader size={24} />
            : <div className={styles.gallery}>
                {
                images.slice(0, 4).map((i, index) => {
                    return <picture className={styles.picture}>
                        <img className={styles.image} onClick={() => {
                            history.push(`${match.params.filmId}/image/` + index)
                        }} alt='movie' key={index} src={`https://image.tmdb.org/t/p/w500/${i.file_path}`} />
                    </picture>
                })

            }</div>}
  
    </div>
}



export default GalleryPreview