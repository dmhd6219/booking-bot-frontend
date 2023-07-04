// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {collection, getDocs, getFirestore, addDoc} from 'firebase/firestore/lite';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
    authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
    projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
    storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
    messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
    appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getUsers() {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    return userSnapshot.docs.map(doc => doc.data());
}

export async function setNewUser() {
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    let users = userSnapshot.docs;
    let users_data = users.map(doc => doc.data());
    let numberOfUsers = Object.keys(users_data[0]).length;

    await addDoc(usersCol, {"email" : numberOfUsers.toString() + "@innopolis.university","tg_id": numberOfUsers});
}


export async function getUsersEmailByTgId(){
    const usersCol = collection(db, 'users');
    const userSnapshot = await getDocs(usersCol);
    let data = userSnapshot.docs.map(doc => doc.data());;

    console.log(data);
}