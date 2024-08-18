// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbF7NK0xv8Z8lzERDnzxDdK0gW5mctDg8",
  authDomain: "indeed-536cf.firebaseapp.com",
  projectId: "indeed-536cf",
  storageBucket: "indeed-536cf.appspot.com",
  messagingSenderId: "234886259702",
  appId: "1:234886259702:web:a5585a73060754872dddd7",
  measurementId: "G-T701M379FR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
export {app,auth}