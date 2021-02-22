import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyCGKTH4910aybgUficfDwb-WNkVyeSy2NE",
    authDomain: "users-70792.firebaseapp.com",
    projectId: "users-70792",
    storageBucket: "users-70792.appspot.com",
    messagingSenderId: "162867986679",
    appId: "1:162867986679:web:28193220e9007bfcdf53f2"
  };

// initialize firebase
firebase.initializeApp(config);
const database = firebase.firestore()

//initialize authentication
export const auth = firebase.auth()

export default database