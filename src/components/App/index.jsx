import React from 'react'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import Header from '../Header'
import LandingPage from '../LandingPage'

import * as routes from '../../constants/routes'
import styles from './App.css'

const App = () => (
  <Router>
    <div className={styles.flex}>

      <Header />

      <Route
        exact
        path={routes.LANDING}
        component={() => <LandingPage />}
      />

      <p className={styles.footer}>By: Matthew Greenberg</p>

    </div>
  </Router>
)

export default App
