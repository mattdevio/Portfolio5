import { auth } from './firebase'

// Sign Up
const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password)

// Sign In
const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password)

// Sign Out
const doSignOut = () =>
  auth.signOut()

// Reset Password
const doPasswordReset = email =>
  auth.sendPasswordResetEmail(email)

// Change Password
const doPasswordUpdate = password =>
  auth.currentUser.updatePassword(password)

// Export All Functions
export default {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignOut,
  doPasswordReset,
  doPasswordUpdate,
}
