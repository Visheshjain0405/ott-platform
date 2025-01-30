// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKysK2MaMcxQ42RCmCj2jvqeZQ0ix6HZg",
  authDomain: "cinema-hub-eb91a.firebaseapp.com",
  projectId: "cinema-hub-eb91a",
  storageBucket: "cinema-hub-eb91a.appspot.com",
  messagingSenderId: "219652141007",
  appId: "1:219652141007:web:8e9728b39ef0bcd17cecba",
  measurementId: "G-7V68GC95XD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };