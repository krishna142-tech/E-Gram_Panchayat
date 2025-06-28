import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Application } from '../types';
import { logAction } from './logging';

export const submitApplication = async (
  applicationData: Omit<Application, 'id' | 'submittedAt' | 'updatedAt' | 'status'>,
  userId: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'applications'), {
      ...applicationData,
      status: 'pending',
      submittedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    await logAction(userId, 'SUBMIT_APPLICATION', {
      applicationId: docRef.id,
      serviceId: applicationData.serviceId,
      serviceName: applicationData.serviceName,
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
};

export const getUserApplications = async (userId: string): Promise<Application[]> => {
  try {
    const q = query(
      collection(db, 'applications'),
      where('userId', '==', userId),
      orderBy('submittedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Application[];
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw error;
  }
};

export const getAllApplications = async (): Promise<Application[]> => {
  try {
    const q = query(
      collection(db, 'applications'),
      orderBy('submittedAt', 'desc')
    );
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Application[];
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
};

export const updateApplicationStatus = async (
  id: string,
  status: Application['status'],
  remarks: string,
  userId: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'applications', id);
    await updateDoc(docRef, {
      status,
      remarks,
      updatedAt: serverTimestamp(),
      updatedBy: userId,
    });
    
    await logAction(userId, 'UPDATE_APPLICATION_STATUS', {
      applicationId: id,
      status,
      remarks,
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    throw error;
  }
};