import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
   apiKey: "AIzaSyBwB_izEFPbN9pgXjcyIP3N0pRtOnvsCVY",
   authDomain: "slack-clone-412d7.firebaseapp.com",
   projectId: "slack-clone-412d7",
   storageBucket: "slack-clone-412d7.appspot.com",
   messagingSenderId: "890256417616",
   appId: "1:890256417616:web:8545d7cb06598784f28255",
   measurementId: "G-1490XHY60L"
 };

 const firebaseApp = firebase.initializeApp(firebaseConfig);
export  const db = firebaseApp.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();


