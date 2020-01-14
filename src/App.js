import React from 'react'
import logo from './logo.svg'
import './App.css'
import Button from '@material-ui/core/Button'
import { connect, Provider } from 'react-redux'
import { withRouter, HashRouter, Route, Redirect } from 'react-router-dom'
import store from './redux/redux-store'
import { compose } from 'redux'
import Header from './components/Header/Header'

const App = () => {
  return (
    
    <Header/>
  )
}

const mapStateToPropse = (state) => (
  {

  }
)

const AppContainer = compose(
  withRouter,
  connect(mapStateToPropse))(App)


const HightApp = () => {
  return <HashRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </HashRouter>
}

export default HightApp;
