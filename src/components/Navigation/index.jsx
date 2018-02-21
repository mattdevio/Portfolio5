import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  NavLink,
  withRouter,
} from 'react-router-dom'

import { auth } from '../../firebase'
import styles from './Navigation.css'
import * as routes from '../../constants/routes'

const Navigation = ({ authUser }) => (
  <ul className={styles.container}>
    {
      authUser ?
        <AuthNav /> :
        <NoAuthNav />
    }
  </ul>
)

const WayLink = ({ to, children }) => (
  <NavLink exact to={to} className={styles.link} activeClassName={styles.active}>
    {children}
  </NavLink>
)

const NoAuthNav = () => (
  <Fragment>
    <WayLink to={routes.LANDING}>Home</WayLink>
    <WayLink to={routes.SIGN_IN}>Sign In</WayLink>
  </Fragment>
)

const AuthNav = () => (
  <Fragment>
    <WayLink to={routes.MY_BUDGET}>My Budget</WayLink>
    <SignOutButton />
  </Fragment>
)

const SignOutButton = () => (
  <button
    type='button'
    onClick={auth.doSignOut}
    className={styles.signoutbtn}
  >
    Sign Out
  </button>
)

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

export default withRouter(connect(mapStateToProps)(Navigation))
