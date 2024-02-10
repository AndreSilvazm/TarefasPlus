// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8NJXCg5Hl0gRg4RW0WV3uXdy-q_DwijM",
  authDomain: "tarefasplus-27ef2.firebaseapp.com",
  projectId: "tarefasplus-27ef2",
  storageBucket: "tarefasplus-27ef2.appspot.com",
  messagingSenderId: "65241639128",
  appId: "1:65241639128:web:f182e00573ac04f32f4fad",
  measurementId: "G-3DR96EDVM8"
};

// Initialize Firebase
const firebaseapp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseapp)

export {db}