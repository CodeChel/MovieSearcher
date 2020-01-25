import React from 'react'
import styles from './Header.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {NavLink} from 'react-router-dom'
import SearchIcon from '@material-ui/icons/Search'
import InputBase from '@material-ui/core/InputBase'


const Header = () => {
    return <header className={styles.header}>
        <AppBar position="static">
        <Toolbar>
          <NavLink to='/'><span className={styles.homeLink}>MovieSearcher</span></NavLink>

          <div className={styles.search}>
            <div className={styles.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              className={styles.inputInput}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </header>
}


export default Header