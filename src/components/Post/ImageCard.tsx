import React, { useState } from 'react';
import { Image } from '../../types';
import { 
  Heart, 
  ShoppingCart, 
  Download, 
  Eye, 
  DollarSign,
  Tag,
  Camera,
  MoreHorizontal,
  Clock,
  Shield,
  TrendingUp
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ImageCardProps {
  image: Image;
  onLike: (imageId: string) => void;
  onAddToCart: (imageId: string) => void;
  onPreview: (imageId: string) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, onLike, onAddToCart, onPreview }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLike(image.id);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(image.id);
  };

  const handlePreview = () => {
    onPreview(image.id);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderLicenseBadge = (licenseType: string) => {
    const licenseConfig = {
      standard: { color: 'bg-blue-100 text-blue-800', label: 'Standard' },
      commercial: { color: 'bg-green-100 text-green-800', label: 'Commercial' },
      exclusive: { color: 'bg-purple-100 text-purple-800', label: 'Exclusive' }
    };

    const config = licenseConfig[licenseType as keyof typeof licenseConfig] || licenseConfig.standard;

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Shield className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  return (
    <article 
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handlePreview}
    >
      {/* Image Container with Overlay */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        {/* Main Image */}
        <img
          src={image.url}
          alt={image.title}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <Camera className="w-8 h-8 text-gray-400" />
          </div>
        )}

        {/* Watermark Overlay for Preview */}
        {!image.isPurchased && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {renderLicenseBadge(image.licenseType)}
          {image.isFeatured && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
              <TrendingUp className="w-3 h-3 mr-1" />
              Featured
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className={`absolute top-3 right-3 flex flex-col space-y-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}>
          <button
            onClick={handleLike}
            className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
              image.isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${image.isLiked ? 'fill-current' : ''}`} />
          </button>
          
          <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-white transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Info Overlay */}
        <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-white transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg truncate">{image.title}</h3>
            <div className="flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
              <DollarSign className="w-4 h-4" />
              <span className="font-bold">{image.price}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm opacity-90">
            <span className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{image.views.toLocaleString()} views</span>
            </span>
            <span className="flex items-center space-x-1">
              <Download className="w-4 h-4" />
              <span>{image.downloads.toLocaleString()}</span>
            </span>
          </div>
        </div>

        {/* Quick Action Button */}
        <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {image.isPurchased ? (
            <button className="bg-green-600 text-white px-6 py-2 rounded-full font-medium hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          ) : (
            <button 
              onClick={handleAddToCart}
              className="bg-primary-500 text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-primary-600 transition-colors flex items-center space-x-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <img
              src={image.author.avatar}
              alt={image.author.displayName}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 text-sm truncate">
                {image.author.displayName}
              </h4>
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatDistanceToNow(image.createdAt, { addSuffix: true })}</span>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="flex items-center space-x-3 text-xs text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="w-3 h-3" />
              <span>{image.likesCount}</span>
            </div>
          </div>
        </div>

        {/* Description */}
        {image.description && (
          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
            {image.description}
          </p>
        )}

        {/* Tags */}
        {image.tags && image.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {image.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {image.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                +{image.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Image Details */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span>{image.dimensions.width} × {image.dimensions.height}</span>
          <span>{formatFileSize(image.fileSize)}</span>
          <span>{image.fileType.toUpperCase()}</span>
        </div>
      </div>
    </article>
  );
};

export default ImageCard;