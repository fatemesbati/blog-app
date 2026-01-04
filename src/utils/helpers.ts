/**
 * Utility functions
 */

/**
 * Format date string to readable format
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  
  return date.toLocaleDateString('en-US', options);
};

/**
 * Validate URL format
 */
export const isValidUrl = (url: string): boolean => {
  if (!url) return true; // Empty URL is valid (optional field)
  
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};