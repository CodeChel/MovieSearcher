

import React from 'react'
import { Modal } from '@material-ui/core'
import { withRouter, useHistory } from 'react-router-dom'
import styles from './Gallery.module.scss'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

const GalleryImage = ({ match, images }) => {
    const history = useHistory()

    const id = match.params.imgId
    const urlImg = images[id].file_path
    const goNext = () => {
        history.replace(`${+match.params.imgId + 1}`)
    }
    const goPrev = () => {
        history.replace(`${+match.params.imgId-1}`)
    }

    return <Modal
        className={styles.modal}
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        onClose={() => { history.goBack() }}
    >
        <picture className={styles.imgContainer}>
            {id > 0 && <div onClick={goPrev} role='button' className={styles.btnPrev}><NavigateBeforeIcon className={styles.iconPrev} /></div>}
            <source srcset={`https://image.tmdb.org/t/p/w1280/${urlImg}`} media='(min-width: 1300px)' alt="movie-poste" />
            <source srcset={`https://image.tmdb.org/t/p/w780/${urlImg}`} media='(min-width: 800px)' alt="movie-poste" />
            <img src={`https://image.tmdb.org/t/p/w300/${urlImg}`} alt="movie-poster" />
            {images.length-1 > id && <div role='button' onClick={goNext} className={styles.btnNext}><NavigateNextIcon className={styles.iconNext} /></div>}
        </picture>
    </Modal>
}

export default withRouter(GalleryImage)