import { useState, useEffect } from 'react';
import { Post } from '../types';

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    type: 'text',
    author: {
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
    content: 'Just discovered this amazing indie band! Their sound is absolutely incredible. Can\'t stop listening to their latest album 🎵',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z'),
    likesCount: 24,
    commentsCount: 5,
    sharesCount: 3,
    isLiked: false,
  },
  {
    id: '2',
    type: 'review',
    author: {
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
    content: 'Absolutely loved this coffee shop experience! The atmosphere was perfect for working, and the baristas really know their craft.',
    reviewTitle: 'Blue Bottle Coffee - Oakland',
    rating: 5,
    reviewImage: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
    createdAt: new Date('2024-01-14T16:20:00Z'),
    updatedAt: new Date('2024-01-14T16:20:00Z'),
    likesCount: 18,
    commentsCount: 7,
    sharesCount: 2,
    isLiked: true,
  },
  {
    id: '3',
    type: 'song',
    author: {
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
    content: 'Here\'s a new track I\'ve been working on. It\'s inspired by those quiet moments when you\'re watching the sunrise with your coffee ☕',
    songTitle: 'Morning Light',
    songArtist: 'Maya Rodriguez',
    songThumbnail: 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=300',
    songDuration: 180,
    createdAt: new Date('2024-01-13T09:15:00Z'),
    updatedAt: new Date('2024-01-13T09:15:00Z'),
    likesCount: 47,
    commentsCount: 12,
    sharesCount: 8,
    isLiked: false,
  }
];

export const usePosts = (userId?: string, type: 'home' | 'explore' | 'profile' = 'home') => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredPosts = mockPosts;
        
        if (type === 'profile' && userId) {
          filteredPosts = mockPosts.filter(post => post.author.id === userId);
        }
        
        setPosts(filteredPosts);
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [userId, type]);

  const likePost = async (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likesCount: post.isLiked ? post.likesCount - 1 : post.likesCount + 1
          }
        : post
    ));
  };

  const createPost = async (postData: any) => {
    const newPost: Post = {
      id: Date.now().toString(),
      type: postData.type,
      author: {
        id: '1',
        username: 'johndoe',
        displayName: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        followersCount: 1250,
        followingCount: 340,
        postsCount: 90,
        joinedAt: new Date('2023-01-15'),
      },
      content: postData.content,
      createdAt: new Date(),
      updatedAt: new Date(),
      likesCount: 0,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: false,
      ...postData,
    };
    
    setPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  return {
    posts,
    isLoading,
    error,
    likePost,
    createPost,
  };
};