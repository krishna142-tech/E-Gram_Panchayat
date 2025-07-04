// File storage service for handling document uploads and downloads
export interface StoredFile {
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: Date;
}

// Convert file to base64 for storage (for demo purposes)
// In production, you would use Firebase Storage, AWS S3, etc.
export const uploadFile = async (file: File): Promise<StoredFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      try {
        const base64Data = reader.result as string;
        
        // Generate a unique file ID
        const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        const storedFile: StoredFile = {
          name: file.name,
          size: file.size,
          type: file.type,
          url: fileId,
          uploadedAt: new Date(),
        };
        
        // Store file data with metadata
        const fileData = {
          ...storedFile,
          data: base64Data,
        };
        
        // Check if localStorage has enough space
        const dataString = JSON.stringify(fileData);
        const dataSize = new Blob([dataString]).size;
        
        if (dataSize > 4.5 * 1024 * 1024) { // 4.5MB limit for localStorage
          reject(new Error('File too large for storage. Please use a smaller file.'));
          return;
        }
        
        localStorage.setItem(fileId, dataString);
        console.log('File stored successfully:', fileId, 'Size:', dataSize);
        
        // Verify the file was stored
        const verification = localStorage.getItem(fileId);
        if (!verification) {
          reject(new Error('Failed to verify file storage'));
          return;
        }
        
        resolve(storedFile);
      } catch (error) {
        console.error('Error storing file:', error);
        if (error instanceof Error && error.message.includes('QuotaExceededError')) {
          reject(new Error('Storage quota exceeded. Please clear some space and try again.'));
        } else {
          reject(new Error('Failed to store file'));
        }
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

// Download/view file
export const downloadFile = (fileId: string): void => {
  try {
    const storedData = localStorage.getItem(fileId);
    
    if (!storedData) {
      console.error('File not found:', fileId);
      throw new Error('File not found or has been removed');
    }
    
    const fileData = JSON.parse(storedData);
    
    // Create download link
    const link = document.createElement('a');
    link.href = fileData.data;
    link.download = fileData.name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error('Failed to download file');
  }
};

// Get file for viewing
export const getFileData = (fileId: string): { name: string; data: string; type: string; size: number } | null => {
  try {
    const storedData = localStorage.getItem(fileId);
    
    if (!storedData) {
      console.error('File not found:', fileId);
      // List all stored files for debugging
      const allKeys = Object.keys(localStorage).filter(key => key.startsWith('file_'));
      console.log('Available files:', allKeys);
      return null;
    }
    
    const fileData = JSON.parse(storedData);
    return {
      name: fileData.name,
      data: fileData.data,
      type: fileData.type,
      size: fileData.size,
    };
  } catch (error) {
    console.error('Error parsing file data:', error);
    return null;
  }
};

// Check if file exists
export const fileExists = (fileId: string): boolean => {
  return localStorage.getItem(fileId) !== null;
};

// Get file metadata without loading the full data
export const getFileMetadata = (fileId: string): { name: string; type: string; size: number } | null => {
  try {
    const storedData = localStorage.getItem(fileId);
    
    if (!storedData) {
      return null;
    }
    
    const fileData = JSON.parse(storedData);
    return {
      name: fileData.name,
      type: fileData.type,
      size: fileData.size,
    };
  } catch (error) {
    console.error('Error getting file metadata:', error);
    return null;
  }
};

// Clean up old files (optional utility)
export const cleanupOldFiles = (maxAgeHours: number = 24): void => {
  try {
    const now = Date.now();
    const maxAge = maxAgeHours * 60 * 60 * 1000;
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('file_')) {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '');
          const uploadTime = new Date(data.uploadedAt).getTime();
          
          if (now - uploadTime > maxAge) {
            localStorage.removeItem(key);
            console.log('Cleaned up old file:', key);
          }
        } catch (error) {
          // Remove corrupted entries
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.error('Error cleaning up files:', error);
  }
};

// Get storage usage info
export const getStorageInfo = (): { used: number; available: number; files: number } => {
  try {
    let totalSize = 0;
    let fileCount = 0;
    
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('file_')) {
        const data = localStorage.getItem(key);
        if (data) {
          totalSize += new Blob([data]).size;
          fileCount++;
        }
      }
    });
    
    // Rough estimate of localStorage limit (usually 5-10MB)
    const estimatedLimit = 5 * 1024 * 1024; // 5MB
    
    return {
      used: totalSize,
      available: estimatedLimit - totalSize,
      files: fileCount,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { used: 0, available: 0, files: 0 };
  }
};