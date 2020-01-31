import React from 'react'
import styles from './Header.module.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import {NavLink} from 'react-router-dom'
import Search from './Search'
import { connect } from 'react-redux'
import {setSearchWord} from '../../redux/home-reducer'
import { Button } from '@material-ui/core'
import myFirebase from '../../firebase/firebase'
import firebase from 'firebase'

const Header = ({setSearchWord}) => {
   const authenticate = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    firebase.auth().signInWithPopup(provider)
      .then(result => {
        console.log(result);
      })
  }
    return <header className={styles.header}>
        <AppBar position="static">
        <Toolbar>
          <NavLink to='/'><span className={styles.homeLink}>MovieSearcher</span></NavLink>
          <Search setSearchWord={setSearchWord}/>
          <Button onClick={authenticate} >Test </Button>
        </Toolbar>
      </AppBar>
    </header>
}


export default connect(null, {setSearchWord})(Header)