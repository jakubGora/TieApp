// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
import { getAuth, sendSignInLinkToEmail } from "firebase/auth";

const auth = getAuth();
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
