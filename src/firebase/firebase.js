import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyBfS8-BUZ1tvablDPSgFlPbwm7GuOAHDMA",
    authDomain: "moviesearcher-14cfb.firebaseapp.com",
    databaseURL: "https://moviesearcher-14cfb.firebaseio.com",
    projectId: "moviesearcher-14cfb",
    storageBucket: "moviesearcher-14cfb.appspot.com",
    messagingSenderId: "937827975872",
    appId: "1:937827975872:web:9bdd8baf6b2505ff12a325",
    measurementId: "G-GLJ0EKVCEQ"

}

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;