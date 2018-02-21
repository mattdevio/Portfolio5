import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'recompose'

import { db } from '../../firebase'
import withAuthorization from '../withAuthorization'

import styles from './MyBudget.css'

class MyBudgetPage extends Component {

  componentDidMount() {
    if (!this.props.displayName) {
      db.getDisplayName(this.props.authUser.uid)
        .then((snapshot) => {
          this.props.setDisplayName(snapshot.val().displayName)
        })
        .catch((error) => {
          console.dir(error)
        })
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Hello {this.props.displayName.toUpperCase()}!</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  authUser: state.sessionState.authUser,
  displayName: state.userState.displayName,
})

const mapDispatchToProps = dispatch => ({
  setDisplayName: displayName => dispatch({
    type: 'SET_DISPLAYNAME',
    displayName,
  }),
})

const authCondition = authUser => !!authUser

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps),
)(MyBudgetPage)
