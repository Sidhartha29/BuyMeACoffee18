import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/Post/PostCard';
import CreatePost from '../components/Post/CreatePost';
import { PlusCircle, Coffee, Music, Star, Users } from 'lucide-react';

const Home: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const { posts, isLoading, likePost, createPost } = usePosts();
  const [showCreatePost, setShowCreatePost] = useState(false);

  const handleCreatePost = async (postData: any) => {
    await createPost(postData);
    setShowCreatePost(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-400 via-primary-500 to-primary-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-white bg-opacity-30 rounded-2xl flex items-center justify-center">
                  <Coffee className="w-8 h-8 text-gray-900" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Share Your Creative Journey
              </h1>
              <p className="text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
                Connect with fellow creators, share your music, write reviews, and build a community around your passions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Get Started Free
                </button>
                <button className="border-2 border-gray-900 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-900 hover:text-primary-500 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Everything You Need to Create</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Express yourself through multiple formats and connect with a community that appreciates creativity.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Coffee className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Thoughts</h3>
                <p className="text-gray-600">Post your thoughts, ideas, and creative insights with the community in tweet-style posts.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Music className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Music</h3>
                <p className="text-gray-600">Upload your original tracks or share songs you love with built-in audio players.</p>
              </div>
              
              <div className="text-center p-6">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Write Reviews</h3>
                <p className="text-gray-600">Review coffee shops, albums, books, or anything that inspires you with ratings and photos.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Join a Creative Community</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Follow your favorite creators, discover new voices, and engage with content that inspires you.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample creator cards */}
              {[
                {
                  name: 'Alex Chen',
                  username: 'musiclover',
                  avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
                  bio: 'Indie music enthusiast and coffee connoisseur',
                  followers: '1.2K'
                },
                {
                  name: 'Maya Rodriguez',
                  username: 'indiemusician',
                  avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
                  bio: 'Singer-songwriter sharing original music',
                  followers: '2.3K'
                },
                {
                  name: 'Sarah Williams',
                  username: 'coffeecritic',
                  avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
                  bio: 'Reviewing the best coffee spots worldwide',
                  followers: '1.5K'
                }
              ].map((creator) => (
                <div key={creator.username} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <img
                    src={creator.avatar}
                    alt={creator.name}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 text-center">{creator.name}</h3>
                  <p className="text-gray-600 text-center text-sm mb-2">@{creator.username}</p>
                  <p className="text-gray-600 text-center text-sm mb-4">{creator.bio}</p>
                  <div className="text-center">
                    <span className="text-sm text-gray-500">{creator.followers} followers</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4">
            <img
              src={user?.avatar}
              alt={user?.displayName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Welcome back, {user?.displayName}!
              </h1>
              <p className="text-gray-600">What would you like to share today?</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowCreatePost(true)}
           className="w-full mt-4 bg-primary-500 text-gray-900 px-4 py-3 rounded-full hover:bg-primary-600 transition-colors font-medium flex items-center justify-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Create Post</span>
          </button>
        </div>

        {/* Posts Feed */}
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
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} onLike={likePost} />
            ))
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
              <Coffee className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600 mb-6">Start following creators or create your first post!</p>
              <button
                onClick={() => setShowCreatePost(true)}
                className="bg-primary-500 text-gray-900 px-6 py-3 rounded-full hover:bg-primary-600 transition-colors font-medium"
              >
                Create Your First Post
              </button>
            </div>
          )}
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

export default Home;