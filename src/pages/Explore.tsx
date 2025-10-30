import React, { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import PostCard from '../components/Post/ImageCard';
import { Search, Filter, TrendingUp, Users, Music, Star } from 'lucide-react';

const Explore: React.FC = () => {
  const { posts, isLoading, likePost } = usePosts(undefined, 'explore');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'text' | 'review' | 'song'>('all');

  const trendingTopics = [
    { name: 'Coffee Culture', count: '2.1K posts' },
    { name: 'Indie Music', count: '1.8K posts' },
    { name: 'Local Reviews', count: '1.5K posts' },
    { name: 'Creative Process', count: '980 posts' },
    { name: 'Music Production', count: '760 posts' },
  ];

  const suggestedCreators = [
    {
      id: '2',
      username: 'musiclover',
      displayName: 'Alex Chen',
      avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Indie music enthusiast and coffee connoisseur',
      followersCount: 890,
      isVerified: true,
    },
    {
      id: '3',
      username: 'coffeecritic',
      displayName: 'Sarah Williams',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Reviewing the best coffee spots worldwide',
      followersCount: 1540,
      isVerified: false,
    },
    {
      id: '4',
      username: 'indiemusician',
      displayName: 'Maya Rodriguez',
      avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
      bio: 'Singer-songwriter sharing original music',
      followersCount: 2340,
      isVerified: true,
    },
  ];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || post.type === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Explore</h1>
              <p className="text-gray-600">Discover amazing content from creators around the world</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search posts, creators, topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                {/* Filter Buttons */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-gray-400" />
                  <div className="flex space-x-1">
                    {[
                      { key: 'all', label: 'All', icon: null },
                      { key: 'text', label: 'Posts', icon: null },
                      { key: 'review', label: 'Reviews', icon: Star },
                      { key: 'song', label: 'Music', icon: Music },
                    ].map(({ key, label, icon: Icon }) => (
                      <button
                        key={key}
                        onClick={() => setSelectedFilter(key as any)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-1 ${
                          selectedFilter === key
                            ? 'bg-primary-500 text-gray-900'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
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
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} onLike={likePost} />
                ))
              ) : (
                <div className="bg-white rounded-xl p-12 text-center shadow-sm border border-gray-200">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                  <p className="text-gray-600">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Trending Topics */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">Trending Topics</h2>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <button
                    key={index}
                    className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      #{topic.name.replace(' ', '')}
                    </h3>
                    <p className="text-sm text-gray-500">{topic.count}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Suggested Creators */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="w-5 h-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-gray-900">Suggested Creators</h2>
              </div>
              <div className="space-y-4">
                {suggestedCreators.map((creator) => (
                  <div key={creator.id} className="flex items-start space-x-3">
                    <img
                      src={creator.avatar}
                      alt={creator.displayName}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-1">
                        <h3 className="font-medium text-gray-900 truncate hover:text-blue-600 cursor-pointer">
                          {creator.displayName}
                        </h3>
                        {creator.isVerified && (
                          <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-1">@{creator.username}</p>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{creator.bio}</p>
                      <button className="text-xs bg-primary-500 text-gray-900 px-3 py-1 rounded-full hover:bg-primary-600 transition-colors font-medium">
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gradient-to-r from-primary-400 to-primary-600 rounded-xl p-6 text-gray-900">
              <h2 className="text-lg font-semibold mb-4">Platform Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Active Creators</span>
                  <span className="font-semibold">12.5K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Posts Today</span>
                  <span className="font-semibold">2.8K</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Songs Shared</span>
                  <span className="font-semibold">890</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Reviews Written</span>
                  <span className="font-semibold">1.2K</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;