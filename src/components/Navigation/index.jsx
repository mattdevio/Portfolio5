import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Navigation.css'
import * as routes from '../../constants/routes'

const Navigation = ({ authUser }) => (
  <ul className={styles.container} >
    {
      authUser ?
        <NavigationAuth /> :
        <NavigationNonAuth />
    }
  </ul>
)

Navigation.propTypes = {
  authUser: PropTypes.shape({}),
}

Navigation.defaultProps = {
  authUser: null,
}

const NavigationAuth = () => (
  <Fragment>
    <li>You Are Authorized</li>
  </Fragment>
)

const NavigationNonAuth = () => (
  <Fragment>
    <li><Link to={routes.LANDING} className={styles.link}>Home</Link></li>
    <li><Link to={routes.SIGN_IN} className={styles.link}>Sign In</Link></li>
  </Fragment>
)

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

export default connect(mapStateToProps)(Navigation)
