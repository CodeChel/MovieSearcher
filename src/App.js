import React, {useEffect} from 'react'
import logo from './logo.svg'
import './App.css'
import Button from '@material-ui/core/Button'
import { connect, Provider } from 'react-redux'
import { withRouter, HashRouter, Route, Redirect } from 'react-router-dom'
import store from './redux/redux-store'
import { compose } from 'redux'
import Header from './components/Header/Header'
import { Switch } from 'react-router'
import Home from './components/Home/Home.jsx'
import Movie from './components/Movie/Movie'
import { StylesProvider } from '@material-ui/core/styles'
import {verifyAuth} from './redux/auth-reducer'

const App = (props) => {
  useEffect(()=>{
    props.verifyAuth()
  })

  return (
    <>
      <StylesProvider injectFirst>
        <Header />
        <Switch>
          <Route exact path='/' render={() => <Home />} />
          <Route path='/film/:filmId' render={() => <Movie />} />
          <Route path='*' render={() => <div> 404 not found </div>} />
        </Switch>
      </StylesProvider>
    </>
  )
}


const AppContainer = compose(
  withRouter,
  connect(null, {verifyAuth}))(App)


const HightApp = () => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default HightApp;
