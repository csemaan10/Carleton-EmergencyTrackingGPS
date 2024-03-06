// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "REACT_GPS_API_KEY",
  authDomain: "REACT_APP_AUTH_DOMAIN",
  databaseURL: "REACT_DATABASE_URL",
  projectId: "REACT_PROJECT_ID",
  storageBucket: "REACT_STORAGE_BUCKET",
  messagingSenderId: "REACT_MESSAGING_SENDER_ID",
  appId: "REACT_APP_ID",
  measurementId: "REACT_MEASUREMENT_ID",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
