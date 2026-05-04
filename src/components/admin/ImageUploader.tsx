/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { 
  Upload, 
  Image as ImageIcon, 
  X, 
  Loader2, 
  Check, 
  AlertCircle,
  Trash2,
} from 'lucide-react';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
  onRemove?: () => void;
}

export default function ImageUploader({ onImageUploaded, currentImage, onRemove }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const validateFile = (file: File): boolean => {
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
      setError('Invalid file type. Please upload JPEG, PNG, GIF, or WebP.');
      return false;
    }

    if (file.size > maxSize) {
      setError('File too large. Maximum size is 5MB.');
      return false;
    }

    return true;
  };

  const uploadToImageKit = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name.replace(/\.[^/.]+$/, '') + '_' + Date.now());

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Upload failed');
    }

    const data = await response.json();
    return data.url;
  };

  const handleUpload = async (file: File) => {
    if (!validateFile(file)) return;

    setIsUploading(true);
    setError(null);
    setUploadProgress(0);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      const url = await uploadToImageKit(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        onImageUploaded(url);
        setIsUploading(false);
      }, 500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setIsUploading(false);
      setPreviewUrl(null);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      handleUpload(files[0]);
    }
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    setError(null);
    onRemove?.();
  };

  return (
    <div className="space-y-4">
      {/* Preview */}
      {previewUrl ? (
        <div className="relative group">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 border-2 border-slate-200">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
              <button
                onClick={handleRemove}
                className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-3" />
                  <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${uploadProgress}%` }}
                      className="h-full bg-primary rounded-full transition-all"
                    />
                  </div>
                  <p className="text-white text-sm mt-2">{uploadProgress}%</p>
                </div>
              </div>
            )}

            {/* Success Check */}
            {uploadProgress === 100 && !isUploading && (
              <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                <Check className="w-5 h-5 text-white" />
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Drop Zone */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`relative aspect-video rounded-xl border-2 border-dashed transition-all cursor-pointer overflow-hidden
            ${isDragging
              ? 'border-primary bg-primary/5'
              : 'border-slate-300 bg-slate-50 hover:border-primary/50 hover:bg-slate-100'
            }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors
              ${isDragging ? 'bg-primary text-white' : 'bg-slate-200 text-slate-500'}
            `}
            >
              <Upload className="w-8 h-8" />
            </div>

            <h3 className={`text-base font-semibold mb-1 ${isDragging ? 'text-primary' : 'text-slate-700'}`}>
              {isDragging ? 'Drop your image here' : 'Drag & drop your image'}
            </h3>
            <p className="text-slate-500 text-sm text-center mb-4">
              or click to browse from your computer
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ImageIcon className="w-4 h-4" />
              <span>JPEG, PNG, GIF, WebP • Max 5MB</span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-auto hover:text-red-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
