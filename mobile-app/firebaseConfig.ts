// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDGz-kTz_EB7eDxMkyWiw6t2DIWcPDuWPA",
  authDomain: "emergency-gps-dd774.firebaseapp.com",
  databaseURL: "https://emergency-gps-dd774-default-rtdb.firebaseio.com",
  projectId: "emergency-gps-dd774",
  storageBucket: "emergency-gps-dd774.appspot.com",
  messagingSenderId: "371999950291",
  appId: "1:371999950291:web:6af95c756c5d7f20fcdb26",
  measurementId: "G-6YVZWEDZ2D",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
