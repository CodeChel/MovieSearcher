import React, {useEffect} from 'react'
import './App.css'
import { connect, Provider } from 'react-redux'
import { withRouter, HashRouter, Route } from 'react-router-dom'
import store from './redux/redux-store'
import { compose } from 'redux'
import Header from './components/Header/Header'
import { Switch } from 'react-router'
import Home from './components/Home/Home.jsx'
import Movie from './components/Movie/Movie'
import { StylesProvider } from '@material-ui/core/styles'
import {verifyAuth} from './redux/auth-reducer'
import { getIsVerifying } from './redux/auth-selector'
import Preloader from './components/common/Preloader'

const App = ({verifyAuth, ...props}) => {
  useEffect(()=>{
    verifyAuth()
  },[verifyAuth])

  return (
    props.isVerifying 
    ? <Preloader/>
    : <>
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

const mapStateToProps = (state) => ({
  isVerifying: getIsVerifying(state)
})
const AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {verifyAuth}))(App)


const HightApp = () => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default HightApp;
