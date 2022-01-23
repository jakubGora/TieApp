import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator, RecaptchaVerifier } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDG_J-kaLylAI4Wk1YDuYUEMBCNeugnmGE",
  authDomain: "tieapp-2281e.firebaseapp.com",
  projectId: "tieapp-2281e",
  storageBucket: "tieapp-2281e.appspot.com",
  messagingSenderId: "15121582945",
  appId: "1:15121582945:web:ec71befcf6aff42877d320",
  measurementId: "G-C34NCT43JX",
};
const app = initializeApp(firebaseConfig);
// Initialize Firebase

const auth = getAuth();
export const db = getFirestore();
export const fireAuth = auth;
const analytics = getAnalytics(app);
export const recaptchaVerifier = RecaptchaVerifier;
export default firebase;
