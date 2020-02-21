import React from 'react'
import Preloader from '../common/Preloader'
import styles from './Gallery.module.scss'
import { Route, useHistory, NavLink } from 'react-router-dom'
import GalleryImage from './GalleryImage'
import WithLinkMUI from '../common/WithLinkMUI'


const GalleryPreview = ({  images, imagesIsFetch,  filmId }) => {
   
    const history = useHistory()
    

    return <div>
        <Route path={`/film/${filmId}/image/:imgId`} render={() => <GalleryImage  images={images} />} />
        {imagesIsFetch
            ? <Preloader size={60} />
            : <> <div className={styles.headerGallery}>
                        <h4 className={styles.imgGallery}>Images gallery</h4>
                        <WithLinkMUI to={`${filmId}/gallery`}>Show Full Gallery</WithLinkMUI>
                 </div>
                <div className={styles.gallery}>
                    {
                        images.slice(0, 4).map((i, index) => {
                            return <picture className={styles.picture}>
                                <img className={styles.image} onClick={() => {
                                    history.push(`${filmId}/image/` + index)
                                }} alt='movie' key={index} src={`https://image.tmdb.org/t/p/w500/${i.file_path}`} />
                            </picture>
                        })

                    }</div>
                </>
        }

    </div>
}



export default GalleryPreview