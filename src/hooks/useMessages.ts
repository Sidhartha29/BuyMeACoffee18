import { useState, useEffect } from 'react';
import { Message, Conversation, User } from '../types';

// Mock conversations data
const mockConversations: Conversation[] = [
  {
    id: '1',
    participants: [
      {
        id: '1',
        username: 'johndoe',
        displayName: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        followersCount: 1250,
        followingCount: 340,
        postsCount: 89,
        joinedAt: new Date('2023-01-15'),
      },
      {
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
    ],
    lastMessage: {
      id: '1',
      conversationId: '1',
      senderId: '2',
      receiverId: '1',
      content: 'Hey! Loved your latest song post. The melody is incredible!',
      createdAt: new Date('2024-01-15T16:30:00Z'),
      isRead: false,
    },
    updatedAt: new Date('2024-01-15T16:30:00Z'),
  },
  {
    id: '2',
    participants: [
      {
        id: '1',
        username: 'johndoe',
        displayName: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        followersCount: 1250,
        followingCount: 340,
        postsCount: 89,
        joinedAt: new Date('2023-01-15'),
      },
      {
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
    ],
    lastMessage: {
      id: '2',
      conversationId: '2',
      senderId: '1',
      receiverId: '3',
      content: 'Thanks for the coffee shop recommendation! I\'ll definitely check it out.',
      createdAt: new Date('2024-01-14T14:20:00Z'),
      isRead: true,
    },
    updatedAt: new Date('2024-01-14T14:20:00Z'),
  },
];

export const useMessages = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchConversations = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setConversations(mockConversations);
        setUnreadCount(mockConversations.filter(c => !c.lastMessage.isRead && c.lastMessage.receiverId === '1').length);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const sendMessage = async (conversationId: string, content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId: '1', // Current user
      receiverId: conversations.find(c => c.id === conversationId)?.participants.find(p => p.id !== '1')?.id || '',
      content,
      createdAt: new Date(),
      isRead: false,
    };

    setConversations(prev => 
      prev.map(conversation => 
        conversation.id === conversationId
          ? { ...conversation, lastMessage: newMessage, updatedAt: new Date() }
          : conversation
      )
    );
  };

  return {
    conversations,
    isLoading,
    unreadCount,
    sendMessage,
  };
};