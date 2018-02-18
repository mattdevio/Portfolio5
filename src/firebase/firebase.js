import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCJKrsvc5sjAiXZkSaGmqSMYKmYUkQ406c',
  authDomain: 'moolahlahapp.firebaseapp.com',
  databaseURL: 'https://moolahlahapp.firebaseio.com',
  projectId: 'moolahlahapp',
  storageBucket: 'moolahlahapp.appspot.com',
  messagingSenderId: '170964306761',
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const auth = firebase.auth()
const db = firebase.database()

export {
  db,
  auth,
}
