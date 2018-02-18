import { db } from './firebase'

const doCreateUser = (id, displayName) =>
  db.ref(`users/${id}`).set({
    displayName,
  })

export default {
  doCreateUser,
}
