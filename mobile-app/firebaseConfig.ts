// Import the functions you need from the SDKs you need
import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: `${process.env.EXPO_PUBLIC_FIREBASE_API_KEY}`,
  authDomain: `${process.env.EXPO_PUBLIC_FIREBASE_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL}`,
  projectId: `${process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.EXPO_PUBLIC_FIREBASE_APP_ID}`,
  measurementId: `${process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID}`,
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
