/* eslint react/no-multi-comp: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './IncomeBlock.css'
import { db } from '../../firebase'

class IncomeBlock extends Component {

  componentWillReceiveProps(nextProps) {
    // console.dir(nextProps)
  }

  render() {
    const { budgetInputGroups } = this.props
    return (
      <div className={styles.container}>
        <div className={styles.topbar}>
          <h1>Income:</h1>
          <span>
            <p>Planned</p>
            <p>Recieved</p>
          </span>
        </div>
        {Object.keys(budgetInputGroups).map(uuid => (
          <InputLine
            key={uuid}
            uuid={uuid}
            label={budgetInputGroups[uuid].label}
            planned={budgetInputGroups[uuid].planned}
            recieved={budgetInputGroups[uuid].recieved}
          />
        ))}
        <hr />
        <div className={styles.actions}>
          <button className={styles.addItem}>+ Add Item</button>
        </div>
      </div>
    )
  }
}


const mapStateToIncomeBlockProps = state => ({
  budgetInputGroups: state.budgetState.budgetInputGroups,
})

export default connect(mapStateToIncomeBlockProps)(IncomeBlock)


const InputLine = (function constructInputLine() {
  class incomeInput extends Component {

    constructor(props) {
      super(props)
      this.updateLabel = this.updateLabel.bind(this)
      this.updatePlanned = this.updatePlanned.bind(this)
    }

    componentWillReceiveProps(nextProps) {
      const {
        label,
        planned,
        recieved,
        authUser,
        budgetYear,
        budgetMonth,
        uuid,
      } = this.props
      const newData = label !== nextProps.label ||
                      planned !== nextProps.planned ||
                      recieved !== nextProps.recieved
      if (newData) {
        if (this.willUpdate) clearTimeout(this.willUpdate)
        this.willUpdate = setTimeout(() => {
          db.doUpdateBudgetInputGroup(authUser.uid, budgetMonth, budgetYear, uuid, {
            label: nextProps.label,
            planned: nextProps.planned,
            recieved: nextProps.recieved,
          }).catch((error) => {
            console.log(error.message)
          })
        }, 1000)
      }
    }

    updateLabel(event) {
      const labelValue = event.target.value
      this.props.updateBudgetInputGroupLabel(this.props.uuid, labelValue)
    }

    updatePlanned(event) {
      const plannedValue = event.target.value
      console.log(this.props.uuid, plannedValue)
    }

    render() {
      const {
        label,
        planned,
        recieved,
      } = this.props
      return (
        <div className={styles.toggleInput}>
          <div className={styles.inputGroup}>
            <button>X</button>
            <input
              type='text'
              placeholder='Budget Label Item'
              onChange={this.updateLabel}
              value={label}
            />
          </div>
          <div className={styles.displayGroup}>
            <input
              type='text'
              placeholder='$0.00'
              onChange={this.updatePlanned}
              value={planned}
            />
          </div>
          <p className={styles.actual}>{recieved}</p>
        </div>
      )
    }
  }

  const mapDispatchToProps = dispatch => ({
    updateBudgetInputGroupLabel: (uuid, label) => dispatch({
      type: 'UPDATE_BUDGET_INPUT_GROUP_LABEL',
      uuid,
      label,
    }),
  })

  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    budgetMonth: state.budgetState.budgetMonth,
    budgetYear: state.budgetState.budgetYear,
  })

  return connect(mapStateToProps, mapDispatchToProps)(incomeInput)

}())
