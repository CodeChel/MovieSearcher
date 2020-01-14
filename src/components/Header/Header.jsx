import React from 'react'
import styles from './Header.module.css'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'


const Header = () => {
    return <header className={styles.header}>
        <AppBar position="static">
        <Toolbar>
          
        </Toolbar>
      </AppBar>
    </header>
}


export default Header