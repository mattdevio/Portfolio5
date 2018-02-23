import React from 'react'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import Header from '../Header'
import LandingPage from '../Landing'
import SignUpPage from '../SignUp'
import MyBudgetPage from '../MyBudget'
import SignInPage from '../SignIn'
import ForgotPasswordPage from '../ForgotPassword'
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
        path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />

      <Route
        exact
        path={routes.FORGOT_PASSWORD}
        component={() => <ForgotPasswordPage />}
      />

      <Route
        exact
        path={routes.MY_BUDGET}
        component={() => <MyBudgetPage />}
      />

      <p className={styles.footer}>
        By: <a className={styles.me} href='https://github.com/mattgreenberg'>Matthew Greenberg</a>
      </p>

    </div>
  </Router>
)

export default withAuthentication(App)
