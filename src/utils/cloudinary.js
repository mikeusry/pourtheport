import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { auto as formatAuto } from '@cloudinary/url-gen/qualifiers/format';

// Initialize Cloudinary instance
// Replace 'your-cloud-name' with your actual Cloudinary cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
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
    crop = 'fill',
    format: imageFormat = 'auto',
    quality: imageQuality = 'auto',
    blur,
    overlay,
    gravity = 'auto'
  } = options;

  let image = cld.image(publicId);

  // Apply auto format and quality for optimal delivery  
  image = image.delivery(format(formatAuto())).delivery(quality(imageQuality));

  // Apply resize transformation
  if (height) {
    image = image.resize(auto().width(width).height(height).gravity(autoGravity()));
  } else {
    image = image.resize(auto().width(width).gravity(autoGravity()));
  }

  // Apply additional transformations
  if (blur) {
    image = image.effect(`blur:${blur}`);
  }

  if (overlay) {
    image = image.overlay(overlay);
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
  const baseOptions = { quality: 'auto', format: 'auto', ...options };

  return {
    mobile: getOptimizedImage(publicId, { ...baseOptions, width: 480 }),
    tablet: getOptimizedImage(publicId, { ...baseOptions, width: 768 }),
    desktop: getOptimizedImage(publicId, { ...baseOptions, width: 1200 }),
    xl: getOptimizedImage(publicId, { ...baseOptions, width: 1920 })
  };
}

/**
 * Generate image with text overlay for dynamic content
 * @param {string} backgroundId - Background image public ID
 * @param {string} text - Text to overlay
 * @param {Object} options - Styling options
 * @returns {string} Image URL with text overlay
 */
export function getImageWithText(backgroundId, text, options = {}) {
  const {
    width = 1200,
    height = 630,
    textColor = 'white',
    fontSize = 60,
    fontWeight = 'bold',
    fontFamily = 'Arial'
  } = options;

  return cld
    .image(backgroundId)
    .resize(auto().width(width).height(height).gravity(autoGravity()))
    .overlay(
      cld.text(text, {
        fontSize,
        fontWeight,
        fontFamily,
        color: textColor
      }).position().gravity('center')
    )
    .delivery(format(formatAuto()))
    .delivery(quality('auto'))
    .toURL();
}

/**
 * Generate placeholder/blur image for lazy loading
 * @param {string} publicId - The public ID of the image
 * @returns {string} Low quality placeholder image URL
 */
export function getPlaceholderImage(publicId) {
  return getOptimizedImage(publicId, {
    width: 50,
    quality: 'auto:low',
    blur: 400
  });
}

/**
 * Common image configurations for the Pour the PORT landing page
 */
export const imageConfigs = {
  hero: {
    width: 1920,
    height: 1080,
    crop: 'fill',
    quality: 'auto:good'
  },
  trustBadge: {
    width: 200,
    height: 200,
    crop: 'fit',
    quality: 'auto:good',
    format: 'png'
  },
  productImage: {
    width: 600,
    height: 600,
    crop: 'fit',
    quality: 'auto:best'
  },
  testimonial: {
    width: 400,
    height: 400,
    crop: 'fill',
    quality: 'auto:good'
  },
  ogImage: {
    width: 1200,
    height: 630,
    crop: 'fill',
    quality: 'auto:good'
  }
};

export default cld;