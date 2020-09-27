import * as firebase from 'firebase';
import 'firebase/firestore';
import "firebase/auth"

var firebaseConfig = {
  apiKey: "AIzaSyCdKii5aj4SlX6qtTax5dmd-Ei2mroax6g",
  authDomain: "event-db9da.firebaseapp.com",
  databaseURL: "https://event-db9da.firebaseio.com",
  projectId: "event-db9da",
  storageBucket: "event-db9da.appspot.com",
  messagingSenderId: "1069090539699",
  appId: "1:1069090539699:web:be061ae538e30c4db608c6",
  measurementId: "G-58B0987TKD"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
