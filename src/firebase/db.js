import { db } from './firebase'

export const doCreateUser = (id, displayName) =>
  db.ref(`users/${id}`).set({
    displayName,
  })
