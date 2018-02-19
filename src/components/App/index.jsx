import React, { Fragment } from 'react'
import {
  HashRouter as Router,
  Route,
} from 'react-router-dom'

import Header from '../Header'
import LandingPage from '../LandingPage'

import * as routes from '../../constants/routes'

const App = () => (
  <Router>
    <Fragment>

      <Header />

      <Route
        exact
        path={routes.LANDING}
        component={() => <LandingPage />}
      />

    </Fragment>
  </Router>
)

export default App
