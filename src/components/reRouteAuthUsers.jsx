import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import * as routes from '../constants/routes'
import { firebase } from '../firebase'

const reRouteAuthUsers = (Component) => {
  class ReRouteAuthUsers extends React.Component {

    constructor(props) {
      super(props)
      const { onSetAuthUser, history } = props
      firebase.auth.onAuthStateChanged((authUser) => {
        onSetAuthUser(authUser)
        history.push(routes.MY_BUDGET)
      })

    }

    render() {
      return (
        <Component />
      )
    }
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({
      type: 'SET_AUTHUSER',
      authUser,
    }),
  })

  return compose(
    withRouter,
    connect(null, mapDispatchToProps),
  )(ReRouteAuthUsers)

}

export default reRouteAuthUsers
