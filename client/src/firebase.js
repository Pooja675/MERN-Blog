// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-4cc86.firebaseapp.com",
  projectId: "mern-blog-4cc86",
  storageBucket: "mern-blog-4cc86.firebasestorage.app",
  messagingSenderId: "677995598376",
  appId: "1:677995598376:web:58691fafffff09f2269b1d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

