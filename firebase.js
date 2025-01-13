// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKasnp73YGUUQnWuyphn0UB8eSVE4JyTM",
  authDomain: "quiziverse-3e1f1.firebaseapp.com",
  projectId: "quiziverse-3e1f1",
  storageBucket: "quiziverse-3e1f1.firebasestorage.app",
  messagingSenderId: "196482543434",
  appId: "1:196482543434:web:9ed3bf42331db797ee1bb3",
  measurementId: "G-H3V3MN2GF5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);