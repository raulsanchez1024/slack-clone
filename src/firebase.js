import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBDCpJOolgy3tZDdy0LMbX0iKBi-RVeJY4",
    authDomain: "crud-7cb34.firebaseapp.com",
    databaseURL: "https://crud-7cb34.firebaseio.com",
    projectId: "crud-7cb34",
    storageBucket: "crud-7cb34.appspot.com",
    messagingSenderId: "303771242212",
    appId: "1:303771242212:web:aa84f7a863e48e9e"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;