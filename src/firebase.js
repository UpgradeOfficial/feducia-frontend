// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage, } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const API_KEY=process.env.REACT_APP_APIKEY
const AUTH_DOMAIN=process.env.REACT_APP_AUTHDOMAIN
const PROJECT_ID=process.env.REACT_APP_PROJECTID
const STORAGE_BUCKET=process.env.REACT_APP_STORAGEBUCKET
const MESSAGING_SENDER_ID=process.env.REACT_APP_MESSAGINGSENDERID
const APP_ID=process.env.REACT_APP_APPID
const MEASUREMENT_ID=process.env.REACT_APP_MEASUREMENTID

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID, 
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage();
export const db = getFirestore();