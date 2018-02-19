import React from 'react'

import styles from './LandingPage.css'
import landingImg from '../../img/landing.png'

const LandingPage = () => (
  <div className={styles.container}>
    <img
      className={styles.landingImg}
      src={landingImg}
      alt='Welcome to moolahlah financial planner.'
    />
  </div>
)

export default LandingPage
