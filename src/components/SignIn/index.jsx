import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { auth } from '../../firebase'
import styles from './SignIn.css'
import * as routes from '../../constants/routes'

const SignInPage = ({ history }) => (
  <div className={styles.container}>
    <h1>Sign In Page!</h1>
    <SignInForm history={history} />
  </div>
)

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

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

  onSubmit(event) {
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

    event.preventDefault()
  }

  render() {
    // const {
    //   email,
    //   password,
    //   error,
    // } = this.state

    return (
      <form onSubmit={this.onSubmit}>
        <h1>this is the form</h1>
      </form>
    )
  }
}

export default withRouter(SignInPage)
