import React, {
  Fragment,
} from 'react'
import PropTypes from 'prop-types'

import styles from './common.css'

// Dynamically scope a setState object
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

/**
 * FormInput - A React Component
 * @param  {object} props               [The React Components Prop]
 * @param  {object} context.bubbleState [React Context Type]
 */
const FormInput = (props, { bubbleState }) => {
  const {
    propertyName,
    value,
    type,
    placeHolder,
    label,
  } = props

  return (
    <Fragment>
      <label htmlFor={propertyName} className={styles.label}>{label}:</label>
      <input
        value={value}
        onChange={event => bubbleState(propertyName, event.target.value)}
        type={type}
        placeholder={placeHolder}
        id={propertyName}
        className={styles.input}
        autoComplete='off'
      />
    </Fragment>
  )
}

// Required prop types for context
FormInput.contextTypes = {
  bubbleState: PropTypes.func,
}

// Parse a number to USD
const parseToUSD = (value) => {
  // regular expression to test for USD string
  const re = /^\$[0-9,]+(\.[0-9][0-9])$/
  if (re.test(value)) {
    return value
  }
  return Number(value).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export {
  byPropKey,
  FormInput,
  parseToUSD,
}
