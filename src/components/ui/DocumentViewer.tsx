import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, File, Image, FileText, AlertCircle, RefreshCw, HelpCircle } from 'lucide-react';
import { downloadFile, getFileData, fileExists, isValidFileId, safeFileOperation } from '../../services/fileStorage';
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
  const [fileStatus, setFileStatus] = useState<'unknown' | 'found' | 'not_found' | 'invalid_id' | 'corrupted'>('unknown');

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

  const checkFileStatus = () => {
    if (!isValidFileId(fileId)) {
      setFileStatus('invalid_id');
      return 'invalid_id';
    }

    const exists = safeFileOperation(
      () => fileExists(fileId),
      false,
      `Error checking file existence for ${fileId}`
    );

    if (exists) {
      // Double-check by trying to get metadata
      const data = safeFileOperation(
        () => getFileData(fileId),
        null,
        `Error getting file data for ${fileId}`
      );
      
      if (data && data.data) {
        setFileStatus('found');
        return 'found';
      } else {
        setFileStatus('corrupted');
        return 'corrupted';
      }
    } else {
      setFileStatus('not_found');
      return 'not_found';
    }
  };

  const handleView = async () => {
    setLoading(true);
    try {
      const status = checkFileStatus();
      
      if (status !== 'found') {
        const errorMessages = {
          invalid_id: 'Invalid file reference',
          not_found: 'File not found in storage',
          corrupted: 'File data is corrupted',
          unknown: 'Unknown file error'
        };
        toast.error(errorMessages[status] || 'Failed to load file');
        setLoading(false);
        return;
      }

      const data = safeFileOperation(
        () => getFileData(fileId),
        null,
        `Error loading file data for ${fileId}`
      );

      if (data && data.data) {
        setFileData(data.data);
        setIsViewerOpen(true);
        setFileStatus('found');
      } else {
        setFileStatus('corrupted');
        toast.error('File data is corrupted or incomplete');
      }
    } catch (error) {
      console.error('Error loading file:', error);
      setFileStatus('not_found');
      toast.error('Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    try {
      const status = checkFileStatus();
      
      if (status !== 'found') {
        const errorMessages = {
          invalid_id: 'Invalid file reference - cannot download',
          not_found: 'File not found in storage',
          corrupted: 'File data is corrupted',
          unknown: 'Unknown file error'
        };
        toast.error(errorMessages[status] || 'Cannot download file');
        return;
      }

      safeFileOperation(
        () => {
          downloadFile(fileId);
          toast.success('File downloaded successfully');
          setFileStatus('found');
        },
        undefined,
        `Error downloading file ${fileId}`
      );
    } catch (error) {
      console.error('Error downloading file:', error);
      setFileStatus('not_found');
      toast.error('Failed to download file');
    }
  };

  const handleRetry = () => {
    setFileStatus('unknown');
    checkFileStatus();
  };

  // Check file status on component mount and when fileId changes
  useEffect(() => {
    if (fileId) {
      checkFileStatus();
    } else {
      setFileStatus('invalid_id');
    }
  }, [fileId]);

  const canPreview = fileType.startsWith('image/') || fileType.includes('pdf');
  const FileIcon = getFileIcon();

  // Get status display info
  const getStatusInfo = () => {
    switch (fileStatus) {
      case 'found':
        return {
          bgColor: 'bg-white dark:bg-secondary-800 hover:shadow-soft',
          iconBg: 'bg-primary-100 dark:bg-primary-900/40',
          iconColor: 'text-primary-600 dark:text-primary-400',
          textColor: 'text-secondary-900 dark:text-secondary-100',
          subtextColor: 'text-secondary-500 dark:text-secondary-400',
          statusText: '',
          showActions: true
        };
      case 'not_found':
        return {
          bgColor: 'bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800',
          iconBg: 'bg-error-100 dark:bg-error-900/40',
          iconColor: 'text-error-600 dark:text-error-400',
          textColor: 'text-error-900 dark:text-error-100',
          subtextColor: 'text-error-600 dark:text-error-400',
          statusText: 'File not found',
          showActions: false
        };
      case 'corrupted':
        return {
          bgColor: 'bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800',
          iconBg: 'bg-warning-100 dark:bg-warning-900/40',
          iconColor: 'text-warning-600 dark:text-warning-400',
          textColor: 'text-warning-900 dark:text-warning-100',
          subtextColor: 'text-warning-600 dark:text-warning-400',
          statusText: 'File corrupted',
          showActions: false
        };
      case 'invalid_id':
        return {
          bgColor: 'bg-secondary-50 dark:bg-secondary-800',
          iconBg: 'bg-secondary-200 dark:bg-secondary-700',
          iconColor: 'text-secondary-400',
          textColor: 'text-secondary-600 dark:text-secondary-400',
          subtextColor: 'text-secondary-500 dark:text-secondary-400',
          statusText: 'Invalid file reference',
          showActions: false
        };
      default:
        return {
          bgColor: 'bg-secondary-50 dark:bg-secondary-800',
          iconBg: 'bg-secondary-200 dark:bg-secondary-700',
          iconColor: 'text-secondary-400',
          textColor: 'text-secondary-600 dark:text-secondary-400',
          subtextColor: 'text-secondary-500 dark:text-secondary-400',
          statusText: 'Checking...',
          showActions: false
        };
    }
  };

  const statusInfo = getStatusInfo();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex items-center justify-between p-4 border border-secondary-200 dark:border-secondary-700 rounded-lg transition-all duration-200 ${statusInfo.bgColor} ${className}`}
      >
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${statusInfo.iconBg}`}>
            {fileStatus === 'not_found' || fileStatus === 'corrupted' ? (
              <AlertCircle className={`w-5 h-5 ${statusInfo.iconColor}`} />
            ) : fileStatus === 'invalid_id' ? (
              <HelpCircle className={`w-5 h-5 ${statusInfo.iconColor}`} />
            ) : (
              <FileIcon className={`w-5 h-5 ${statusInfo.iconColor}`} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium truncate ${statusInfo.textColor}`}>
              {fileName || 'Unknown file'}
            </p>
            <div className={`flex items-center space-x-2 text-xs ${statusInfo.subtextColor}`}>
              <span>{formatFileSize(fileSize || 0)}</span>
              {fileType && (
                <>
                  <span>•</span>
                  <span className="uppercase">{fileType.split('/')[1] || 'file'}</span>
                </>
              )}
              {statusInfo.statusText && (
                <>
                  <span>•</span>
                  <span className="font-medium">{statusInfo.statusText}</span>
                </>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-3">
          {!statusInfo.showActions ? (
            <div className="flex items-center space-x-2">
              {fileStatus === 'not_found' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRetry}
                  className="p-2 hover:bg-error-100 dark:hover:bg-error-900/20 text-error-600 dark:text-error-400"
                  title="Retry"
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              )}
              <span className={`text-xs px-2 py-1 rounded ${
                fileStatus === 'not_found' 
                  ? 'bg-error-100 dark:bg-error-900/20 text-error-600 dark:text-error-400'
                  : fileStatus === 'corrupted'
                  ? 'bg-warning-100 dark:bg-warning-900/20 text-warning-600 dark:text-warning-400'
                  : 'bg-secondary-200 dark:bg-secondary-700 text-secondary-600 dark:text-secondary-400'
              }`}>
                {fileStatus === 'not_found' ? 'Missing' : 
                 fileStatus === 'corrupted' ? 'Corrupted' : 
                 fileStatus === 'invalid_id' ? 'Invalid' : 'Unknown'}
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
                      setFileStatus('corrupted');
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
                      setFileStatus('corrupted');
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
              {fileStatus === 'found' && (
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