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
      const base64Data = reader.result as string;
      
      // Store in localStorage for demo (in production, use proper cloud storage)
      const fileId = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const storedFile: StoredFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileId, // In production, this would be the actual download URL
        uploadedAt: new Date(),
      };
      
      // Store file data
      localStorage.setItem(fileId, JSON.stringify({
        ...storedFile,
        data: base64Data,
      }));
      
      resolve(storedFile);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsDataURL(file);
  });
};

// Download/view file
export const downloadFile = (fileId: string): void => {
  const storedData = localStorage.getItem(fileId);
  
  if (!storedData) {
    throw new Error('File not found');
  }
  
  try {
    const fileData = JSON.parse(storedData);
    
    // Create download link
    const link = document.createElement('a');
    link.href = fileData.data;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    throw new Error('Failed to download file');
  }
};

// Get file for viewing
export const getFileData = (fileId: string): { name: string; data: string; type: string } | null => {
  const storedData = localStorage.getItem(fileId);
  
  if (!storedData) {
    return null;
  }
  
  try {
    const fileData = JSON.parse(storedData);
    return {
      name: fileData.name,
      data: fileData.data,
      type: fileData.type,
    };
  } catch (error) {
    return null;
  }
};

// Check if file exists
export const fileExists = (fileId: string): boolean => {
  return localStorage.getItem(fileId) !== null;
};