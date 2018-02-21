import React, {
  Fragment,
} from 'react'
import PropTypes from 'prop-types'

import styles from './common.css'

// Dynamically intergrate setState
const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
})

// Standard Form Input
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

FormInput.contextTypes = {
  bubbleState: PropTypes.func,
}

export {
  byPropKey,
  FormInput,
}
