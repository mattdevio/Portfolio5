import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import styles from './Navigation.css'
import * as routes from '../../constants/routes'

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  activeLink: state.visualState.activeLink,
})

const mapDispatchToProps = dispatch => ({
  setActiveLink: activeLink => dispatch({ type: 'SET_ACTIVE_LINK', activeLink }),
})

const Navigation = () => (
  <ul className={styles.container} >
    <NavLink to={routes.LANDING}>Home</NavLink>
    <NavLink to={routes.SIGN_IN}>Sign In</NavLink>
    <NavLink onlyAuth to={routes.DASHBOARD}>Dashboard</NavLink>
  </ul>
)

const NavLink = connect(mapStateToProps, mapDispatchToProps)((props) => {
  const {
    authUser,
    activeLink,
    setActiveLink,
    to,
    onlyAuth,
    children,
  } = props
  if (onlyAuth && !authUser) return null
  const styleString = (to === activeLink) ? `${styles.link} ${styles.isActive}` : styles.link
  return (
    <li>
      <Link to={to} className={styleString} onClick={() => setActiveLink(to)}>{children}</Link>
    </li>
  )
})

export default Navigation
