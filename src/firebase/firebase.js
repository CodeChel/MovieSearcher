import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.REACT_APP_PROD_API_KEY,
    authDomain: process.env.REACT_APP_PROD_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_PROD_DATABASE_URL,
    projectId: process.env.REACT_APP_PROD_PROJECT_ID,
    storageBucket: process.env.REACT_APP_PROD_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_PROD_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_PROD_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

const devConfig = {

}

const config =
    process.env.NODE_ENV === 'production' ? firebaseConfig : devConfig;

 const  myFirebase = firebase.initializeApp(config)
export const db = firebase.firestore()


export default myFirebase