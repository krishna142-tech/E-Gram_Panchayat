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
        
        try {
          localStorage.setItem(fileId, dataString);
          console.log('File stored successfully:', fileId, 'Size:', dataSize);
          
          // Verify the file was stored
          const verification = localStorage.getItem(fileId);
          if (!verification) {
            reject(new Error('Failed to verify file storage'));
            return;
          }
          
          resolve(storedFile);
        } catch (storageError: any) {
          console.error('Storage error:', storageError);
          if (storageError.name === 'QuotaExceededError' || storageError.code === 22) {
            reject(new Error('Storage quota exceeded. Please clear some space and try again.'));
          } else {
            reject(new Error('Failed to store file. Please try again.'));
          }
        }
      } catch (error) {
        console.error('Error processing file:', error);
        reject(new Error('Failed to process file'));
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
    if (!fileId || fileId === 'undefined' || fileId === 'null' || fileId.trim() === '') {
      throw new Error('Invalid file ID');
    }

    const storedData = localStorage.getItem(fileId);
    
    if (!storedData) {
      console.error('File not found:', fileId);
      // List available files for debugging
      const allKeys = Object.keys(localStorage).filter(key => key.startsWith('file_'));
      console.log('Available files:', allKeys);
      throw new Error('File not found or has been removed from storage');
    }
    
    const fileData = JSON.parse(storedData);
    
    if (!fileData.data) {
      throw new Error('File data is corrupted');
    }
    
    // Create download link
    const link = document.createElement('a');
    link.href = fileData.data;
    link.download = fileData.name || 'download';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading file:', error);
    throw new Error('Failed to download file: ' + (error as Error).message);
  }
};

// Get file for viewing
export const getFileData = (fileId: string): { name: string; data: string; type: string; size: number } | null => {
  try {
    if (!fileId || fileId === 'undefined' || fileId === 'null' || fileId.trim() === '') {
      console.error('Invalid file ID provided:', fileId);
      return null;
    }

    const storedData = localStorage.getItem(fileId);
    
    if (!storedData) {
      console.error('File not found in storage:', fileId);
      // List all stored files for debugging
      const allKeys = Object.keys(localStorage).filter(key => key.startsWith('file_'));
      console.log('Available files in storage:', allKeys);
      return null;
    }
    
    const fileData = JSON.parse(storedData);
    
    if (!fileData.data) {
      console.error('File data is corrupted for:', fileId);
      return null;
    }
    
    return {
      name: fileData.name || 'Unknown file',
      data: fileData.data,
      type: fileData.type || 'application/octet-stream',
      size: fileData.size || 0,
    };
  } catch (error) {
    console.error('Error parsing file data for:', fileId, error);
    return null;
  }
};

// Check if file exists
export const fileExists = (fileId: string): boolean => {
  if (!fileId || fileId === 'undefined' || fileId === 'null' || fileId.trim() === '') {
    return false;
  }
  
  try {
    const data = localStorage.getItem(fileId);
    if (!data) return false;
    
    // Verify the data is valid JSON and has required fields
    const parsed = JSON.parse(data);
    return !!(parsed.name && parsed.data);
  } catch (error) {
    console.error('Error checking file existence:', fileId, error);
    return false;
  }
};

// Get file metadata without loading the full data
export const getFileMetadata = (fileId: string): { name: string; type: string; size: number } | null => {
  try {
    if (!fileId || fileId === 'undefined' || fileId === 'null' || fileId.trim() === '') {
      return null;
    }

    const storedData = localStorage.getItem(fileId);
    
    if (!storedData) {
      return null;
    }
    
    const fileData = JSON.parse(storedData);
    return {
      name: fileData.name || 'Unknown file',
      type: fileData.type || 'application/octet-stream',
      size: fileData.size || 0,
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
          console.log('Removed corrupted file entry:', key);
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
      available: Math.max(0, estimatedLimit - totalSize),
      files: fileCount,
    };
  } catch (error) {
    console.error('Error getting storage info:', error);
    return { used: 0, available: 0, files: 0 };
  }
};

// Debug function to list all stored files
export const listStoredFiles = (): string[] => {
  try {
    return Object.keys(localStorage).filter(key => key.startsWith('file_'));
  } catch (error) {
    console.error('Error listing files:', error);
    return [];
  }
};

// Create a demo file for testing (useful for development)
export const createDemoFile = async (fileName: string = 'demo.txt', content: string = 'This is a demo file'): Promise<string> => {
  try {
    // Create a blob and convert to file
    const blob = new Blob([content], { type: 'text/plain' });
    const file = new File([blob], fileName, { type: 'text/plain' });
    
    const storedFile = await uploadFile(file);
    console.log('Demo file created:', storedFile.url);
    return storedFile.url;
  } catch (error) {
    console.error('Error creating demo file:', error);
    throw error;
  }
};

// Validate file ID format
export const isValidFileId = (fileId: string): boolean => {
  if (!fileId || typeof fileId !== 'string') return false;
  if (fileId === 'undefined' || fileId === 'null') return false;
  if (fileId.trim() === '') return false;
  
  // Check if it matches our file ID pattern
  return /^file_\d+_[a-z0-9]+$/.test(fileId);
};

// Safe file operation wrapper
export const safeFileOperation = <T>(
  operation: () => T,
  fallback: T,
  errorMessage: string = 'File operation failed'
): T => {
  try {
    return operation();
  } catch (error) {
    console.error(errorMessage, error);
    return fallback;
  }
};