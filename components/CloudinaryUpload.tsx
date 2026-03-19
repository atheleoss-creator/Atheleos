'use client';

import React, { useState, useRef } from 'react';

interface CloudinaryUploadProps {
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  accept?: string;
  buttonText?: string;
  className?: string;
}

export default function CloudinaryUpload({
  onUploadSuccess,
  onUploadError,
  accept = 'image/*,video/*',
  buttonText = 'Upload File',
  className = '',
}: CloudinaryUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (e.g., 10MB) to prevent large base64 payload memory issues
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
        const sizeError = 'File size exceeds 10MB limit.';
        if (onUploadError) onUploadError(sizeError);
        else alert(sizeError);
        return;
    }

    setIsUploading(true);

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      try {
        const base64EncodedFile = reader.result;
        
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: base64EncodedFile }),
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Upload failed');
        }

        onUploadSuccess(result.url);
      } catch (error: any) {
        console.error('Upload Error:', error);
        if (onUploadError) {
          onUploadError(error.message || 'Error occurred during upload');
        } else {
          alert('Upload failed: ' + (error.message || 'Unknown error'));
        }
      } finally {
        setIsUploading(false);
        // Reset file input
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    };
    
    reader.onerror = () => {
      setIsUploading(false);
      const errMsg = 'Failed to read file.';
      if (onUploadError) onUploadError(errMsg);
      else alert(errMsg);
    };
  };

  return (
    <div className={`flex flex-col items-start ${className}`}>
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        id="cloudinary-upload-input"
        disabled={isUploading}
      />
      <label
        htmlFor="cloudinary-upload-input"
        className={`cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-[#FEEB06] text-black text-sm font-semibold rounded-md hover:bg-yellow-500 transition-colors shadow-sm ${
          isUploading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isUploading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Uploading...
          </>
        ) : (
          buttonText
        )}
      </label>
    </div>
  );
}
