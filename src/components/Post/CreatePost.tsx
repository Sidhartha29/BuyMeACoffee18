import React, { useState } from 'react';
import { X, Image, Music, Star, Upload } from 'lucide-react';

interface CreatePostProps {
  onClose: () => void;
  onSubmit: (postData: any) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onClose, onSubmit }) => {
  const [postType, setPostType] = useState<'text' | 'review' | 'song'>('text');
  const [content, setContent] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxChars = 280;
  const remainingChars = maxChars - content.length;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);
    
    const postData = {
      type: postType,
      content: content.trim(),
      ...(postType === 'review' && {
        reviewTitle: reviewTitle.trim(),
        rating,
      }),
      ...(postType === 'song' && {
        songTitle: songTitle.trim(),
        songArtist: songArtist.trim(),
      }),
    };

    try {
      await onSubmit(postData);
      onClose();
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        className={`w-6 h-6 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
        } transition-colors`}
      >
        <Star className="w-full h-full fill-current" />
      </button>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Create Post</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Post Type Selector */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-1">
            <button
              type="button"
              onClick={() => setPostType('text')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                postType === 'text'
                  ? 'bg-primary-500 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Text Post
            </button>
            <button
              type="button"
              onClick={() => setPostType('review')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                postType === 'review'
                  ? 'bg-primary-500 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Review
            </button>
            <button
              type="button"
              onClick={() => setPostType('song')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                postType === 'song'
                  ? 'bg-primary-500 text-gray-900'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Song
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Review-specific fields */}
          {postType === 'review' && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="What are you reviewing?"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Rating:</span>
                <div className="flex space-x-1">{renderStars()}</div>
                <span className="text-sm text-gray-500">({rating}/5)</span>
              </div>
            </div>
          )}

          {/* Song-specific fields */}
          {postType === 'song' && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Song title"
                value={songTitle}
                onChange={(e) => setSongTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              />
              <input
                type="text"
                placeholder="Artist name"
                value={songArtist}
                onChange={(e) => setSongArtist(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Upload audio file or paste URL</p>
                <p className="text-xs text-gray-500 mt-1">MP3, WAV supported</p>
              </div>
            </div>
          )}

          {/* Content textarea */}
          <div className="space-y-2">
            <textarea
              placeholder={
                postType === 'text' ? "What's on your mind?" :
                postType === 'review' ? "Share your thoughts about this..." :
                "Tell us about this song..."
              }
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              rows={4}
              maxLength={maxChars}
              required
            />
            <div className="flex justify-between items-center text-sm">
              <span className={`${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
              </span>
            </div>
          </div>

          {/* Media upload for reviews */}
          {postType === 'review' && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <Image className="w-6 h-6 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Add a photo (optional)</p>
            </div>
          )}

          {/* Submit button */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!content.trim() || isSubmitting || (postType === 'review' && (!reviewTitle.trim() || rating === 0)) || (postType === 'song' && !songTitle.trim())}
              className="px-6 py-2 bg-primary-500 text-gray-900 rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;