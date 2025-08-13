import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALPsrHci5lRpQ96gOkpCuh76ayogPAqEw",
  authDomain: "expense-tracker-1b82c.firebaseapp.com",
  projectId: "expense-tracker-1b82c",
  storageBucket: "expense-tracker-1b82c.firebasestorage.app",
  messagingSenderId: "528215623052",
  appId: "1:528215623052:web:296e55a678ed3653a482a9",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
export default firebase;
