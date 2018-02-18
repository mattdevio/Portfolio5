import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { firebase } from '../firebase'

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

  WithAuthentication.propTypes = {
    onSetAuthUser: PropTypes.func.isRequired,
  }

  const mapDispatchToProps = dispatch => ({
    onSetAuthUser: authUser => dispatch({
      type: 'AUTH_USER_SET',
      authUser,
    }),
  })

  return connect(null, mapDispatchToProps)(WithAuthentication)
}

export default withAuthentication
