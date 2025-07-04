import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Application } from '../types';
import { logAction } from './logging';

export const submitApplication = async (
  applicationData: Omit<Application, 'id' | 'submittedAt' | 'updatedAt' | 'status'>,
  userId: string
): Promise<string> => {
  try {
    // Validate required fields
    if (!applicationData.serviceId || !applicationData.serviceName || !applicationData.userId) {
      throw new Error('Missing required application data');
    }

    const docRef = await addDoc(collection(db, 'applications'), {
      serviceId: applicationData.serviceId,
      serviceName: applicationData.serviceName,
      userId: applicationData.userId,
      userName: applicationData.userName || '',
      userEmail: applicationData.userEmail || '',
      formData: applicationData.formData || {},
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
    throw new Error('Failed to submit application. Please try again.');
  }
};

export const getUserApplications = async (userId: string): Promise<Application[]> => {
  try {
    // Use simple query without compound index
    const q = query(
      collection(db, 'applications'),
      where('userId', '==', userId),
      limit(100) // Add limit to improve performance
    );
    
    const snapshot = await getDocs(q);
    
    const applications = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        serviceId: data.serviceId || '',
        serviceName: data.serviceName || '',
        userId: data.userId || '',
        userName: data.userName || '',
        userEmail: data.userEmail || '',
        status: data.status || 'pending',
        formData: data.formData || {},
        submittedAt: data.submittedAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        updatedBy: data.updatedBy,
        remarks: data.remarks,
      };
    }) as Application[];

    // Sort in memory by submittedAt descending
    return applications.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  } catch (error) {
    console.error('Error fetching user applications:', error);
    throw new Error('Failed to fetch your applications. Please try again.');
  }
};

export const getAllApplications = async (): Promise<Application[]> => {
  try {
    // Simple query without ordering to avoid index requirements
    const snapshot = await getDocs(collection(db, 'applications'));
    
    const applications = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        serviceId: data.serviceId || '',
        serviceName: data.serviceName || '',
        userId: data.userId || '',
        userName: data.userName || '',
        userEmail: data.userEmail || '',
        status: data.status || 'pending',
        formData: data.formData || {},
        submittedAt: data.submittedAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
        updatedBy: data.updatedBy,
        remarks: data.remarks,
      };
    }) as Application[];

    // Sort in memory by submittedAt descending
    return applications.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw new Error('Failed to fetch applications. Please try again.');
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
    throw new Error('Failed to update application status. Please try again.');
  }
};
export const deleteApplication = async (
  id: string,
  userId: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'applications', id);
    await deleteDoc(docRef);
    
    await logAction(userId, 'DELETE_APPLICATION', {
      applicationId: id,
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    throw new Error('Failed to delete application. Please try again.');
  }
};