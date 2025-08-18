import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { 
  FileText, 
  Star, 
  Music, 
  Image, 
  Upload, 
  X,
  Camera,
  Mic,
  Play,
  Pause
} from 'lucide-react';
import toast from 'react-hot-toast';

const Create: React.FC = () => {
  const navigate = useNavigate();
  const { createPost } = usePosts();
  const [postType, setPostType] = useState<'text' | 'review' | 'song'>('text');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [content, setContent] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [rating, setRating] = useState(0);
  const [reviewImage, setReviewImage] = useState<File | null>(null);
  const [reviewImagePreview, setReviewImagePreview] = useState<string>('');
  const [songTitle, setSongTitle] = useState('');
  const [songArtist, setSongArtist] = useState('');
  const [songFile, setSongFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const maxChars = 280;
  const remainingChars = maxChars - content.length;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReviewImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setReviewImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSongFile(file);
    }
  };

  const removeImage = () => {
    setReviewImage(null);
    setReviewImagePreview('');
  };

  const removeSong = () => {
    setSongFile(null);
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setRating(i + 1)}
        className={`w-8 h-8 ${
          i < rating ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'
        } transition-colors`}
      >
        <Star className="w-full h-full fill-current" />
      </button>
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (postType === 'review' && (!reviewTitle.trim() || rating === 0)) {
      toast.error('Please provide a title and rating for your review');
      return;
    }

    if (postType === 'song' && !songTitle.trim()) {
      toast.error('Please provide a song title');
      return;
    }

    setIsSubmitting(true);
    
    const postData = {
      type: postType,
      content: content.trim(),
      ...(postType === 'review' && {
        reviewTitle: reviewTitle.trim(),
        rating,
        reviewImage,
      }),
      ...(postType === 'song' && {
        songTitle: songTitle.trim(),
        songArtist: songArtist.trim(),
        songFile,
      }),
    };

    try {
      await createPost(postData);
      toast.success('Post created successfully!');
      navigate('/home');
    } catch (error) {
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const postTypes = [
    {
      type: 'text' as const,
      label: 'Text Post',
      icon: FileText,
      description: 'Share your thoughts and ideas',
      color: 'blue',
    },
    {
      type: 'review' as const,
      label: 'Review',
      icon: Star,
      description: 'Review places, products, or experiences',
      color: 'yellow',
    },
    {
      type: 'song' as const,
      label: 'Song',
      icon: Music,
      description: 'Share music and audio content',
      color: 'purple',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Post</h1>
          <p className="text-gray-600">Share your thoughts, reviews, or music with the community</p>
        </div>

        {/* Post Type Selection */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Post Type</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {postTypes.map(({ type, label, icon: Icon, description, color }) => (
              <button
                key={type}
                onClick={() => setPostType(type)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  postType === type
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`w-6 h-6 ${
                    postType === type ? 'text-primary-600' : 'text-gray-400'
                  }`} />
                  <span className={`font-medium ${
                    postType === type ? 'text-gray-900' : 'text-gray-900'
                  }`}>
                    {label}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Create Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Review-specific fields */}
            {postType === 'review' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What are you reviewing? *
                  </label>
                  <input
                    type="text"
                    placeholder="Restaurant, coffee shop, album, book..."
                    value={reviewTitle}
                    onChange={(e) => setReviewTitle(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">{renderStars()}</div>
                    <span className="text-sm text-gray-500 ml-3">
                      {rating > 0 ? `${rating}/5` : 'Select a rating'}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Add Photo (Optional)
                  </label>
                  {reviewImagePreview ? (
                    <div className="relative">
                      <img
                        src={reviewImagePreview}
                        alt="Review"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors">
                      <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload an image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Song-specific fields */}
            {postType === 'song' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Song Title *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter song title"
                      value={songTitle}
                      onChange={(e) => setSongTitle(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Artist Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter artist name"
                      value={songArtist}
                      onChange={(e) => setSongArtist(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Audio File
                  </label>
                  {songFile ? (
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                            <Music className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{songFile.name}</p>
                            <p className="text-sm text-gray-500">
                              {(songFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            type="button"
                            onClick={() => setIsPlaying(!isPlaying)}
                            className="p-2 bg-primary-500 text-gray-900 rounded-full hover:bg-primary-600 transition-colors"
                          >
                            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                          </button>
                          <button
                            type="button"
                            onClick={removeSong}
                            className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <label className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors">
                      <Mic className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">Click to upload audio file</p>
                      <p className="text-xs text-gray-500 mt-1">MP3, WAV, M4A up to 10MB</p>
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            {/* Content textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {postType === 'text' ? 'What\'s on your mind?' : 
                 postType === 'review' ? 'Share your thoughts about this...' :
                 'Tell us about this song...'}
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                rows={6}
                maxLength={maxChars}
                placeholder={
                  postType === 'text' ? 'Share your thoughts...' :
                  postType === 'review' ? 'What did you think? How was your experience?' :
                  'What makes this song special? Share the story behind it...'
                }
                required
              />
              <div className="flex justify-between items-center mt-2">
                <span className={`text-sm ${remainingChars < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                  {remainingChars} characters remaining
                </span>
              </div>
            </div>

            {/* Submit buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  !content.trim() || 
                  isSubmitting || 
                  (postType === 'review' && (!reviewTitle.trim() || rating === 0)) || 
                  (postType === 'song' && !songTitle.trim())
                }
                className="px-8 py-3 bg-primary-500 text-gray-900 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>{isSubmitting ? 'Publishing...' : 'Publish Post'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;