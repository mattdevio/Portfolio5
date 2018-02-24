import { db } from './firebase'

// Add new user's displayName
export const doCreateUser = (id, displayName) =>
  db.ref(`users/${id}`).child('displayName').set(displayName)

// Get the displayName
export const getDisplayName = id =>
  db.ref(`users/${id}`).once('value')

// set the current budget year
export const doSetBudgetYear = (id, budgetYear) =>
  db.ref(`users/${id}`).child('budgetYear').set(budgetYear)

// set the current budget month
export const doSetBudgetMonth = (id, budgetMonth) =>
  db.ref(`users/${id}`).child('budgetMonth').set(budgetMonth)
