import { db } from './firebase'

export const doCreateUser = (id, displayName) =>
  db.ref(`users/${id}`).set({
    displayName,
  })

export const getDisplayName = id =>
  db.ref(`users/${id}`).once('value')

export const doSetBudgetYear = (id, budgetYear) =>
  db.ref(`users/${id}/budgetYear`).set({
    budgetYear,
  })
