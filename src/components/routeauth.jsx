import React, { Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import * as routes from '../constants/routes'
import { firebase } from '../firebase'
import { byPropKey } from './common'

/**
 * reRouteAuthUsers - HOC
 * Will add the functionality to re-route a user to user protected page if they are
 * already signed in.
 * @param  {object} Component [React Component]
 * @return {object}           [HOC React Component]
 */
const reRouteAuthUsers = (Component) => {
  class RouteAuthUsers extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        visable: false,
      }
    }

    componentWillMount() {
      const { history } = this.props
      // we are garenteed that this event will dispatch when auth is ready
      // regardless of if there is an authUser or not
      this.listener = firebase.auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          history.push(routes.MY_BUDGET)
        } else {
          this.setState(byPropKey('visable', true))
        }
      })
    }

    componentWillUnmount() {
      if (this.listener) {
        this.listener()
        this.listener = null
      }
    }

    render() {
      const { visable } = this.state
      return (
        <Fragment>
          {
            (visable) ?
              <Component /> :
              null
          }
        </Fragment>
      )
    }
  }

  return withRouter(RouteAuthUsers)

}

export default reRouteAuthUsers
