import { useState, useEffect } from 'react';
import { Message, Conversation } from '../types';

// Mock messages data
const mockMessages: Message[] = [
  {
    id: '1',
    conversationId: '1',
    senderId: '2',
    receiverId: '1',
    content: 'Hi! I\'m interested in your landscape photo. Is it available for commercial use?',
    createdAt: new Date('2024-01-15T14:30:00Z'),
    isRead: false,
    type: 'text',
  },
  {
    id: '2',
    conversationId: '1',
    senderId: '1',
    receiverId: '2',
    content: 'Hello! Yes, it is available for commercial licensing. The price would be $50 for commercial use.',
    createdAt: new Date('2024-01-15T14:35:00Z'),
    isRead: true,
    type: 'text',
  },
];

const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: '1',
        username: 'photographer',
        displayName: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
        followersCount: 1200,
        followingCount: 300,
        postsCount: 45,
        joinedAt: new Date('2023-01-15'),
        isVerified: true,
      },
      {
        id: '2',
        username: 'buyer',
        displayName: 'Jane Smith',
        email: 'jane@example.com',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        followersCount: 500,
        followingCount: 150,
        postsCount: 20,
        joinedAt: new Date('2023-06-10'),
      },
    ],
    lastMessage: mockMessages[0],
    updatedAt: new Date('2024-01-15T14:30:00Z'),
    context: 'commercial_license',
  },
];

export const useMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchMessages = async () => {
      setIsLoading(true);

      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setMessages(mockMessages);
        setConversations(mockConversations);
        setUnreadCount(mockMessages.filter(m => !m.isRead).length);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const markAsRead = (messageId: string) => {
    setMessages(prev =>
      prev.map(message =>
        message.id === messageId
          ? { ...message, isRead: true }
          : message
      )
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const sendMessage = (conversationId: string, content: string, type: 'text' | 'image' | 'system' = 'text') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId: '1', // Current user ID
      receiverId: '2', // Other participant ID
      content,
      createdAt: new Date(),
      isRead: false,
      type,
    };

    setMessages(prev => [...prev, newMessage]);
    setConversations(prev =>
      prev.map(conv =>
        conv.id === conversationId
          ? { ...conv, lastMessage: newMessage, updatedAt: new Date() }
          : conv
      )
    );
  };

  return {
    messages,
    conversations,
    isLoading,
    unreadCount,
    markAsRead,
    sendMessage,
  };
};
