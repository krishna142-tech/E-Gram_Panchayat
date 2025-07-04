import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, File, Image, FileText, AlertCircle, RefreshCw } from 'lucide-react';
import { downloadFile, getFileData, fileExists } from '../../services/fileStorage';
import Button from './Button';
import Modal from './Modal';
import toast from 'react-hot-toast';

interface DocumentViewerProps {
  fileId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  className?: string;
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({
  fileId,
  fileName,
  fileSize,
  fileType,
  className = '',
}) => {
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [fileData, setFileData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileNotFound, setFileNotFound] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    if (fileType.startsWith('image/')) {
      return Image;
    } else if (fileType.includes('pdf') || fileType.includes('document')) {
      return FileText;
    }
    return File;
  };

  const checkFileExists = () => {
    if (!fileId || fileId === 'undefined' || fileId === 'null') {
      setFileNotFound(true);
      return false;
    }
    
    const exists = fileExists(fileId);
    setFileNotFound(!exists);
    return exists;
  };

  const handleView = async () => {
    setLoading(true);
    try {
      if (!checkFileExists()) {
        toast.error('File not found. It may have been removed or corrupted.');
        setLoading(false);
        return;
      }

      const data = getFileData(fileId);
      if (data) {
        setFileData(data.data);
        setIsViewerOpen(true);
        setFileNotFound(false);
      } else {
        setFileNotFound(true);
        toast.error('File not found or corrupted');
      }
    } catch (error) {
      console.error('Error loading file:', error);
      setFileNotFound(true);
      toast.error('Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    try {
      if (!checkFileExists()) {
        toast.error('File not found. It may have been removed or corrupted.');
        return;
      }

      downloadFile(fileId);
      toast.success('File downloaded successfully');
      setFileNotFound(false);
    } catch (error) {
      console.error('Error downloading file:', error);
      setFileNotFound(true);
      toast.error('Failed to download file');
    }
  };

  const handleRetry = () => {
    setFileNotFound(false);
    checkFileExists();
  };

  // Check if file exists on component mount
  React.useEffect(() => {
    checkFileExists();
  }, [fileId]);

  const canPreview = fileType.startsWith('image/') || fileType.includes('pdf');
  const FileIcon = getFileIcon();

  // If no valid fileId, show placeholder
  if (!fileId || fileId === 'undefined' || fileId === 'null') {
    return (
      <div className={`flex items-center justify-between p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg bg-secondary-50 dark:bg-secondary-800 ${className}`}>
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-10 h-10 bg-secondary-200 dark:bg-secondary-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <File className="w-5 h-5 text-secondary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-secondary-600 dark:text-secondary-400 truncate">
              {fileName || 'Unknown file'}
            </p>
            <div className="flex items-center space-x-2 text-xs text-secondary-500 dark:text-secondary-400">
              <span>{formatFileSize(fileSize || 0)}</span>
              <span>•</span>
              <span className="text-warning-600 dark:text-warning-400">File reference missing</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <span className="text-xs text-secondary-500 dark:text-secondary-400 px-2 py-1 bg-secondary-200 dark:bg-secondary-700 rounded">
            No file ID
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center justify-between p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg transition-all duration-200 ${
          fileNotFound 
            ? 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800' 
            : 'bg-white dark:bg-secondary-800 hover:shadow-soft'
        } ${className}`}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
            fileNotFound 
              ? 'bg-error-100 dark:bg-error-900/40' 
              : 'bg-primary-100 dark:bg-primary-900/40'
          }`}>
            {fileNotFound ? (
              <AlertCircle className="w-5 h-5 text-error-600 dark:text-error-400" />
            ) : (
              <FileIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${
              fileNotFound 
                ? 'text-error-900 dark:text-error-100' 
                : 'text-secondary-900 dark:text-secondary-100'
            }`}>
              {fileName}
            </p>
            <div className={`flex items-center space-x-2 text-xs ${
              fileNotFound 
                ? 'text-error-600 dark:text-error-400' 
                : 'text-secondary-500 dark:text-secondary-400'
            }`}>
              <span>{formatFileSize(fileSize)}</span>
              <span>•</span>
              <span className="uppercase">{fileType.split('/')[1] || 'file'}</span>
              {fileNotFound && (
                <>
                  <span>•</span>
                  <span className="text-error-600 dark:text-error-400 font-medium">File not found</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-3">
          {fileNotFound ? (
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRetry}
                className="p-2 hover:bg-error-100 dark:hover:bg-error-900/20 text-error-600 dark:text-error-400"
                title="Retry"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
              <span className="text-xs text-error-600 dark:text-error-400 px-2 py-1 bg-error-100 dark:bg-error-900/20 rounded">
                Missing
              </span>
            </div>
          ) : (
            <>
              {canPreview && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleView}
                  loading={loading}
                  className="p-2 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                  title="View file"
                >
                  <Eye className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDownload}
                className="p-2 hover:bg-secondary-100 dark:hover:bg-secondary-700"
                title="Download file"
              >
                <Download className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </motion.div>

      {/* File Viewer Modal */}
      <Modal
        isOpen={isViewerOpen}
        onClose={() => {
          setIsViewerOpen(false);
          setFileData(null);
        }}
        title={`Preview: ${fileName}`}
        size="xl"
      >
        <div className="space-y-4">
          {fileData ? (
            <div className="max-h-[70vh] overflow-auto bg-secondary-50 dark:bg-secondary-900 rounded-lg p-4">
              {fileType.startsWith('image/') ? (
                <div className="text-center">
                  <img
                    src={fileData}
                    alt={fileName}
                    className="max-w-full h-auto rounded-lg shadow-soft"
                    style={{ maxHeight: '60vh' }}
                    onError={() => {
                      toast.error('Failed to load image preview');
                      setFileNotFound(true);
                    }}
                  />
                </div>
              ) : fileType.includes('pdf') ? (
                <div className="w-full h-96">
                  <iframe
                    src={fileData}
                    className="w-full h-full rounded-lg border border-secondary-200 dark:border-secondary-700"
                    title={fileName}
                    onError={() => {
                      toast.error('Failed to load PDF preview');
                      setFileNotFound(true);
                    }}
                  />
                </div>
              ) : (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                  <p className="text-secondary-600 dark:text-secondary-300 mb-2">
                    Preview not available for this file type
                  </p>
                  <p className="text-sm text-secondary-500 dark:text-secondary-400">
                    You can download the file to view its contents
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <AlertCircle className="w-16 h-16 text-error-500 mx-auto mb-4" />
              <p className="text-error-600 dark:text-error-400 mb-2">
                Failed to load file preview
              </p>
              <p className="text-sm text-secondary-500 dark:text-secondary-400">
                The file may have been removed or corrupted
              </p>
            </div>
          )}
          
          <div className="flex justify-between items-center pt-4 border-t border-secondary-200 dark:border-secondary-700">
            <div className="text-sm text-secondary-600 dark:text-secondary-400">
              {formatFileSize(fileSize)} • {fileType}
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsViewerOpen(false);
                  setFileData(null);
                }}
              >
                Close
              </Button>
              {!fileNotFound && (
                <Button onClick={handleDownload} className="group">
                  <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
                  Download
                </Button>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DocumentViewer;