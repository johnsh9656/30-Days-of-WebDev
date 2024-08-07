
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDwNhlxmFlVPW1Xm0VqveW6zOVffP8Dn7o",
  authDomain: "duolingo-clone-cd694.firebaseapp.com",
  projectId: "duolingo-clone-cd694",
  storageBucket: "duolingo-clone-cd694.appspot.com",
  messagingSenderId: "729518657884",
  appId: "1:729518657884:web:1765eb43da9c31ba2ff199",
  measurementId: "G-VZG3HVZ6RZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);