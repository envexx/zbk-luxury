/**
 * Utility function to get the correct image path
 * For uploaded files (after build), use API route
 * For static files (in build), use direct path
 */
export function getImagePath(imagePath: string | undefined | null, fallback: string = '/4.-alphard-colors-black.png'): string {
  if (!imagePath) {
    return fallback
  }
  
  // If image is from uploads folder, use API route
  if (imagePath.startsWith('/uploads/')) {
    // Convert /uploads/vehicles/filename.png to /api/uploads/vehicles/filename.png
    return imagePath.replace('/uploads/', '/api/uploads/')
  }
  
  // For other paths (static files), return as is
  return imagePath
}

/**
 * Check if image path is from uploads
 */
export function isUploadedImage(imagePath: string | undefined | null): boolean {
  return imagePath?.startsWith('/uploads/') ?? false
}

