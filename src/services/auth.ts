import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { logAction } from './logging';

export interface RegisterData {
  email: string;
  password: string;
  displayName: string;
  role: 'citizen' | 'staff' | 'admin';
}

export const registerUser = async (data: RegisterData) => {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, data.email, data.password);
    
    // Update profile
    await updateProfile(user, { displayName: data.displayName });

    // Create user document in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      email: data.email,
      displayName: data.displayName,
      role: data.role,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    // Log registration
    await logAction(user.uid, 'REGISTER', {
      email: data.email,
      role: data.role,
    });

    return user;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    // Log login
    await logAction(user.uid, 'LOGIN', { email });
    
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};