import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvtNaDBz4D9ecVdwnq0XfIAL74BAI8sBo",
  authDomain: "test-d1545.firebaseapp.com",
  projectId: "test-d1545",
  storageBucket: "test-d1545.appspot.com",
  messagingSenderId: "447249765841",
  appId: "1:447249765841:web:9122859c027d9b8ea43cf0",
  measurementId: "G-95EG2KXX7N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
