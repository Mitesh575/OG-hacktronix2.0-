import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD_p4d0RsMJXGM-TCyDI84UnvCdjp9L0MQ",
  authDomain: "hacktronix20.firebaseapp.com",
  projectId: "hacktronix20",
  storageBucket: "hacktronix20.firebasestorage.app",
  messagingSenderId: "273234684191",
  appId: "1:273234684191:web:0ca6d21015022425dfa82a",
  measurementId: "G-5TR72NBM4C",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
