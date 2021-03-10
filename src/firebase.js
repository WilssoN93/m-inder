import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyB5H1DxL07MhncYdPuLLFMxPffeQVRNi5o",
  authDomain: "m-inder.firebaseapp.com",
  projectId: "m-inder",
  storageBucket: "m-inder.appspot.com",
  messagingSenderId: "553928119479",
  appId: "1:553928119479:web:2b724d5c5e29b249c3a932",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };

export default db;
