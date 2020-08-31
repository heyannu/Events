import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth"

// var firebaseConfig = {
//   apiKey: "AIzaSyDYG-SDOgyGipTNo-ESUvfehDMEG-QLcWs",
//   authDomain: "reminder-95170.firebaseapp.com",
//   databaseURL: "https://reminder-95170.firebaseio.com",
//   projectId: "reminder-95170",
//   storageBucket: "reminder-95170.appspot.com",
//   messagingSenderId: "183934367951",
//   appId: "1:183934367951:web:e924506b300a349ad6dfba",
//   measurementId: "G-MZ6EE06F0H"
// };

var firebaseConfig = {
  apiKey: "AIzaSyCQwqyn3Aa-PkLC7uJq8GmuGjyeE4amjk8",
  authDomain: "events-78db0.firebaseapp.com",
  databaseURL: "https://events-78db0.firebaseio.com",
  projectId: "events-78db0",
  storageBucket: "events-78db0.appspot.com",
  messagingSenderId: "452070615582",
  appId: "1:452070615582:web:498a5b411de4f2551f5c0f",
  measurementId: "G-DHMZ5TGDDD"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
