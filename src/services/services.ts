import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { Service } from '../types';
import { logAction } from './logging';

export const getServices = async (): Promise<Service[]> => {
  try {
    // Remove the compound query that requires an index
    // Instead, fetch all services and filter active ones in memory
    const snapshot = await getDocs(collection(db, 'services'));
    
    const services = snapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
      })) as Service[];
    
    const activeServices = services
      .filter(service => service.isActive) // Filter active services in memory
      .sort((a, b) => {
        // Sort by createdAt in descending order (newest first)
        if (!a.createdAt || !b.createdAt) return 0;
        return b.createdAt.getTime() - a.createdAt.getTime();
      });
    
    return activeServices;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const docRef = doc(db, 'services', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
      } as Service;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching service:', error);
    throw error;
  }
};

export const createService = async (
  serviceData: Omit<Service, 'id' | 'createdAt'>,
  userId: string
): Promise<string> => {
  try {
    const docRef = await addDoc(collection(db, 'services'), {
      ...serviceData,
      createdAt: serverTimestamp(),
    });
    
    await logAction(userId, 'CREATE_SERVICE', {
      serviceId: docRef.id,
      title: serviceData.title,
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

export const updateService = async (
  id: string,
  updates: Partial<Service>,
  userId: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'services', id);
    await updateDoc(docRef, updates);
    
    await logAction(userId, 'UPDATE_SERVICE', {
      serviceId: id,
      updates,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

export const deleteService = async (id: string, userId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'services', id);
    await deleteDoc(docRef);
    
    await logAction(userId, 'DELETE_SERVICE', { serviceId: id });
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};