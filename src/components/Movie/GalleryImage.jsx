

import React from 'react'
import { Modal, IconButton } from '@material-ui/core'
import { withRouter, useHistory, useParams } from 'react-router-dom'
import styles from './Gallery.module.scss'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const GalleryImage = ({  images }) => {

    const history = useHistory()
    const imgId = useParams().imgId
    const urlImg = images[imgId].file_path
    

    const goNext = () => {
        history.replace(`${+imgId + 1}`)
    }
    const goPrev = () => {
        history.replace(`${+imgId- 1}`)
    }

    
    React.useEffect(()=>{
        const handleSlider = (e) =>{
            if(images.length - 1 > imgId && e.keyCode === 39)  goNext()
            if(imgId > 0 && e.keyCode === 37)  goPrev()
        }
        document.addEventListener('keydown', handleSlider)
        return ()=>{
            document.removeEventListener('keydown', handleSlider)
        }
    })
    
    
    

    return <Modal
        className={styles.modal}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        onClose={() => { history.goBack() }}
    >
        <picture className={styles.imgContainer}>
            {imgId > 0 && <IconButton onClick={goPrev} role='button' className={styles.btnPrev}><NavigateBeforeIcon className={styles.iconPrev} /></IconButton>}
            <source srcset={`https://image.tmdb.org/t/p/w1280/${urlImg}`} media='(min-width: 1300px)' alt="movie-poste" />
            <source srcset={`https://image.tmdb.org/t/p/w780/${urlImg}`} media='(min-width: 800px)' alt="movie-poste" />
            <img src={`https://image.tmdb.org/t/p/w300/${urlImg}`} alt="movie-poster" />
            {images.length - 1 > imgId && <IconButton onClick={goNext} className={styles.btnNext}><NavigateNextIcon className={styles.iconNext} /></IconButton>}
        </picture>
    </Modal>
}

export default withRouter(GalleryImage)