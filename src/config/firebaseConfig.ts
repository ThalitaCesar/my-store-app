import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCs-uqNDKyXDeUqYavaybr5hv7OM-mdfrc",
  authDomain: "fakestoreapp-aa01e.firebaseapp.com",
  projectId: "fakestoreapp-aa01e",
  storageBucket: "fakestoreapp-aa01e.firebasestorage.app",
  messagingSenderId: "516497580161",
  appId: "1:516497580161:web:8a5e42818f9a8d6be16d80",
  measurementId: "G-WCZC5WTWKQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);