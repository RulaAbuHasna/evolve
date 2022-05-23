// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import "firebase/compat/auth";
import config from './config';
import { v4 as uuidv4 } from 'uuid';

const { firebaseConfig } = config

export const fetchUserDoc = async (userAuth) => {
    if (!userAuth) return;

    const profRef = firestore.doc(`users/profs/all/${userAuth.uid}`);//does this user exist in the DB? 
    const studentRef = firestore.doc(`users/students/all/${userAuth.uid}`);

    const profSnapShot = await profRef.get()
    const studentSnapShot = await studentRef.get()
    const snapShot = profSnapShot.exists ? profSnapShot : studentSnapShot;

    if (!snapShot.exists) {
        throw new Error('No such id, contact your supervisors')
    }

    const data = snapShot.data();
    if (data.pass !== userAuth.password) {
        throw new Error('Password is incorrect, please try again')
    }

    const isStudent = studentSnapShot?.exists
    if (data?.token) {
        if (data.token === userAuth.token) {
            return { data, isStudent }
        }
        await studentRef.set({ token: '' }, { merge: true })
        isStudent ? await studentRef.set({ token: '' }, { merge: true }) : await profRef.set({ token: "" }, { merge: true })
        throw new Error('User seems to be already signed in, if you try again, it will sign you off from other places!')
    }

    const token = uuidv4();
    window.localStorage.setItem("token", token);
    isStudent ? await studentRef.set({ token }, { merge: true }) : await profRef.set({ token }, { merge: true })

    return { data, isStudent, isLoggedIn: data.token === token };
}

export const fetchProfDoc = async (uid, token) => {
    if (!uid) throw new Error('No id provided');

    const profRef = firestore.doc(`users/profs/all/${uid}`);//does this user exist in the DB? 
    const profSnapShot = await profRef.get()

    if (!profSnapShot.exists) {
        throw new Error('No such prof id, contact your supervisors')
    }

    const data = profSnapShot.data();
    let isLoggedIn = true;
    if (data.token !== token) {
        isLoggedIn = false;
    }

    return { data, isLoggedIn };
}


export const fetchProfDetails = async (uid) => {
    if (!uid) throw new Error('No id provided');

    const profRef = firestore.doc(`users/profs/all/${uid}`);//does this user exist in the DB? 
    const profSnapShot = await profRef.get()

    if (!profSnapShot.exists) {
        throw new Error('No such prof id, contact your supervisors')
    }

    const data = profSnapShot.data();
    return data;
}

export const fetchStudentDoc = async (uid, token) => {
    if (!uid || !token) throw new Error('WHO THE ARE YOU, unauthenticated');

    const studentRef = firestore.doc(`users/students/all/${uid}`);//does this user exist in the DB? 
    const studentSnapShot = await studentRef.get()

    if (!studentSnapShot.exists) {
        throw new Error('No such student id, contact your supervisors')
    }

    const data = studentSnapShot.data();
    if (data.token !== token) {
        throw new Error('WHO THE ARE YOU, unauthenticated')
    }

    let isLoggedIn = true;
    if (data.token !== token) {
        isLoggedIn = false;
    }

    return { data, isLoggedIn };
}

export const signStudentOut = async (uid) => {
    if (!uid) throw new Error('WHO THE ARE YOU, unauthenticated');

    const studentRef = firestore.doc(`users/students/all/${uid}`);//does this user exist in the DB? 
    const studentSnapShot = await studentRef.get()

    if (!studentSnapShot.exists) {
        throw new Error('No such student id, contact your supervisors')
    }
    window.localStorage.removeItem("token", "");
    await studentRef.set({ token: '' }, { merge: true })
}

export const signProfOut = async (uid) => {
    if (!uid) throw new Error('WHO THE ARE YOU, unauthenticated');

    const profRef = firestore.doc(`users/profs/all/${uid}`);//does this user exist in the DB? 
    const profSnapShot = await profRef.get()

    if (!profSnapShot.exists) {
        throw new Error('No such student id, contact your supervisors')
    }
    window.localStorage.removeItem("token", "");
    await profRef.set({ token: '' }, { merge: true })
}

export const getAllProfs = async () => {
    const profsRef = firestore.collection('users/profs/all');
    const profsQuerySnapShot = await profsRef.get()

    return profsQuerySnapShot
}

export const getAllColleges = async () => {
    const collegesRef = firestore.collection('colleges');
    const collegesQuerySnapShot = await collegesRef.get()

    return collegesQuerySnapShot
}

export const getCollegeProfs = async (uid) => {
    if (!uid) throw Error('No id provided')
    const profsRef = firestore.collection(`colleges/${uid}/profs`);
    const profsQuerySnapShot = await profsRef.get()

    return profsQuerySnapShot
}

export const getCourseData = async (courseid) => {
    if (!courseid) throw Error('No id provided')
    const courseRef = firestore.doc(`courses/${courseid}`);
    const courseSnapShot = await courseRef.get()

    return courseSnapShot.data()
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;