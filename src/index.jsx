import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import styles from './index.css'

ReactDOM.render(
  <Router>
    <h1 className={styles.test}>It&#39;s Working!</h1>
  </Router>,
  document.getElementById('root'),
)
