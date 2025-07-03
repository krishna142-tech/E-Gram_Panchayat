import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut
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
  } catch (error: any) {
    console.error('Registration error:', error);
    
    // Provide user-friendly error messages
    if (error.code === 'auth/email-already-in-use') {
      throw new Error('An account with this email already exists. Please sign in instead.');
    } else if (error.code === 'auth/weak-password') {
      throw new Error('Password is too weak. Please choose a stronger password.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else {
      throw new Error('Registration failed. Please try again.');
    }
  }
};

export const signInUser = async (email: string, password: string) => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    
    // Log login
    await logAction(user.uid, 'LOGIN', { email });
    
    return user;
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Provide user-friendly error messages
    if (error.code === 'auth/user-not-found') {
      throw new Error('No account found with this email address. Please register first.');
    } else if (error.code === 'auth/wrong-password') {
      throw new Error('Incorrect password. Please try again.');
    } else if (error.code === 'auth/invalid-email') {
      throw new Error('Please enter a valid email address.');
    } else if (error.code === 'auth/too-many-requests') {
      throw new Error('Too many failed login attempts. Please try again later.');
    } else {
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
  } catch (error: any) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out. Please try again.');
  }
};