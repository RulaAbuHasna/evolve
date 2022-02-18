// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import config from './config';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const { firebaseConfig } = config

export const fetchUserDoc = async (userAuth) => {
    console.log(userAuth)
    if (!userAuth) return;
    // const userRef = firestore.doc('users/random12') //returns a ref to the doc not the obj itself which technically doesnt exsit
    const userRef = firestore.doc(`users/${userAuth.uid}`);//is this user exist in the DB? 
    const snapShot = await userRef.get(); //gets me the obj 'simply represents the data'
    if (!snapShot.exists) {
        return 'no such id, contact your supervisors'
    }
    return snapShot.data();
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;