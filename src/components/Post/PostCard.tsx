import React, { useState } from 'react';
import { Post } from '../../types';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Star, 
  Play, 
  Pause,
  Volume2,
  MoreHorizontal,
  Clock
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLike }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLike = () => {
    onLike(post.id);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <article className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Post Header */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={post.author.avatar}
              alt={post.author.displayName}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="flex items-center space-x-1">
                <h3 className="font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                  {post.author.displayName}
                </h3>
                {post.author.isVerified && (
                  <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>@{post.author.username}</span>
                <span>•</span>
                <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        {/* Review Title */}
        {post.type === 'review' && post.reviewTitle && (
          <div className="mb-2">
            <h4 className="text-lg font-semibold text-gray-900">{post.reviewTitle}</h4>
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(post.rating || 0)}
              <span className="text-sm text-gray-600 ml-2">{post.rating}/5</span>
            </div>
          </div>
        )}

        {/* Song Title */}
        {post.type === 'song' && (
          <div className="mb-3">
            <h4 className="text-lg font-semibold text-gray-900">{post.songTitle}</h4>
            {post.songArtist && (
              <p className="text-gray-600">{post.songArtist}</p>
            )}
          </div>
        )}

        {/* Post Text */}
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Media Content */}
      {post.type === 'review' && post.reviewImage && (
        <div className="px-4 pb-3">
          <img
            src={post.reviewImage}
            alt="Review"
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
      )}

      {post.type === 'song' && (
        <div className="px-4 pb-3">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
            <div className="flex items-center space-x-4">
              {post.songThumbnail && (
                <img
                  src={post.songThumbnail}
                  alt="Song thumbnail"
                  className="w-16 h-16 rounded-lg object-cover"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 bg-primary-500 hover:bg-primary-600 rounded-full flex items-center justify-center text-gray-900 transition-colors"
                  >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(post.songDuration || 0)}</span>
                  </div>
                </div>
                {/* Waveform placeholder */}
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: 40 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-1 bg-primary-400 rounded-full ${
                        i < 15 ? 'h-6' : i < 25 ? 'h-4' : 'h-2'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>0:00</span>
                  <Volume2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Post Actions */}
      <div className="border-t border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 text-sm transition-colors ${
                post.isLiked
                  ? 'text-primary-600 hover:text-primary-700'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span>{post.likesCount}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-primary-600 transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span>{post.commentsCount}</span>
            </button>
            
            <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600 transition-colors">
              <Share className="w-5 h-5" />
              <span>{post.sharesCount}</span>
            </button>
          </div>

          {/* Post type indicator */}
          <div className="flex items-center">
            {post.type === 'review' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Review
              </span>
            )}
            {post.type === 'song' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Song
              </span>
            )}
            {post.type === 'text' && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                Post
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;