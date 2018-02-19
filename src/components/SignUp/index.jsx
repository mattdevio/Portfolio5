import React, { Component } from 'react'
import {
  withRouter,
} from 'react-router-dom'

import { auth, db } from '../../firebase'
import * as routes from '../../constants/routes'

const SignUpPage = ({ history }) => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>
)

const INITIAL_STATE = {
  displayName: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
}

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

class SignUpForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  onSubmit(event) {
    const {
      displayName,
      email,
      passwordOne,
    } = this.state

    const {
      history,
    } = this.props

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        db.doCreateUser(authUser.uid, displayName)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
            history.push(routes.HOME)
          })
          .catch((error) => {
            this.setState(byPropKey('error', error))
          })
      })
      .catch((error) => {
        this.setState(byPropKey('error', error))
      })

    event.preventDefault()
  }

  render() {
    const {
      displayName,
      // email,
      // passwordOne,
      // passwordTwo,
      // error,
    } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <input
          value={displayName}
          onChange={event => this.setState(byPropKey('displayName', event.target.value))}
          type='text'
          placeholder='Display Name'
        />
        <button type='submit'>
          Sign Up
        </button>
      </form>
    )
  }

} // end SignUpForm class

export default withRouter(SignUpPage)
