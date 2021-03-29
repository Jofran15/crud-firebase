import firebase from 'firebase/app'
import 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyCYVIGHaiiiy8yZ25hHZlz_yFZRgtRCug8",
    authDomain: "crud-fca5e.firebaseapp.com",
    projectId: "crud-fca5e",
    storageBucket: "crud-fca5e.appspot.com",
    messagingSenderId: "207491996524",
    appId: "1:207491996524:web:d3ef404191a32a6afb3149"
  };
  // Initialize Firebase
  const fb=firebase.initializeApp(firebaseConfig)
 export const db=fb.firestore()