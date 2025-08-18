import { useState, useEffect } from 'react';
import { Notification } from '../types';

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'like',
    fromUser: {
      id: '2',
      username: 'musiclover',
      displayName: 'Alex Chen',
      email: 'alex@example.com',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      followersCount: 890,
      followingCount: 234,
      postsCount: 67,
      joinedAt: new Date('2023-03-10'),
      isVerified: true,
    },
    postId: '1',
    message: 'liked your post',
    createdAt: new Date('2024-01-15T14:30:00Z'),
    isRead: false,
  },
  {
    id: '2',
    type: 'follow',
    fromUser: {
      id: '3',
      username: 'coffeecritic',
      displayName: 'Sarah Williams',
      email: 'sarah@example.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      followersCount: 1540,
      followingCount: 412,
      postsCount: 156,
      joinedAt: new Date('2022-11-20'),
    },
    message: 'started following you',
    createdAt: new Date('2024-01-15T12:15:00Z'),
    isRead: false,
  },
  {
    id: '3',
    type: 'comment',
    fromUser: {
      id: '4',
      username: 'indiemusician',
      displayName: 'Maya Rodriguez',
      email: 'maya@example.com',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
      followersCount: 2340,
      followingCount: 189,
      postsCount: 89,
      joinedAt: new Date('2023-08-05'),
      isVerified: true,
    },
    postId: '2',
    message: 'commented on your review',
    createdAt: new Date('2024-01-14T18:45:00Z'),
    isRead: true,
  },
];

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setNotifications(mockNotifications);
        setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
    setUnreadCount(0);
  };

  return {
    notifications,
    isLoading,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
};