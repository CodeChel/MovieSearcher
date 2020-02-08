import React from 'react'
import styles from './Header.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {NavLink} from 'react-router-dom'
import Search from './Search'
import { connect } from 'react-redux'
import {setSearchWord} from '../../redux/home-reducer'
import {loginWithGoogle, logoutUser} from '../../redux/auth-reducer'
import { getUser } from '../../redux/auth-selector'
import Login from './Login'
import TuneIcon from '@material-ui/icons/Tune'

const Header = ({setSearchWord, loginWithGoogle, user, logoutUser}) => {
   
    return <header className={styles.header}>
        <AppBar position="static">
        <Toolbar>
          <NavLink to='/'><span className={styles.homeLink}>MovieSearcher</span></NavLink>
          <Search setSearchWord={setSearchWord}/>
          <TuneIcon className={styles.tune}/>
          <Login loginWithGoogle={loginWithGoogle} user={user} logoutUser={logoutUser}/>
        </Toolbar>
      </AppBar>
    </header>
}
const mapStateToProps = (state) => (
  {
    user: getUser(state)
  }
)

export default connect(mapStateToProps, {setSearchWord, loginWithGoogle, logoutUser})(Header)