import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/Post/ImageCard';
import CreatePost from '../components/Post/SellImage';
import { 
  Calendar, 
  MapPin, 
  Link as LinkIcon, 
  Edit3, 
  UserPlus, 
  UserCheck,
  Settings,
  Camera,
  PlusCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const Profile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const { user: currentUser, isAuthenticated } = useAuth();
  const { posts, isLoading, likePost, createPost } = usePosts(username === currentUser?.username ? currentUser.id : '2', 'profile');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'posts' | 'reviews' | 'songs'>('posts');

  // Mock user data - in real app, fetch based on username
  const profileUser = username === currentUser?.username ? currentUser : {
    id: '2',
    username: 'musiclover',
    displayName: 'Alex Chen',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
    coverImage: 'https://images.pexels.com/photos/1762851/pexels-photo-1762851.jpeg?auto=compress&cs=tinysrgb&w=800',
    bio: 'Indie music enthusiast and coffee connoisseur ☕ Sharing my favorite discoveries and original thoughts about music, life, and everything in between.',
    website: 'https://alexchen.music',
    location: 'San Francisco, CA',
    followersCount: 890,
    followingCount: 234,
    postsCount: 67,
    joinedAt: new Date('2023-03-10'),
    isVerified: true,
  };

  const isOwnProfile = currentUser?.username === username;

  const handleCreatePost = async (postData: any) => {
    await createPost(postData);
    setShowCreatePost(false);
  };

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'posts') return post.type === 'text';
    if (activeTab === 'reviews') return post.type === 'review';
    if (activeTab === 'songs') return post.type === 'song';
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Cover Image */}
        <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600">
          {profileUser?.coverImage && (
            <img
              src={profileUser.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          {isOwnProfile && (
            <button className="absolute top-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Profile Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-16 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={profileUser?.avatar}
                    alt={profileUser?.displayName}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                  />
                  {isOwnProfile && (
                    <button className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Profile Info */}
                <div className="flex-1 mt-4 sm:mt-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h1 className="text-2xl font-bold text-gray-900">{profileUser?.displayName}</h1>
                        {profileUser?.isVerified && (
                          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600">@{profileUser?.username}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                      {isOwnProfile ? (
                        <>
                          <button
                            onClick={() => setShowCreatePost(true)}
                            className="bg-primary-500 text-gray-900 px-4 py-2 rounded-full hover:bg-primary-600 transition-colors font-medium flex items-center space-x-2"
                          >
                            <PlusCircle className="w-4 h-4" />
                            <span>Create</span>
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2">
                            <Edit3 className="w-4 h-4" />
                            <span>Edit Profile</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={handleFollow}
                            className={`px-6 py-2 rounded-full font-medium transition-colors flex items-center space-x-2 ${
                              isFollowing
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-primary-500 text-gray-900 hover:bg-primary-600'
                            }`}
                          >
                            {isFollowing ? <UserCheck className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                            <span>{isFollowing ? 'Following' : 'Follow'}</span>
                          </button>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition-colors">
                            Message
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Bio and Details */}
                  <div className="mt-4 space-y-3">
                    {profileUser?.bio && (
                      <p className="text-gray-800 leading-relaxed">{profileUser.bio}</p>
                    )}
                    
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      {profileUser?.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin className="w-4 h-4" />
                          <span>{profileUser.location}</span>
                        </div>
                      )}
                      {profileUser?.website && (
                        <div className="flex items-center space-x-1">
                          <LinkIcon className="w-4 h-4" />
                          <a
                            href={profileUser.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:underline"
                          >
                            {profileUser.website.replace('https://', '')}
                          </a>
                        </div>
                      )}
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {formatDistanceToNow(profileUser?.joinedAt || new Date(), { addSuffix: true })}</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-6 text-sm">
                      <div>
                        <span className="font-semibold text-gray-900">{profileUser?.followingCount}</span>
                        <span className="text-gray-600 ml-1">Following</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">{profileUser?.followersCount}</span>
                        <span className="text-gray-600 ml-1">Followers</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">{profileUser?.postsCount}</span>
                        <span className="text-gray-600 ml-1">Posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white border-b border-gray-200 sticky top-16 z-10">
          <div className="px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8">
              {[
                { key: 'posts', label: 'Posts', count: posts.filter(p => p.type === 'text').length },
                { key: 'reviews', label: 'Reviews', count: posts.filter(p => p.type === 'review').length },
                { key: 'songs', label: 'Songs', count: posts.filter(p => p.type === 'song').length },
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === key
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Posts Content */}
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="space-y-6">
            {isLoading ? (
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl p-6 animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded w-32"></div>
                        <div className="h-3 bg-gray-300 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded"></div>
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} onLike={likePost} />
              ))
            ) : (
              <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PlusCircle className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {activeTab} yet
                </h3>
                <p className="text-gray-600 mb-6">
                  {isOwnProfile 
                    ? `Start sharing your ${activeTab} with the community!`
                    : `${profileUser?.displayName} hasn't shared any ${activeTab} yet.`
                  }
                </p>
                {isOwnProfile && (
                  <button
                    onClick={() => setShowCreatePost(true)}
                    className="bg-primary-500 text-gray-900 px-6 py-3 rounded-full hover:bg-primary-600 transition-colors font-medium"
                  >
                    Create Your First Post
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Create Post Modal */}
        {showCreatePost && (
          <CreatePost
            onClose={() => setShowCreatePost(false)}
            onSubmit={handleCreatePost}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;