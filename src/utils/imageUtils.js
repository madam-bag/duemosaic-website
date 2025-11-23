/**
 * Converts a full-size image path to a thumbnail path
 * Assumes thumbnails are in a 'thumbnails' subfolder
 * Example: /images/folder/image.jpg -> /images/folder/thumbnails/image.jpg
 */
export const getThumbnailPath = (fullPath) => {
  if (!fullPath) return fullPath;
  
  // Extract folder and filename
  const lastSlash = fullPath.lastIndexOf('/');
  const folder = fullPath.substring(0, lastSlash);
  const filename = fullPath.substring(lastSlash + 1);
  
  // Return thumbnail path
  return `${folder}/thumbnails/${filename}`;
};

/**
 * Converts an array of image paths to objects with thumbnail and full paths
 */
export const processImages = (images) => {
  if (!images || !Array.isArray(images)) return [];
  
  return images.map(image => {
    if (typeof image === 'string') {
      // Legacy format: just a string path
      return {
        thumbnail: getThumbnailPath(image),
        full: image
      };
    } else {
      // New format: already an object with thumbnail and full
      return image;
    }
  });
};

/**
 * Gets thumbnail path from an image object or string
 */
export const getThumbnail = (image) => {
  if (!image) return image;
  if (typeof image === 'string') {
    return getThumbnailPath(image);
  }
  return image.thumbnail || image.full;
};

/**
 * Gets full-size path from an image object or string
 */
export const getFullImage = (image) => {
  if (!image) return image;
  if (typeof image === 'string') {
    return image;
  }
  return image.full || image.thumbnail;
};

