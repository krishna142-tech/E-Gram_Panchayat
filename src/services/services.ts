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
    // Simple query without compound index requirements
    const snapshot = await getDocs(collection(db, 'services'));
    
    const services = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        fee: data.fee || 0,
        requiredDocuments: data.requiredDocuments || [],
        isActive: data.isActive !== false, // Default to true if not specified
        createdAt: data.createdAt?.toDate() || new Date(),
        createdBy: data.createdBy || '',
      };
    }) as Service[];
    
    // Filter and sort in memory to avoid index requirements
    return services
      .filter(service => service.isActive)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } catch (error) {
    console.error('Error fetching services:', error);
    throw new Error('Failed to fetch services. Please try again.');
  }
};

export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const docRef = doc(db, 'services', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        title: data.title || '',
        description: data.description || '',
        category: data.category || '',
        fee: data.fee || 0,
        requiredDocuments: data.requiredDocuments || [],
        isActive: data.isActive !== false,
        createdAt: data.createdAt?.toDate() || new Date(),
        createdBy: data.createdBy || '',
      } as Service;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching service:', error);
    throw new Error('Failed to fetch service details. Please try again.');
  }
};

export const createService = async (
  serviceData: Omit<Service, 'id' | 'createdAt'>,
  userId: string
): Promise<string> => {
  try {
    // Validate required fields
    if (!serviceData.title || !serviceData.description || !serviceData.category) {
      throw new Error('Title, description, and category are required');
    }

    const docRef = await addDoc(collection(db, 'services'), {
      title: serviceData.title,
      description: serviceData.description,
      category: serviceData.category,
      fee: serviceData.fee || 0,
      requiredDocuments: serviceData.requiredDocuments || [],
      isActive: serviceData.isActive !== false,
      createdBy: userId,
      createdAt: serverTimestamp(),
    });
    
    await logAction(userId, 'CREATE_SERVICE', {
      serviceId: docRef.id,
      title: serviceData.title,
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating service:', error);
    throw new Error('Failed to create service. Please try again.');
  }
};

export const updateService = async (
  id: string,
  updates: Partial<Service>,
  userId: string
): Promise<void> => {
  try {
    const docRef = doc(db, 'services', id);
    
    // Clean updates object to only include valid fields
    const cleanUpdates: any = {};
    if (updates.title !== undefined) cleanUpdates.title = updates.title;
    if (updates.description !== undefined) cleanUpdates.description = updates.description;
    if (updates.category !== undefined) cleanUpdates.category = updates.category;
    if (updates.fee !== undefined) cleanUpdates.fee = updates.fee;
    if (updates.requiredDocuments !== undefined) cleanUpdates.requiredDocuments = updates.requiredDocuments;
    if (updates.isActive !== undefined) cleanUpdates.isActive = updates.isActive;
    
    await updateDoc(docRef, cleanUpdates);
    
    await logAction(userId, 'UPDATE_SERVICE', {
      serviceId: id,
      updates: cleanUpdates,
    });
  } catch (error) {
    console.error('Error updating service:', error);
    throw new Error('Failed to update service. Please try again.');
  }
};

export const deleteService = async (id: string, userId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'services', id);
    await deleteDoc(docRef);
    
    await logAction(userId, 'DELETE_SERVICE', { serviceId: id });
  } catch (error) {
    console.error('Error deleting service:', error);
    throw new Error('Failed to delete service. Please try again.');
  }
};