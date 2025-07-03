import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

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

// Configure auth persistence
auth.setPersistence = auth.setPersistence || (() => Promise.resolve());

// Connect to emulators in development (optional)
if (import.meta.env.DEV && !auth.emulatorConfig) {
  try {
    // Only connect to emulators if they're not already connected
    // and if the environment variables are set
    if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
      connectAuthEmulator(auth, 'http://localhost:9099');
      connectFirestoreEmulator(db, 'localhost', 8080);
      connectFunctionsEmulator(functions, 'localhost', 5001);
    }
  } catch (error) {
    // Emulators might already be connected, ignore the error
    console.log('Firebase emulators already connected or not available');
  }
}

export default app;