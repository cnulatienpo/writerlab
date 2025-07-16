// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi23iRWj7rE4gMssuoKx8NxO5cdnUNj7E",
  authDomain: "pfp-data-14b9a.firebaseapp.com",
  projectId: "pfp-data-14b9a",
  storageBucket: "pfp-data-14b9a.firebasestorage.app",
  messagingSenderId: "932276405722",
  appId: "1:932276405722:web:d9cd4cc1a5a4856ee82ce3",
  measurementId: "G-DGYDTSHHV8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };