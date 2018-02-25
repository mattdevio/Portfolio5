import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'

import { firebase } from '../firebase'
import * as routes from '../constants/routes'

/**
 * withAuthorization - HOC (composable)
 * Will add the functionality to restrict page access to authorized users.
 * @param  {function} authCondition [Returns boolean based on conditional page access]
 * @param  {object}   Component     [A React Component]
 * @return {object}                 [HOC React Component]
 */
const withAuthorization = authCondition => (Component) => {
  class WithAuthorization extends React.Component {

    componentDidMount() {
      firebase.auth.onAuthStateChanged((authUser) => {
        if (!authCondition(authUser)) {
          this.props.history.push(routes.SIGN_IN)
        }
      })
    }

    render() {
      return this.props.authUser ? <Component /> : null
    }

  } // end WithAuthorization

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
  })

  return compose(
    withRouter,
    connect(mapStateToProps),
  )(WithAuthorization)
}

export default withAuthorization
