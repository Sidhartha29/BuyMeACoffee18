import React, { useState } from 'react';
import { X, DollarSign, Tag, Upload, Camera } from 'lucide-react';

interface SellImageProps {
  onClose: () => void;
  onSubmit: (imageData: SellImageData) => void;
}

interface SellImageData {
  title: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  licenseType: 'standard' | 'commercial';
  imageFile: File;
  imagePreview: string;
}

const SellImage: React.FC<SellImageProps> = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [licenseType, setLicenseType] = useState<'standard' | 'commercial'>('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maxDescriptionChars = 500;
  const remainingChars = maxDescriptionChars - description.length;

  const categories = [
    'Nature',
    'Portrait',
    'Urban',
    'Travel',
    'Wildlife',
    'Architecture',
    'Food',
    'Sports',
    'Abstract',
    'Fashion'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }

      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Image size should be less than 10MB');
        return;
      }

      setImageFile(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !imageFile || !price) return;

    setIsSubmitting(true);

    const imageData: SellImageData = {
      title: title.trim(),
      description: description.trim(),
      price: parseFloat(price),
      category: category.trim(),
      tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      licenseType,
      imageFile,
      imagePreview
    };

    try {
      await onSubmit(imageData);
      onClose();
    } catch (error) {
      console.error('Failed to upload image:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Sell Your Image</h2>
          <button
            onClick={onClose}
            className="p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* Image Upload Section */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Upload Image *
            </label>

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-lg border border-gray-300"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-primary-400 transition-colors block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  required
                />
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 font-medium">
                  Click to upload your image
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  JPG, PNG, WEBP supported • Max 10MB
                </p>
              </label>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Image Title *
            </label>
            <input
              type="text"
              placeholder="Give your image a compelling title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              placeholder="Describe your image, equipment used, location, story behind the shot..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
              rows={3}
              maxLength={maxDescriptionChars}
            />
            <div className="flex justify-between items-center text-sm">
              <span className={`${remainingChars < 50 ? 'text-red-500' : 'text-gray-500'}`}>
                {remainingChars} characters remaining
              </span>
            </div>
          </div>

          {/* Price and Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Price ($) *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="number"
                  placeholder="0.00"
                  min="0.50"
                  step="0.50"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">Minimum price: $0.50</p>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="nature, sunset, mountain, landscape (separate with commas)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <p className="text-xs text-gray-500">
              Add relevant tags to help buyers find your image
            </p>
          </div>

          {/* License Type */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              License Type *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                licenseType === 'standard'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="licenseType"
                  value="standard"
                  checked={licenseType === 'standard'}
                  onChange={(e) => setLicenseType(e.target.value as 'standard')}
                  className="sr-only"
                />
                <div className="flex items-start space-x-3">
                  <div className={`w-4 h-4 mt-1 rounded-full border-2 ${
                    licenseType === 'standard'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`} />
                  <div>
                    <h4 className="font-medium text-gray-900">Standard License</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Personal use, social media, websites. No commercial redistribution.
                    </p>
                  </div>
                </div>
              </label>

              <label className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                licenseType === 'commercial'
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}>
                <input
                  type="radio"
                  name="licenseType"
                  value="commercial"
                  checked={licenseType === 'commercial'}
                  onChange={(e) => setLicenseType(e.target.value as 'commercial')}
                  className="sr-only"
                />
                <div className="flex items-start space-x-3">
                  <div className={`w-4 h-4 mt-1 rounded-full border-2 ${
                    licenseType === 'commercial'
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`} />
                  <div>
                    <h4 className="font-medium text-gray-900">Commercial License</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Advertising, products, commercial projects. Higher pricing recommended.
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!title.trim() || !imageFile || !price || !category || isSubmitting}
              className="px-6 py-2 bg-primary-500 text-gray-900 rounded-full hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors flex items-center space-x-2"
            >
              <Camera className="w-4 h-4" />
              <span>{isSubmitting ? 'Uploading...' : 'Sell Image'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellImage;
