// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBeAlmB3wxBvG4GG-AxisVTNn_dP8fgpNU",
  authDomain: "buisness-bdb8a.firebaseapp.com",
  projectId: "buisness-bdb8a",
  storageBucket: "buisness-bdb8a.firebasestorage.app",
  messagingSenderId: "326369264655",
  appId: "1:326369264655:web:e966ac6532c22adf46cf7a",
  measurementId: "G-94400LBLPW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);