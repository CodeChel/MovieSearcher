import React from 'react'
import Preloader from '../common/Preloader'
import styles from './Gallery.module.scss'


const Gallery = ({ id, setImagesThunk, images, imagesIsFetch }) => {
    React.useEffect(() => {
        setImagesThunk(id)
    }, [setImagesThunk, id])

    return <div>
        {imagesIsFetch
            ? <Preloader size={24} />
            : <div className={styles.gallery}>{
                images.slice(0, 4).map((i, index) => {
                    return <picture  className={styles.picture}>
                        <img className={styles.image} alt='movie' key={index} src={`https://image.tmdb.org/t/p/w500/${i.file_path}`} />
                     </picture>
                })
            }</div>}
    </div>
}



export default Gallery