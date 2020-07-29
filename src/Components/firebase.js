import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth"

var firebaseConfig = {
  apiKey: "AIzaSyDYG-SDOgyGipTNo-ESUvfehDMEG-QLcWs",
  authDomain: "reminder-95170.firebaseapp.com",
  databaseURL: "https://reminder-95170.firebaseio.com",
  projectId: "reminder-95170",
  storageBucket: "reminder-95170.appspot.com",
  messagingSenderId: "183934367951",
  appId: "1:183934367951:web:e924506b300a349ad6dfba",
  measurementId: "G-MZ6EE06F0H"
};


  
  firebase.initializeApp(firebaseConfig);
  
  export default firebase;
  