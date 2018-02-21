import React, { Component } from 'react'
import {
  withRouter,
  Link,
} from 'react-router-dom'
import PropTypes from 'prop-types'

import { auth, db } from '../../firebase'
import * as routes from '../../constants/routes'
import { byPropKey, FormInput } from '../common'
import styles from './SignUp.css'

const SignUpPage = ({ history }) => (
  <div className={styles.container}>
    <h1>Sign Up</h1>
    <p>Your account is free!</p>
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

class SignUpForm extends Component {
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
      displayName,
      email,
      passwordOne,
      passwordTwo,
    } = this.state

    const {
      history,
    } = this.props

    if (displayName.trim().length < 3) {
      this.setState({
        error: { message: 'The display name is too short.' },
      })
      return
    }

    if (passwordOne !== passwordTwo) {
      this.setState({
        error: { message: 'The passwords don\'t match.' },
      })
      return
    }

    // password length and email are validated by firebase

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        db.doCreateUser(authUser.uid, displayName)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }))
            history.push(routes.MY_BUDGET)
          })
          .catch((error) => {
            this.setState(byPropKey('error', error))
          })
      })
      .catch((error) => {
        this.setState(byPropKey('error', error))
      })
  }

  render() {
    const {
      displayName,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <FormInput
          propertyName='displayName'
          value={displayName}
          type='text'
          placeHolder='How do you want us to identify you?'
          label='Display Name'
        />
        <FormInput
          propertyName='email'
          value={email}
          type='text'
          placeHolder='This will be your sign in.'
          label='Email'
        />
        <FormInput
          propertyName='passwordOne'
          value={passwordOne}
          type='password'
          placeHolder='What do you want your password to be?'
          label='Password'
        />
        <FormInput
          propertyName='passwordTwo'
          value={passwordTwo}
          type='password'
          placeHolder='Confirm your password.'
          label='Confirm Password'
        />

        <p className={styles.error}>
          { error && `Error: ${error.message}` }
        </p>

        <div className={styles.actions}>
          <Link to={routes.SIGN_IN} className={styles.signin}>
            I Already Have An Account
          </Link>
          <button type='submit' className={styles.signup}>
            Sign Up
          </button>
        </div>
      </form>
    )
  }

} // end SignUpForm class

SignUpForm.childContextTypes = {
  bubbleState: PropTypes.func,
}

export default withRouter(SignUpPage)
