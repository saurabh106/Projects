

import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp,getApp,getApps } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyD35H0Vd9IALd_Qy4WhCrzv3MFCzVg_R0k",
  authDomain: "preprite-ac8c9.firebaseapp.com",
  projectId: "preprite-ac8c9",
  storageBucket: "preprite-ac8c9.firebasestorage.app",
  messagingSenderId: "511951055429",
  appId: "1:511951055429:web:833ee0e662412f3459d12c",
  measurementId: "G-781R8PMEQL"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);