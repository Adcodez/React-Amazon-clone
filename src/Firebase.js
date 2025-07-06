import { initializeApp } from "firebase/app";
import {
  getAuth,
  // signInWithEmailAndPassword,
  // createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  
} from "firebase/firestore"; // Now includes necessary Firestore helpers

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDe7LoisyRgsiSoWZ-niAe5SU7HCtCn8Jk",
  authDomain: "clone-21ff4.firebaseapp.com",
  projectId: "clone-21ff4",
  storageBucket: "clone-21ff4.appspot.com", // fixed typo here
  messagingSenderId: "840005484701",
  appId: "1:840005484701:web:5fb64af9a0ab1e7a215474",
  measurementId: "G-FZBCKZVPJ6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ✅ Initialize Firestore

// ✅ Log Firebase instances AFTER initialization

console.log("✅ Firebase initialized:", app);
console.log("✅ Auth instance:", auth);
console.log("✅ Firestore instance:", db);

export { auth, db };
