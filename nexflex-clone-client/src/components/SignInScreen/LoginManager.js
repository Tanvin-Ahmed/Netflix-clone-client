import firebase from 'firebase';
import firebaseConfig from './firebase.config';

export const initializationLoginFramework = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
}

const firebaseApp = firebase.initializeApp(firebaseConfig);;
const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();


export const createUserWithEmailAndPassword = (email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const newUserInfo = { ...user };
            // newUserInfo.displayName = name;
            newUserInfo.error = "";
            newUserInfo.success = true;
            // updateUserProfile(name);
            return newUserInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = errorMessage;
            return newUserInfo;
        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const newUserInfo = { ...user };
            newUserInfo.error = "";
            newUserInfo.success = true;
            return newUserInfo;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const newUserInfo = {};
            newUserInfo.success = false;
            newUserInfo.error = errorMessage;
            return newUserInfo;
        });
}

// const updateUserProfile = (name) => {
//     const user = firebase.auth().currentUser;

//     user.updateProfile({
//         displayName: name
//     }).then(function () {
//         console.log('Profile Updated.');
//     }).catch(function (error) {
//         console.log('Profile Update Error : ', error);
//     });
// }


export default db;