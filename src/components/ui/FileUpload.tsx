import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, X, CheckCircle, AlertCircle, HardDrive } from 'lucide-react';
import { getStorageInfo } from '../../services/fileStorage';
import { cn } from '../../lib/utils';

interface FileUploadProps {
  label: string;
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in MB
  onFilesChange: (files: File[]) => void;
  error?: string;
  required?: boolean;
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  accept = '.pdf,.jpg,.jpeg,.png,.doc,.docx',
  multiple = false,
  maxSize = 5, // 5MB default
  onFilesChange,
  error,
  required = false,
  className,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadError, setUploadError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size must be less than ${maxSize}MB`;
    }

    // Check storage space
    const storageInfo = getStorageInfo();
    if (file.size > storageInfo.available) {
      return 'Not enough storage space. Please clear some files and try again.';
    }

    // Check file type
    const allowedTypes = accept.split(',').map(type => type.trim());
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;

    const isValidType = allowedTypes.some(type => {
      if (type.startsWith('.')) {
        return fileExtension === type;
      }
      return mimeType.startsWith(type.replace('*', ''));
    });

    if (!isValidType) {
      return `File type not supported. Allowed types: ${accept}`;
    }

    return null;
  };

  const handleFiles = (newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles: File[] = [];
    let errorMessage = '';

    for (const file of fileArray) {
      const validationError = validateFile(file);
      if (validationError) {
        errorMessage = validationError;
        break;
      }
      validFiles.push(file);
    }

    if (errorMessage) {
      setUploadError(errorMessage);
      return;
    }

    setUploadError('');
    const updatedFiles = multiple ? [...files, ...validFiles] : validFiles;
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Get storage info for display
  const storageInfo = getStorageInfo();
  const storageUsagePercent = (storageInfo.used / (storageInfo.used + storageInfo.available)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('space-y-2', className)}
    >
      <label className="block text-sm font-medium text-secondary-700 dark:text-secondary-300">
        {label} {required && <span className="text-error-500">*</span>}
      </label>

      {/* Storage Info */}
      {storageInfo.files > 0 && (
        <div className="flex items-center space-x-2 text-xs text-secondary-500 dark:text-secondary-400 mb-2">
          <HardDrive className="w-3 h-3" />
          <span>Storage: {formatFileSize(storageInfo.used)} used</span>
          <div className="flex-1 bg-secondary-200 dark:bg-secondary-700 rounded-full h-1 max-w-20">
            <div 
              className="bg-primary-500 h-1 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(storageUsagePercent, 100)}%` }}
            />
          </div>
        </div>
      )}

      <div
        className={cn(
          'relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 cursor-pointer',
          dragActive
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
            : error || uploadError
            ? 'border-error-500 bg-error-50 dark:bg-error-900/20'
            : 'border-secondary-300 dark:border-secondary-600 hover:border-primary-400 hover:bg-secondary-50 dark:hover:bg-secondary-800'
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={openFileDialog}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />

        <div className="text-center">
          <div className="mx-auto h-12 w-12 mb-4">
            {dragActive ? (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-full h-full bg-primary-100 dark:bg-primary-900/40 rounded-full flex items-center justify-center"
              >
                <Upload className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </motion.div>
            ) : (
              <div className="w-full h-full bg-secondary-100 dark:bg-secondary-800 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-secondary-400" />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100">
              {dragActive ? 'Drop files here' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">
              {accept.replace(/\./g, '').toUpperCase()} up to {maxSize}MB
            </p>
          </div>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          {files.map((file, index) => (
            <motion.div
              key={`${file.name}-${index}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg"
            >
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
                  <File className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-secondary-500 dark:text-secondary-400">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0" />
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="ml-3 p-1 text-secondary-400 hover:text-error-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Error Messages */}
      {(error || uploadError) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="flex items-center space-x-2 text-error-600 dark:text-error-400"
        >
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <p className="text-sm">{error || uploadError}</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FileUpload;