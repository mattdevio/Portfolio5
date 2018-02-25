import * as firebase from 'firebase'

// firebase api config - (they say its save to check into source control)
const config = {
  apiKey: 'AIzaSyCJKrsvc5sjAiXZkSaGmqSMYKmYUkQ406c',
  authDomain: 'moolahlahapp.firebaseapp.com',
  databaseURL: 'https://moolahlahapp.firebaseio.com',
  projectId: 'moolahlahapp',
  storageBucket: 'moolahlahapp.appspot.com',
  messagingSenderId: '170964306761',
}

// init firebase app
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

// init firebase components
const auth = firebase.auth()
const db = firebase.database()

export {
  db,
  auth,
}
