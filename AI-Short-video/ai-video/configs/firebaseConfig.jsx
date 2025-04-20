// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "ai-video-9405f.firebaseapp.com",
  projectId: "ai-video-9405f",
  storageBucket: "ai-video-9405f.firebasestorage.app",
  messagingSenderId: "1009387087965",
  appId: "1:1009387087965:web:3d2d22e9c51731552dc5b4",
  measurementId: "G-HK835NQZX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)