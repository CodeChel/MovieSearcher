import React from 'react'
import styles from './Header.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {NavLink} from 'react-router-dom'


const Header = () => {
    return <header className={styles.header}>
        <AppBar position="static">
        <Toolbar>
          <NavLink to='/'><span className={styles.homeLink}>MovieSearcher</span></NavLink>
        </Toolbar>
      </AppBar>
    </header>
}


export default Header