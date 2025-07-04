import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, X, File, Image, FileText } from 'lucide-react';
import { downloadFile, getFileData } from '../../services/fileStorage';
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

  const handleView = async () => {
    setLoading(true);
    try {
      const data = getFileData(fileId);
      if (data) {
        setFileData(data.data);
        setIsViewerOpen(true);
      } else {
        toast.error('File not found');
      }
    } catch (error) {
      toast.error('Failed to load file');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    try {
      downloadFile(fileId);
      toast.success('File downloaded successfully');
    } catch (error) {
      toast.error('Failed to download file');
    }
  };

  const canPreview = fileType.startsWith('image/') || fileType.includes('pdf');
  const FileIcon = getFileIcon();

  return (
    <>
      <div className={`flex items-center justify-between p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg ${className}`}>
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
            <FileIcon className="w-4 h-4 text-primary-600 dark:text-primary-400" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-secondary-900 dark:text-secondary-100 truncate">
              {fileName}
            </p>
            <p className="text-xs text-secondary-500 dark:text-secondary-400">
              {formatFileSize(fileSize)}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 ml-3">
          {canPreview && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleView}
              loading={loading}
              className="p-2"
            >
              <Eye className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="p-2"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* File Viewer Modal */}
      <Modal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        title={fileName}
        size="xl"
      >
        <div className="space-y-4">
          {fileData && (
            <div className="max-h-96 overflow-auto">
              {fileType.startsWith('image/') ? (
                <img
                  src={fileData}
                  alt={fileName}
                  className="max-w-full h-auto rounded-lg"
                />
              ) : fileType.includes('pdf') ? (
                <iframe
                  src={fileData}
                  className="w-full h-96 rounded-lg"
                  title={fileName}
                />
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-16 h-16 text-secondary-400 mx-auto mb-4" />
                  <p className="text-secondary-600 dark:text-secondary-300">
                    Preview not available for this file type
                  </p>
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setIsViewerOpen(false)}>
              Close
            </Button>
            <Button onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DocumentViewer;