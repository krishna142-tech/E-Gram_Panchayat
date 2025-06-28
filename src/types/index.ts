export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'citizen' | 'staff' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  requiredDocuments: string[];
  fee: number;
  category: string;
  isActive: boolean;
  createdAt: Date;
  createdBy: string;
}

export interface Application {
  id: string;
  serviceId: string;
  serviceName: string;
  userId: string;
  userName: string;
  userEmail: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  formData: Record<string, any>;
  submittedAt: Date;
  updatedAt: Date;
  updatedBy?: string;
  remarks?: string;
}

export interface LogEntry {
  id: string;
  userId: string;
  userEmail: string;
  userRole: string;
  action: string;
  details: Record<string, any>;
  timestamp: Date;
  ipAddress?: string;
}