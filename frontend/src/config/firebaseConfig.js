// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB93Gxw8XwxqDuiqaZjUeRz_7lwHF77Ic8",
  authDomain: "budgetapp-c2987.firebaseapp.com",
  projectId: "budgetapp-c2987",
  storageBucket: "budgetapp-c2987.appspot.com",
  messagingSenderId: "388168375222",
  appId: "1:388168375222:web:b39acc851311442899bf17",
  measurementId: "G-FBF30DMKRL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getFirestore(app);
const auth = getAuth(app);

// Enable persistent authentication state
setPersistence(auth, browserLocalPersistence);

export { auth, database };
export default app;
