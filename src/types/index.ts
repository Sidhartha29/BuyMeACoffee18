export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  coverImage?: string;
  bio?: string;
  website?: string;
  location?: string;
  joinedAt: Date;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isFollowing?: boolean;
  isVerified?: boolean;
}

export interface Post {
  id: string;
  type: 'text' | 'review' | 'song';
  author: User;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  
  // Review-specific fields
  rating?: number;
  reviewTitle?: string;
  reviewImage?: string;
  
  // Song-specific fields
  songTitle?: string;
  songArtist?: string;
  songUrl?: string;
  songThumbnail?: string;
  songDuration?: number;
}

export interface Comment {
  id: string;
  postId: string;
  author: User;
  content: string;
  createdAt: Date;
  likesCount: number;
  isLiked?: boolean;
}

export interface AuthUser extends User {
  token: string;
}

export interface CreatePostData {
  type: 'text' | 'review' | 'song';
  content: string;
  rating?: number;
  reviewTitle?: string;
  reviewImage?: File;
  songTitle?: string;
  songArtist?: string;
  songFile?: File;
  songUrl?: string;
}
export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  fromUser: User;
  postId?: string;
  message: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  updatedAt: Date;
}