import { db } from './firebase'

const doCreateUser = (id, displayName, email) =>
  db.ref(`users/${id}`).set({
    displayName,
    email,
  })

export default {
  doCreateUserk
}
