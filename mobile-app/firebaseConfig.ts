// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "${process.env.REACT_GPS_API_KEY}",
  authDomain: "${process.env.REACT_APP_AUTH_DOMAIN}",
  databaseURL: "${process.env.REACT_DATABASE_URL}",
  projectId: "${process.env.REACT_PROJECT_ID}",
  storageBucket: "${process.env.REACT_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.REACT_MESSAGING_SENDER_ID}",
  appId: "${process.env.REACT_APP_ID}",
  measurementId: "${process.env.REACT_MEASUREMENT_ID}",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
