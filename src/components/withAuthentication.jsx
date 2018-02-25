import React from 'react'
import { connect } from 'react-redux'

import { firebase } from '../firebase'

/**
 * withAuthentication - HOC
 * Will add the functionality to a component that stores a firebase `authUser` into
 * the global redux store.
 * @param  {object} Component [React Component]
 * @return {object}           [HOC React Component]
 */
const withAuthentication = (Component) => {
  class WithAuthentication extends React.Component {

    componentDidMount() {
      const { onSetAuthUser } = this.props
      firebase.auth.onAuthStateChanged((authUser) => {
        onSetAuthUser(authUser)
      })
    }

    render() {
      return (
        <Component />
      )
    }

  } // end class WithAuthentication

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({
      type: 'SET_AUTHUSER',
      authUser,
    }),
  })

  return connect(null, mapDispatchToProps)(WithAuthentication)
}

export default withAuthentication
