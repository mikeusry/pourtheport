import { Cloudinary } from '@cloudinary/url-gen';

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
  }
});

/**
 * Generate optimized image URL from Cloudinary
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {Object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export function getOptimizedImage(publicId, options = {}) {
  const {
    width = 800,
    height,
    quality: imageQuality = 'auto'
  } = options;

  let image = cld.image(publicId);
  
  // Apply basic transformations
  if (width && height) {
    image = image.resize(`w_${width},h_${height},c_fill`);
  } else if (width) {
    image = image.resize(`w_${width},c_scale`);
  }
  
  // Apply quality
  if (imageQuality) {
    image = image.quality(imageQuality);
  }

  return image.toURL();
}

/**
 * Generate responsive image URLs for different screen sizes
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {Object} options - Base transformation options
 * @returns {Object} Object containing URLs for different screen sizes
 */
export function getResponsiveImageUrls(publicId, options = {}) {
  const baseOptions = { quality: 'auto', ...options };

  return {
    mobile: getOptimizedImage(publicId, { ...baseOptions, width: 480 }),
    tablet: getOptimizedImage(publicId, { ...baseOptions, width: 768 }),
    desktop: getOptimizedImage(publicId, { ...baseOptions, width: 1200 }),
    xl: getOptimizedImage(publicId, { ...baseOptions, width: 1920 })
  };
}

/**
 * Generate placeholder/blur image for lazy loading
 * @param {string} publicId - The public ID of the image
 * @returns {string} Low quality placeholder image URL
 */
export function getPlaceholderImage(publicId) {
  return getOptimizedImage(publicId, {
    width: 50,
    quality: 'auto:low'
  });
}

export default cld;