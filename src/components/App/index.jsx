import React from 'react'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import Header from '../Header'
import LandingPage from '../LandingPage'
import SignUpPage from '../SignUp'
import MyBudget from '../MyBudget'
import withAuthentication from '../withAuthentication'

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

      <Route
        exact
        path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />

      <Route
        exact
        path={routes.MY_BUDGET}
        component={() => <MyBudget />}
      />

      <p className={styles.footer}>
        By: <a className={styles.me} href='https://github.com/mattgreenberg'>Matthew Greenberg</a>
      </p>

    </div>
  </Router>
)

export default withAuthentication(App)
