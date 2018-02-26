/* eslint react/no-multi-comp: 0 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { v4 as uuid } from 'uuid'

import styles from './IncomeBlock.css'
import { db } from '../../firebase'
import { parseToUSD, selectAll } from '../common'

/**
 * IncomeBlock - React Component
 * The module on the MyBudget pages that allows users to add 'income'
 */
class IncomeBlock extends Component {

  constructor(props) {
    super(props)
    this.addInputGroup = this.addInputGroup.bind(this)
  }

  addInputGroup() {
    const {
      authUser,
      budgetMonth,
      budgetYear,
    } = this.props
    const struct = {
      label: '',
      planned: '$0.00',
      recieved: '$0.00',
    }
    const newUid = uuid()
    db.doSetBudgetIncomeInputGroup(authUser.uid, budgetMonth, budgetYear, newUid, struct)
      .then(() => {
        this.props.addNewBudgetIncomeGroup(newUid, struct)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  // Display the module
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
        {Object.keys(budgetInputGroups).map(key => (
          <InputLine
            key={key}
            uuid={key}
            label={budgetInputGroups[key].label}
            planned={budgetInputGroups[key].planned}
            recieved={budgetInputGroups[key].recieved}
          />
        ))}
        <hr />
        <div className={styles.actions}>
          <button className={styles.addItem} onClick={this.addInputGroup}>+ Add Item</button>
        </div>
      </div>
    )
  }
}

// map state from the redux store to the income block
const mapStateToIncomeBlockProps = state => ({
  budgetInputGroups: state.budgetState.budgetInputGroups,
  authUser: state.sessionState.authUser,
  budgetYear: state.budgetState.budgetYear,
  budgetMonth: state.budgetState.budgetMonth,
})

const mapDispatchToProps = dispatch => ({
  addNewBudgetIncomeGroup: (newUid, struct) => dispatch({
    type: 'ADD_NEW_BUDGET_INPUT_GROUP',
    newUid,
    struct,
  }),
})

// export the IncomeBlock component
export default connect(mapStateToIncomeBlockProps, mapDispatchToProps)(IncomeBlock)

/**
 * InputLine - React Component
 * The Single Input Line that lets a user add an income
 */
const InputLine = (function constructInputLine() {
  class incomeInput extends Component {

    constructor(props) {
      super(props)
      this.updateLabel = this.updateLabel.bind(this)
      this.updatePlanned = this.updatePlanned.bind(this)
      this.onPlannedBlur = this.onPlannedBlur.bind(this)
      this.discardIncomeLine = this.discardIncomeLine.bind(this)
    }

    // When a value on the input line changes, save the new value to the firebase db.
    // The save call to the DB is debounced if multiple calls are sequential sub 1 sec.
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
          db.doSetBudgetIncomeInputGroup(authUser.uid, budgetMonth, budgetYear, uuid, {
            label: nextProps.label,
            planned: nextProps.planned,
            recieved: nextProps.recieved,
          }).catch((error) => {
            console.log(error.message)
          })
        }, 1000)
      }
    }

    onPlannedBlur(event) {
      const previous = event.target.value.slice(0)
      const newVal = parseToUSD(event.target.value)
      event.target.value = (newVal === 'NaN') ? '$0.00' : newVal
      if (previous !== event.target.value) {
        this.props.updateBudgetInputGroupPlanned(this.props.uuid, event.target.value)
      }
    }

    // update the input line's label in the global state
    updateLabel(event) {
      const labelValue = event.target.value
      this.props.updateBudgetInputGroupLabel(this.props.uuid, labelValue)
    }

    // update the input line's planned value in the global state
    updatePlanned(event) {
      const plannedValue = event.target.value
      this.props.updateBudgetInputGroupPlanned(this.props.uuid, plannedValue)
    }

    // delete this income line
    discardIncomeLine() {
      const {
        authUser,
        budgetMonth,
        budgetYear,
        uuid,
      } = this.props
      db.doRemoveBudgetIncomeInputGroup(authUser.uid, budgetMonth, budgetYear, uuid)
        .then(() => {
          this.props.removeBudgetInputGroup(uuid)
        })
        .catch((err) => {
          console.log(err.message)
        })
    }

    // display the input line
    render() {
      const {
        label,
        planned,
        recieved,
      } = this.props
      return (
        <div className={styles.toggleInput}>
          <div className={styles.inputGroup}>
            <button onClick={this.discardIncomeLine}>X</button>
            <input
              type='text'
              placeholder='Budget Label Item'
              onChange={this.updateLabel}
              value={label}
              onFocus={selectAll}
            />
          </div>
          <div className={styles.displayGroup}>
            <input
              type='text'
              placeholder='$0.00'
              onChange={this.updatePlanned}
              value={planned}
              onBlur={this.onPlannedBlur}
              onFocus={selectAll}
            />
          </div>
          <p className={styles.actual}>{recieved}</p>
        </div>
      )
    }
  }

  // map dispatch to the InputLine props
  const mapDispatchToProps = dispatch => ({
    // update label
    updateBudgetInputGroupLabel: (uuid, label) => dispatch({
      type: 'UPDATE_BUDGET_INPUT_GROUP_LABEL',
      uuid,
      label,
    }),
    updateBudgetInputGroupPlanned: (uuid, planned) => dispatch({
      type: 'UPDATE_BUDGET_INPUT_GROUP_PLANNED',
      uuid,
      planned,
    }),
    removeBudgetInputGroup: uuid => dispatch({
      type: 'REMOVE_BUDGET_INPUT_GROUP',
      uuid,
    }),
  })

  // map state to the InputLine props
  const mapStateToProps = state => ({
    authUser: state.sessionState.authUser,
    budgetMonth: state.budgetState.budgetMonth,
    budgetYear: state.budgetState.budgetYear,
  })

  return connect(mapStateToProps, mapDispatchToProps)(incomeInput)

}())
