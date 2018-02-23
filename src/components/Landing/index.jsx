import React from 'react'
import { Link } from 'react-router-dom'

import * as routes from '../../constants/routes'
import reRouteAuthUsers from '../routeauth'

import styles from './LandingPage.css'
import landingImg from '../../img/landing.png'

const LandingPage = () => (
  <div className={styles.container}>
    <img
      className={styles.landingImg}
      src={landingImg}
      alt='Welcome to moolahlah financial planner.'
    />
    <p className={styles.snippet}>
      Writing out your monthly budget by hand can be a difficult task.
    </p>
    <p className={styles.snippet}>
      <span>Moolahlah</span> makes it better!
    </p>
    <Link to={routes.SIGN_UP} className={styles.signup}>Get Started</Link>
  </div>
)

export default reRouteAuthUsers(LandingPage)
