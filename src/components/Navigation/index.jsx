import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import {
  NavLink,
  withRouter,
} from 'react-router-dom'

import { auth } from '../../firebase'
import styles from './Navigation.css'
import * as routes from '../../constants/routes'

/**
 * Navigation - React Component
 * @param  {object} props.authUser [The authUser from redux store]
 */
const Navigation = ({ authUser }) => (
  <ul className={styles.container}>
    {
      authUser ?
        <AuthNav /> :
        <NoAuthNav />
    }
  </ul>
)

/**
 * WayLink - React Component
 * @param  {object} props.to       [The route 'to' direct a user on click]
 * @param  {object} props.children [The children of the component]
 */
const WayLink = ({ to, children }) => (
  <NavLink exact to={to} className={styles.link} activeClassName={styles.active}>
    {children}
  </NavLink>
)

/**
 * NoAuthNav - React Component
 * The links for an un-authorized user
 */
const NoAuthNav = () => (
  <Fragment>
    <WayLink to={routes.LANDING}>Home</WayLink>
    <WayLink to={routes.SIGN_IN}>Sign In</WayLink>
  </Fragment>
)

/**
 * AuthNav - React Component
 * The links for an authorized user
 */
const AuthNav = () => (
  <Fragment>
    <WayLink to={routes.MY_BUDGET}>My Budget</WayLink>
    <SignOutButton />
  </Fragment>
)

/**
 * SignOutButton - React Component
 * The signout authorized user button
 */
const SignOutButton = () => (
  <button
    type='button'
    onClick={auth.doSignOut}
    className={styles.signoutbtn}
  >
    Sign Out
  </button>
)

// map authUser from redux store to the Navigation props
const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
})

export default withRouter(connect(mapStateToProps)(Navigation))
