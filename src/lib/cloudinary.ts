/**
 * Cloudinary Utility Functions for Pour the PORT
 * 
 * This module provides utilities for generating optimized Cloudinary URLs
 * with transformations, responsive image sets, and modern web standards.
 */

// Comprehensive Cloudinary transformation options
export interface CloudinaryTransforms {
  // Dimensions
  width?: number;
  height?: number;
  aspectRatio?: string; // e.g., "16:9", "1:1", "4:3"
  
  // Cropping and positioning
  crop?: 'fill' | 'fit' | 'scale' | 'crop' | 'thumb' | 'pad' | 'limit' | 'mfit' | 'mpad' | 'lfill' | 'lpad';
  gravity?: 'auto' | 'center' | 'face' | 'faces' | 'body' | 'north' | 'south' | 'east' | 'west' | 
           'north_east' | 'north_west' | 'south_east' | 'south_west' | 'xy_center' | 'adv_face' | 'adv_faces' | 'adv_eyes';
  
  // Quality and format
  quality?: 'auto' | 'auto:best' | 'auto:good' | 'auto:low' | 'auto:eco' | number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png' | 'gif' | 'svg' | 'bmp' | 'tiff';
  fetchFormat?: 'auto' | 'webp' | 'avif';
  
  // Device pixel ratio support
  dpr?: 'auto' | number; // 1.0, 1.5, 2.0, 3.0
  
  // Basic adjustments
  brightness?: number; // -100 to 100
  contrast?: number; // -100 to 100
  saturation?: number; // -100 to 100
  gamma?: number; // -100 to 100
  vibrance?: number; // -100 to 100
  
  // Color adjustments
  hue?: number; // -180 to 180
  opacity?: number; // 0 to 100
  
  // Effects
  blur?: number; // 1 to 2000
  sharpen?: number; // 1 to 400
  unsharpMask?: string; // "strength:amount:radius:threshold" e.g., "80:0.5:2:0"
  
  // Artistic effects
  sepia?: number; // 1 to 100
  grayscale?: boolean;
  blackwhite?: string; // "threshold" e.g., "40"
  negate?: boolean;
  
  // Advanced effects
  oilPaint?: number; // 1 to 100
  vignette?: number | string; // strength or "strength:x:y"
  pixelate?: number; // 1 to 200
  
  // Borders and overlays
  border?: string; // "width_color" e.g., "5_black" or "3_rgb:ff0000"
  
  // Background
  background?: string; // color name, hex, or rgb
  
  // Rotation and distortion
  angle?: number; // -360 to 360
  
  // Flags
  progressive?: boolean;
  immutableCache?: boolean;
  stripProfile?: boolean;
  
  // Advanced transformations
  customTransform?: string; // Raw transformation string for complex effects
}

// Responsive breakpoints configuration
export const RESPONSIVE_BREAKPOINTS = {
  mobile: 400,
  tablet: 800,
  desktop: 1200,
  large: 1600,
} as const;

/**
 * Get Cloudinary cloud name from environment variables
 */
export function getCloudName(): string {
  if (typeof import.meta !== 'undefined' && import.meta.env) {
    return import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
  }
  // Fallback for server-side rendering
  return process?.env?.PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo';
}

/**
 * Build a Cloudinary URL with comprehensive transformations
 * 
 * @param publicId - The public ID of the image in Cloudinary
 * @param transforms - Transformation options
 * @returns Optimized Cloudinary URL
 */
export function buildCloudinaryUrl(
  publicId: string,
  transforms: CloudinaryTransforms = {}
): string {
  const cloudName = getCloudName();
  const baseUrl = `https://res.cloudinary.com/${cloudName}/image/upload`;
  
  // Build transformation string
  const transformParts: string[] = [];
  
  // Dimensions
  if (transforms.width) transformParts.push(`w_${transforms.width}`);
  if (transforms.height) transformParts.push(`h_${transforms.height}`);
  if (transforms.aspectRatio) transformParts.push(`ar_${transforms.aspectRatio}`);
  
  // Device pixel ratio
  if (transforms.dpr) transformParts.push(`dpr_${transforms.dpr}`);
  
  // Cropping and fitting
  if (transforms.crop) transformParts.push(`c_${transforms.crop}`);
  if (transforms.gravity) transformParts.push(`g_${transforms.gravity}`);
  
  // Quality and format
  if (transforms.quality) transformParts.push(`q_${transforms.quality}`);
  
  // Use fetchFormat if available, otherwise use format
  if (transforms.fetchFormat) {
    transformParts.push(`f_${transforms.fetchFormat}`);
  } else if (transforms.format) {
    transformParts.push(`f_${transforms.format}`);
  }
  
  // Basic adjustments
  if (transforms.brightness !== undefined) transformParts.push(`e_brightness:${transforms.brightness}`);
  if (transforms.contrast !== undefined) transformParts.push(`e_contrast:${transforms.contrast}`);
  if (transforms.saturation !== undefined) transformParts.push(`e_saturation:${transforms.saturation}`);
  if (transforms.gamma !== undefined) transformParts.push(`e_gamma:${transforms.gamma}`);
  if (transforms.vibrance !== undefined) transformParts.push(`e_vibrance:${transforms.vibrance}`);
  
  // Color adjustments
  if (transforms.hue !== undefined) transformParts.push(`e_hue:${transforms.hue}`);
  if (transforms.opacity !== undefined) transformParts.push(`o_${transforms.opacity}`);
  
  // Effects
  if (transforms.blur) transformParts.push(`e_blur:${transforms.blur}`);
  if (transforms.sharpen) transformParts.push(`e_sharpen:${transforms.sharpen}`);
  if (transforms.unsharpMask) transformParts.push(`e_unsharp_mask:${transforms.unsharpMask}`);
  
  // Artistic effects
  if (transforms.sepia) transformParts.push(`e_sepia:${transforms.sepia}`);
  if (transforms.grayscale) transformParts.push('e_grayscale');
  if (transforms.blackwhite) transformParts.push(`e_blackwhite:${transforms.blackwhite}`);
  if (transforms.negate) transformParts.push('e_negate');
  if (transforms.oilPaint) transformParts.push(`e_oil_paint:${transforms.oilPaint}`);
  if (transforms.vignette) transformParts.push(`e_vignette${typeof transforms.vignette === 'number' ? ':' + transforms.vignette : ':' + transforms.vignette}`);
  if (transforms.pixelate) transformParts.push(`e_pixelate:${transforms.pixelate}`);
  
  // Borders and backgrounds
  if (transforms.border) transformParts.push(`bo_${transforms.border}`);
  if (transforms.background) transformParts.push(`b_${transforms.background}`);
  
  // Rotation
  if (transforms.angle) transformParts.push(`a_${transforms.angle}`);
  
  // Flags
  if (transforms.progressive) transformParts.push('fl_progressive');
  if (transforms.immutableCache) transformParts.push('fl_immutable_cache');
  if (transforms.stripProfile) transformParts.push('fl_strip_profile');
  
  // Custom transformations
  if (transforms.customTransform) transformParts.push(transforms.customTransform);
  
  // Combine transformation parts
  const transformString = transformParts.length > 0 ? transformParts.join(',') + '/' : '';
  
  return `${baseUrl}/${transformString}${publicId}`;
}

/**
 * Generate responsive image srcset for different screen sizes
 * 
 * @param publicId - The public ID of the image in Cloudinary
 * @param baseTransforms - Base transformation options
 * @returns Object with srcset string and sizes attribute
 */
export function getCloudinaryResponsiveSet(
  publicId: string,
  baseTransforms: CloudinaryTransforms = {}
): { srcset: string; sizes: string } {
  const breakpoints = Object.values(RESPONSIVE_BREAKPOINTS);
  
  // Generate srcset entries for each breakpoint
  const srcsetEntries = breakpoints.map(width => {
    const url = buildCloudinaryUrl(publicId, {
      ...baseTransforms,
      width,
      crop: baseTransforms.crop || 'fill',
      quality: baseTransforms.quality || 'auto',
      format: 'webp'
    });
    return `${url} ${width}w`;
  });
  
  // Default sizes attribute - can be customized per use case
  const sizes = '(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1440px) 1200px, 1600px';
  
  return {
    srcset: srcsetEntries.join(', '),
    sizes
  };
}

/**
 * Generate optimized image URL with smart defaults
 * 
 * @param publicId - The public ID of the image in Cloudinary
 * @param options - Transformation options with smart defaults
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: CloudinaryTransforms['quality'];
    crop?: CloudinaryTransforms['crop'];
    format?: boolean; // If true, uses f_auto
  } = {}
): string {
  const transforms: CloudinaryTransforms = {
    width: options.width,
    height: options.height,
    quality: options.quality || 'auto',
    crop: options.crop || 'fill',
  };
  
  // Add automatic format optimization
  if (options.format !== false) {
    transforms.fetchFormat = 'auto';
  }
  
  return buildCloudinaryUrl(publicId, transforms);
}

/**
 * Generate placeholder image URL (low quality, small size, blurred)
 * Perfect for lazy loading implementations
 * 
 * @param publicId - The public ID of the image in Cloudinary
 * @returns Low-quality placeholder URL
 */
export function getPlaceholderUrl(publicId: string): string {
  return buildCloudinaryUrl(publicId, {
    width: 50,
    quality: 'auto:low',
    blur: 400,
    fetchFormat: 'auto'
  });
}

/**
 * Common image configurations for different use cases
 */
export const IMAGE_CONFIGS = {
  // Hero/banner images
  hero: {
    quality: 'auto:good' as const,
    crop: 'fill' as const,
    format: 'webp' as const,
    sizes: '100vw'
  },
  
  // Product showcase images
  product: {
    quality: 'auto:best' as const,
    crop: 'fit' as const,
    format: 'webp' as const,
    sizes: '(max-width: 768px) 100vw, 50vw'
  },
  
  // Trust badges and logos
  logo: {
    quality: 'auto:good' as const,
    crop: 'fit' as const,
    format: 'png' as const,
    sizes: '200px'
  },
  
  // Thumbnail images
  thumbnail: {
    quality: 'auto' as const,
    crop: 'fill' as const,
    format: 'webp' as const,
    sizes: '(max-width: 640px) 150px, 200px'
  },
  
  // Background images
  background: {
    quality: 'auto:good' as const,
    crop: 'fill' as const,
    format: 'webp' as const,
    sizes: '100vw'
  }
} as const;

/**
 * Utility to get image config by type
 */
export function getImageConfig(type: keyof typeof IMAGE_CONFIGS) {
  return IMAGE_CONFIGS[type];
}

/**
 * Generate srcset with device pixel ratio support
 * 
 * @param publicId - The public ID of the image
 * @param baseTransforms - Base transformation options
 * @param supportDpr - Whether to include DPR variants
 * @returns Enhanced srcset with DPR support
 */
export function getCloudinaryDprSrcset(
  publicId: string,
  baseTransforms: CloudinaryTransforms = {},
  supportDpr = true
): { srcset: string; sizes: string } {
  const breakpoints = Object.values(RESPONSIVE_BREAKPOINTS);
  const dprValues = supportDpr ? [1, 1.5, 2] : [1];
  
  const srcsetEntries: string[] = [];
  
  breakpoints.forEach(width => {
    dprValues.forEach(dpr => {
      const url = buildCloudinaryUrl(publicId, {
        ...baseTransforms,
        width,
        dpr,
        crop: baseTransforms.crop || 'fill',
        quality: baseTransforms.quality || 'auto',
        fetchFormat: 'auto'
      });
      
      const descriptor = dpr === 1 ? `${width}w` : `${width * dpr}w`;
      srcsetEntries.push(`${url} ${descriptor}`);
    });
  });
  
  const sizes = '(max-width: 640px) 400px, (max-width: 1024px) 800px, (max-width: 1440px) 1200px, 1600px';
  
  return {
    srcset: srcsetEntries.join(', '),
    sizes
  };
}

/**
 * Validate Cloudinary public ID format
 * 
 * @param publicId - The public ID to validate
 * @returns Boolean indicating if the ID is valid
 */
export function validatePublicId(publicId: string): boolean {
  if (!publicId || typeof publicId !== 'string') return false;
  
  // Basic validation - should not be empty and contain valid characters
  const validIdRegex = /^[a-zA-Z0-9_\-\/\.]+$/;
  return validIdRegex.test(publicId) && publicId.length > 0;
}

/**
 * Generate fallback image URL for error states
 * 
 * @param width - Desired width
 * @param height - Desired height
 * @returns Cloudinary placeholder image URL
 */
export function getFallbackImageUrl(width = 400, height = 300): string {
  return buildCloudinaryUrl('sample', {
    width,
    height,
    crop: 'fill',
    quality: 'auto:low',
    background: 'gray'
  });
}

/**
 * Generate loading skeleton/placeholder with matching dimensions
 * 
 * @param width - Image width
 * @param height - Image height
 * @returns Data URL for gray placeholder
 */
export function getSkeletonDataUrl(width: number, height: number): string {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#e5e7eb"/><rect width="100%" height="100%" fill="url(#shimmer)"/><defs><linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:0.8"/><stop offset="50%" style="stop-color:#ffffff;stop-opacity:1"/><stop offset="100%" style="stop-color:#f3f4f6;stop-opacity:0.8"/><animateTransform attributeName="gradientTransform" type="translate" values="-100% 0;100% 0;-100% 0" dur="1.5s" repeatCount="indefinite"/></linearGradient></defs></svg>`;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Enhanced image configurations with DPR and device-specific settings
 */
export const ENHANCED_IMAGE_CONFIGS = {
  ...IMAGE_CONFIGS,
  
  // Avatar/profile images
  avatar: {
    quality: 'auto:good' as const,
    crop: 'fill' as const,
    gravity: 'face' as const,
    format: 'webp' as const,
    sizes: '(max-width: 640px) 80px, 120px',
    dpr: 'auto' as const
  },
  
  // Gallery thumbnails
  gallery: {
    quality: 'auto' as const,
    crop: 'fill' as const,
    format: 'webp' as const,
    sizes: '(max-width: 640px) 150px, (max-width: 1024px) 200px, 250px',
    dpr: 'auto' as const
  },
  
  // Card images
  card: {
    quality: 'auto:good' as const,
    crop: 'fill' as const,
    format: 'webp' as const,
    sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
    dpr: 'auto' as const
  }
} as const;