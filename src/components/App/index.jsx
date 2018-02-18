import React from 'react'
import PropTypes from 'prop-types'

import styles from './App.css'

const App = ({ name }) => (
  <div className={styles.flex}>
    <h1 className={styles.words}>{name}</h1>
  </div>
)

App.propTypes = {
  name: PropTypes.string,
}

App.defaultProps = {
  name: 'Hello Everyone!!',
}

export default App
