import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyBlXJU_7N2_hmOvUQcLwaMDf16m-_nhYko',
  authDomain: 'pola-1fa8d.firebaseapp.com',
  projectId: 'pola-1fa8d',
  storageBucket: 'pola-1fa8d.appspot.com',
  messagingSenderId: '520514867477',
  appId: '1:520514867477:web:124f75dbc570e7cda1591c',
});

export const db = firebase.firestore();
export default app;
