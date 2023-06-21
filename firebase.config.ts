import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNjP6K4z0qlbvzTVGupRDEjQjMVJJxSCQ",
  authDomain: "challenge-nextjs.firebaseapp.com",
  projectId: "challenge-nextjs",
  storageBucket: "challenge-nextjs.appspot.com",
  messagingSenderId: "492524600229",
  appId: "1:492524600229:web:067de8cdf21b7632f2864c"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app)

export { app, db, storage, auth };
