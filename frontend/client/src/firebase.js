
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-91640.firebaseapp.com",
  projectId: "mern-auth-91640",
  storageBucket: "mern-auth-91640.appspot.com",
  messagingSenderId: "725252294310",
  appId: "1:725252294310:web:adc99c25373c53ffd39667",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);