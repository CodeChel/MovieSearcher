import React from 'react'
import styles from './Header.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { NavLink } from 'react-router-dom'
import Search from './Search'
import { connect } from 'react-redux'
import { setSearchWord } from '../../redux/home-reducer'
import { loginWithGoogle, logoutUser } from '../../redux/auth-reducer'
import { getUser } from '../../redux/auth-selector'
import Login from './Login'
import SearchFilter from './SearchFilter'
import {getGenres} from '../../redux/movie-reducer'
import { getGenresIsFetch, getGenresSelctor } from '../../redux/movie-selector'

const Header = ({ setSearchWord, loginWithGoogle, user, logoutUser, genres, genresIsFetch, getGenres }) => {

  return <header className={styles.header}>
    <AppBar position="static">
      <Toolbar>
        <NavLink to='/'><span className={styles.homeLink}>MovieSearcher</span></NavLink>
        <Search setSearchWord={setSearchWord} />
        <SearchFilter genres={genres} getGenres={getGenres} genresIsFetch={genresIsFetch}/>
        <Login loginWithGoogle={loginWithGoogle} user={user} logoutUser={logoutUser} />
      </Toolbar>
    </AppBar>
  </header>
}
const mapStateToProps = (state) => (
  {
    user: getUser(state),
    genresIsFetch: getGenresIsFetch(state),
    genres: getGenresSelctor(state)
  }
)

export default connect(mapStateToProps, { setSearchWord, loginWithGoogle, logoutUser, getGenres })(Header)