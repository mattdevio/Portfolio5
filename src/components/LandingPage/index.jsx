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
    <p>
      Writing out your monthly budget by hand can be a difficult task.
    </p>
    <p>
      With <span>moolahlah</span>, you can quickly sort and organize your bills and expenses!
    </p>
  </div>
)

export default LandingPage
