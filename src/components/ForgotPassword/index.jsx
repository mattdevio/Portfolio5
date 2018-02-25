import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert'

import styles from './ForgotPassword.css'
import { auth } from '../../firebase'
import * as routes from '../../constants/routes'
import { byPropKey, FormInput } from '../common'

/**
 * ForgotPasswordPage - React Component
 * @param  {object} props.history [The react-router-dom history object]
 */
const ForgotPasswordPage = ({ history }) => (
  <div className={styles.container}>
    <h1>Forgot Your Password?</h1>
    <p>We can send a reset request to your email!</p>
    <PasswordForgetForm history={history} />
  </div>
)

// Scopped Initial State for PasswordForgetForm
const INITIAL_STATE = {
  email: '',
  error: null,
}

/**
 * PasswordForgetForm - React Component
 * The form that allows users to reset their password.
 */
class PasswordForgetForm extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
    this.onSubmit = this.onSubmit.bind(this)
  }

  // Map a setState method to child 'FormInput' compoents through context.
  getChildContext() {
    return {
      bubbleState: (propertyName, value) => {
        this.setState(byPropKey(propertyName, value))
      },
    }
  }

  // Request password reset from firebase auth. The firebase auth will handle
  // form validation. Displays a sweetalert model on success.
  onSubmit(event) {
    event.preventDefault()
    const { email } = this.state
    const { history } = this.props
    auth.doPasswordReset(email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }))
        swal('Message Sent!', 'Plase check your email for the password reset.')
          .then(() => {
            history.push(routes.SIGN_IN)
          })
      })
      .catch((error) => {
        this.setState(byPropKey('error', error))
      })
  }

  // display the form
  render() {
    const {
      email,
      error,
    } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <FormInput
          propertyName='email'
          value={email}
          type='text'
          placeHolder='The address you signed up with.'
          label='Email'
        />
        <p className={styles.error}>
          { error && `Error: ${error.message}`}
        </p>
        <div className={styles.actions}>
          <button type='submit' className={styles.resetpswd}>
            reset
          </button>
        </div>
      </form>
    )
  }
}

// Prop types required for context
PasswordForgetForm.childContextTypes = {
  bubbleState: PropTypes.func,
}

export default withRouter(ForgotPasswordPage)
