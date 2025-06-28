import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyC7JlrcphyQyBESZqinfRTtx-uEXro1EOs",
  authDomain: "e-gram-panchayat-54791.firebaseapp.com",
  projectId: "e-gram-panchayat-54791",
  storageBucket: "e-gram-panchayat-54791.firebasestorage.app",
  messagingSenderId: "196456808065",
  appId: "1:196456808065:web:afc7ae9926b873d7745780",
  measurementId: "G-41GJGF6YC6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

export default app;