import React from 'react'
import styles from './Header.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {NavLink} from 'react-router-dom'
import Search from './Search'
import { connect } from 'react-redux'
import {setSearchWord} from '../../redux/home-reducer'


const Header = ({setSearchWord}) => {
    return <header className={styles.header}>
        <AppBar position="static">
        <Toolbar>
          <NavLink to='/'><span className={styles.homeLink}>MovieSearcher</span></NavLink>
          <Search setSearchWord={setSearchWord}/>
        </Toolbar>
      </AppBar>
    </header>
}


export default connect(null, {setSearchWord})(Header)