import firebase from 'firebase/app'
import 'firebase/auth'
import "firebase/database"
import "firebase/storage"

 var firebaseConfig = {
    apiKey: "AIzaSyC1DCQ0coHR5GXG0_yGoZdvwFpsluSI4Qs",
    authDomain: "aguaplanta-14b48.firebaseapp.com",
    projectId: "aguaplanta-14b48",
    storageBucket: "aguaplanta-14b48.appspot.com",
    messagingSenderId: "1081758946257",
    appId: "1:1081758946257:web:70dd35005edbaa6dd546f0"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;