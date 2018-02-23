import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'recompose'
import { withRouter, Link } from 'react-router-dom'

import { auth } from '../../firebase'
import { byPropKey, FormInput } from '../common'
import styles from './SignIn.css'
import * as routes from '../../constants/routes'
import reRouteAuthUsers from '../routeauth'

const SignInPage = ({ history }) => (
  <div className={styles.container}>
    <h1>Sign In</h1>
    <SignInForm history={history} />
    <hr />
    <span className={styles.orsignup}>
      Not Yet Registered?{' '}
      <Link
        to={routes.SIGN_UP}
        className={styles.signmeup}
      >
        Create Your Account
      </Link>
    </span>
  </div>
)

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
    this.onSubmit = this.onSubmit.bind(this)
  }

  getChildContext() {
    return {
      bubbleState: (propertyName, value) => {
        this.setState(byPropKey(propertyName, value))
      },
    }
  }

  onSubmit(event) {
    event.preventDefault()
    const {
      email,
      password,
    } = this.state

    const {
      history,
    } = this.props

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.MY_BUDGET)
      })
      .catch((error) => {
        this.setState(byPropKey('error', error))
      })
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <FormInput
          propertyName='email'
          value={email}
          type='text'
          label='Email'
        />
        <FormInput
          propertyName='password'
          value={password}
          type='password'
          label='Password'
        />
        <p className={styles.error}>
          { error && `Error: ${error.message}` }
        </p>
        <div className={styles.actions}>
          <Link
            to={routes.FORGOT_PASSWORD}
            className={styles.forgotpswd}
          >
            Forgot Password?
          </Link>
          <button type='submit' className={styles.signin}>
            Sign In
          </button>
        </div>
      </form>
    )
  }
}

SignInForm.childContextTypes = {
  bubbleState: PropTypes.func,
}

export default compose(
  reRouteAuthUsers,
  withRouter,
)(SignInPage)
