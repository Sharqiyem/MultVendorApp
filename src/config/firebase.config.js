import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA8GU1RTlze2jUKwRX0ZFLc_D2_HbmTaOc',
  authDomain: 'fir-test-c23ed.firebaseapp.com',
  databaseURL: 'https://fir-test-c23ed.firebaseio.com',
  projectId: 'fir-test-c23ed',
  storageBucket: 'fir-test-c23ed.appspot.com',
  messagingSenderId: '353517164646',
  appId: '1:353517164646:web:0bfa239c14a7151c9db5a7',
  measurementId: 'G-BKN81FJ4C4',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log('firebase.SDK_VERSION', firebase.SDK_VERSION);
export default firebase;
