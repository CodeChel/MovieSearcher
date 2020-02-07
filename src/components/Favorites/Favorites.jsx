import React from 'react'
import { connect } from 'react-redux'
import MovieCard from '../common/MovieCard/MovieCard'
import styles from './Favorites.module.scss'
import { getUser, getMoviesFB } from '../../redux/auth-selector'
import { objIsEmpty } from '../utils/utils'
import { Typography } from '@material-ui/core'

const Favorites = ({ user, moviesF }) => {


    return user === null
        ? <div> Please, login for adding movies to Favorites</div>
        : <>
            <div className={styles.containerText} > <Typography  component="body2" variant="h4"> Hi, <span className={styles.name}>{user.displayName}</span> </Typography></div>
            {objIsEmpty(moviesF) 
                ? <div className={styles.containerText}><Typography component="body2" variant="h5">You haven’t added anything yet...</Typography></div>
                : <div className={styles.container}>
                    {
                        Object.keys(moviesF).sort( (a,b) => 
                        moviesF[a]['atTime'] - moviesF[b]['atTime'])
                        .map(key => <MovieCard
                                            user={user}
                                            styles={styles}
                                            key={key}
                                            movie={moviesF[key]}
                                            moviesF={moviesF} />
                        )
                    }
                </div>
            }
        </>

}




const mapStateToProps = (state) => ({
    user: getUser(state),
    moviesF: getMoviesFB(state)
})

export default connect(mapStateToProps, null)(Favorites)