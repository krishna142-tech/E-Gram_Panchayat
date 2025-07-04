import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
  actionUrl?: string;
}

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from localStorage
  useEffect(() => {
    if (user) {
      const stored = localStorage.getItem(`notifications_${user.uid}`);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setNotifications(parsed.map((n: any) => ({
            ...n,
            createdAt: new Date(n.createdAt)
          })));
        } catch (error) {
          console.error('Error loading notifications:', error);
        }
      } else {
        // Create some demo notifications for new users
        const demoNotifications: Notification[] = [
          {
            id: 'welcome',
            title: 'Welcome to Digital E-Gram Panchayat!',
            message: 'Your account has been created successfully. You can now apply for government services online.',
            type: 'success',
            read: false,
            createdAt: new Date(),
            actionUrl: '/services'
          }
        ];
        
        if (user.role === 'admin' || user.role === 'staff') {
          demoNotifications.push({
            id: 'dashboard_access',
            title: 'Dashboard Access Granted',
            message: `You now have ${user.role} access to the dashboard. You can manage applications and services.`,
            type: 'info',
            read: false,
            createdAt: new Date(),
            actionUrl: user.role === 'admin' ? '/dashboard/admin' : '/dashboard/staff'
          });
        }
        
        setNotifications(demoNotifications);
        localStorage.setItem(`notifications_${user.uid}`, JSON.stringify(demoNotifications));
      }
    }
  }, [user]);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (user && notifications.length > 0) {
      localStorage.setItem(`notifications_${user.uid}`, JSON.stringify(notifications));
    }
  }, [notifications, user]);

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    
    setNotifications(prev => [newNotification, ...prev].slice(0, 50)); // Keep only last 50 notifications
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
  };
}