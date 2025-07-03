import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export const logAction = async (
  userId: string,
  action: string,
  details: Record<string, any> = {},
  userRole?: string
) => {
  try {
    // Only log in production or when explicitly enabled
    if (import.meta.env.MODE === 'development' && !import.meta.env.VITE_ENABLE_LOGGING) {
      console.log(`LOG: ${action}`, { userId, details });
      return;
    }

    await addDoc(collection(db, 'logs'), {
      userId,
      userRole: userRole || 'unknown',
      action,
      details,
      timestamp: serverTimestamp(),
      ipAddress: 'unknown', // Simplified to avoid external API calls
    });
  } catch (error) {
    console.error('Logging error:', error);
    // Don't throw error for logging failures
  }
};