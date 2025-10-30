import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { AuthUser, SignupData } from '../types';

interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: AuthUser }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<AuthUser> }
  | { type: 'UPDATE_STATS'; payload: { salesCount?: number; earnings?: number; imagesCount?: number } };

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<AuthUser>) => void;
  updateStats: (stats: { salesCount?: number; earnings?: number; imagesCount?: number }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      return {
        user: action.payload,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'AUTH_FAILURE':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        user: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    case 'UPDATE_STATS':
      return {
        ...state,
        user: state.user ? {
          ...state.user,
          salesCount: action.payload.salesCount ?? state.user.salesCount,
          totalEarnings: action.payload.earnings ?? state.user.totalEarnings,
          imagesCount: action.payload.imagesCount ?? state.user.imagesCount
        } : null,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isLoading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userData = localStorage.getItem('user_data');

    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        dispatch({ type: 'AUTH_SUCCESS', payload: { ...user, token } });
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
        dispatch({ type: 'AUTH_FAILURE' });
      }
    } else {
      dispatch({ type: 'AUTH_FAILURE' });
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({ type: 'AUTH_START' });

    try {
      // Mock API call - replace with actual API
      const mockUser: AuthUser = {
        id: '1',
        username: 'johnphotographer',
        displayName: 'John Photography',
        email: email,
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
        bio: 'Professional landscape and portrait photographer 📸 | Capturing moments since 2018',
        location: 'New York, USA',
        website: 'https://johnphotography.com',
        followersCount: 1250,
        followingCount: 340,

        // Marketplace specific fields
        role: 'photographer', // 'photographer' or 'buyer'
        isVerifiedSeller: true,
        salesCount: 247,
        totalEarnings: 12560.50,
        imagesCount: 89,
        averageRating: 4.8,
        reviewCount: 156,

        // Social links
        socialLinks: {
          instagram: 'john_photography',
          website: 'johnphotography.com'
        },

        // Equipment (for photographer profiles)
        equipment: [
          'Canon EOS R5',
          'Sony A7III',
          'DJI Mavic 3'
        ],

        specialties: [
          'Landscape',
          'Portrait',
          'Urban'
        ],

        joinedAt: new Date('2020-05-15'),
        token: 'mock_jwt_token',
      };

      localStorage.setItem('auth_token', mockUser.token);
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const signup = async (userData: SignupData) => {
    dispatch({ type: 'AUTH_START' });

    try {
      // Mock API call - replace with actual API
      const mockUser: AuthUser = {
        id: Date.now().toString(),
        username: userData.username,
        displayName: userData.displayName || userData.username,
        email: userData.email,
        avatar: `https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150`,
        bio: userData.bio || '',
        location: userData.location || '',
        website: userData.website || '',

        // Default marketplace fields for new users
        role: userData.role || 'buyer', // Default to buyer
        isVerifiedSeller: false,
        salesCount: 0,
        totalEarnings: 0,
        imagesCount: 0,
        averageRating: 0,
        reviewCount: 0,

        // Social links
        socialLinks: userData.socialLinks || {},

        // Equipment and specialties for photographers
        equipment: userData.equipment || [],
        specialties: userData.specialties || [],

        followersCount: 0,
        followingCount: 0,
        joinedAt: new Date(),
        token: 'mock_jwt_token',
      };

      localStorage.setItem('auth_token', mockUser.token);
      localStorage.setItem('user_data', JSON.stringify(mockUser));
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<AuthUser>) => {
    dispatch({ type: 'UPDATE_USER', payload: userData });
    if (state.user) {
      localStorage.setItem('user_data', JSON.stringify({ ...state.user, ...userData }));
    }
  };

  const updateStats = (stats: { salesCount?: number; earnings?: number; imagesCount?: number }) => {
    dispatch({ type: 'UPDATE_STATS', payload: stats });
    if (state.user) {
      const updatedUser = {
        ...state.user,
        salesCount: stats.salesCount ?? state.user.salesCount,
        totalEarnings: stats.earnings ?? state.user.totalEarnings,
        imagesCount: stats.imagesCount ?? state.user.imagesCount
      };
      localStorage.setItem('user_data', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      login,
      signup,
      logout,
      updateUser,
      updateStats,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};