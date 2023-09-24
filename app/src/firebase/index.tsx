// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxJT93wROxIiURHgyVAnSnaHpzsLNiEDg",
  authDomain: "codefury6-da82f.firebaseapp.com",
  projectId: "codefury6-da82f",
  storageBucket: "codefury6-da82f.appspot.com",
  messagingSenderId: "7922416249",
  appId: "1:7922416249:web:2262a9df793c1253c332a8",
  measurementId: "G-KBGFEWW61K",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fcm = getMessaging(app);
export const db = getFirestore(app);
