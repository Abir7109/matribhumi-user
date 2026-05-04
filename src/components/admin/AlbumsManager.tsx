/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Save,
  Upload,
  Image as ImageIcon,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ImageUploader from './ImageUploader';

interface Photo {
  photoId: string;
  src: string;
  caption: string;
  captionEn: string;
}

interface Album {
  _id?: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  coverImage: string;
  date: string;
  dateEn: string;
  photoCount: number;
  photos: Photo[];
}

const emptyAlbum: Album = {
  title: '',
  titleEn: '',
  description: '',
  descriptionEn: '',
  coverImage: '',
  date: '',
  dateEn: '',
  photoCount: 0,
  photos: [],
};

export default function AlbumsManager() {
  const { token } = useAuth();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAlbum, setEditingAlbum] = useState<Album | null>(null);
  const [formData, setFormData] = useState<Album>(emptyAlbum);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const response = await fetch('/api/albums');
      if (response.ok) {
        const data = await response.json();
        setAlbums(data);
      }
    } catch (error) {
      console.error('Failed to fetch albums:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const method = editingAlbum?._id ? 'PUT' : 'POST';
    
    try {
      const response = await fetch('/api/albums', {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingAlbum?._id ? { ...formData, id: editingAlbum._id } : formData),
      });

      if (response.ok) {
        await fetchAlbums();
        setShowForm(false);
        setEditingAlbum(null);
        setFormData(emptyAlbum);
      }
    } catch (error) {
      console.error('Failed to save album:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/albums?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchAlbums();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Failed to delete album:', error);
    }
  };

  const handlePhotoUpload = async (albumId: string, file: File) => {
    setUploading(true);
    try {
      // Convert file to base64
      const base64 = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });

      // Upload to ImageKit via API
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          file: base64,
          fileName: file.name,
          folder: `albums/${albumId}`,
        }),
      });

      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        
        // Add photo to album
        const photo: Photo = {
          photoId: uploadData.fileId,
          src: uploadData.url,
          caption: '',
          captionEn: '',
        };

        await fetch(`/api/albums/${albumId}/photos`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ photo }),
        });

        await fetchAlbums();
      }
    } catch (error) {
      console.error('Failed to upload photo:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemovePhoto = async (albumId: string, photoId: string) => {
    try {
      await fetch(`/api/albums/${albumId}/photos`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ photoId }),
      });
      await fetchAlbums();
    } catch (error) {
      console.error('Failed to remove photo:', error);
    }
  };

  const startEdit = (album: Album) => {
    setEditingAlbum(album);
    setFormData(album);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500">{albums.length} albums</p>
        <button
          onClick={() => {
            setEditingAlbum(null);
            setFormData(emptyAlbum);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Album
        </button>
      </div>

      {/* Albums List */}
      <div className="space-y-3">
        {albums.map((album) => (
          <div
            key={album._id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50"
              onClick={() => setExpandedId(expandedId === album._id ? null : album._id || null)}
            >
              <img
                src={album.coverImage || 'https://via.placeholder.com/60'}
                alt={album.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{album.title}</h3>
                <p className="text-sm text-slate-500">{album.date} • {album.photoCount} photos</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(album);
                  }}
                  className="p-2 text-slate-400 hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirm(album._id || null);
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === album._id ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </div>

            {/* Expanded Photos */}
            {expandedId === album._id && (
              <div className="border-t border-slate-100">
                <div className="p-4">
                  {/* Upload Button */}
                  <div className="mb-4">
                    <label className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg cursor-pointer transition-colors w-fit">
                      <Upload className="w-4 h-4" />
                      <span className="text-sm font-medium">Add Photos</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files && album._id) {
                            Array.from(files).forEach(file => handlePhotoUpload(album._id!, file));
                          }
                        }}
                      />
                    </label>
                    {uploading && <span className="ml-3 text-sm text-slate-500">Uploading...</span>}
                  </div>

                  {/* Photos Grid */}
                  {album.photos.length > 0 ? (
                    <div className="grid grid-cols-4 gap-3">
                      {album.photos.map((photo, index) => (
                        <div key={photo.photoId} className="relative group">
                          <img
                            src={photo.src}
                            alt={photo.caption}
                            className="w-full aspect-square object-cover rounded-lg"
                          />
                          <button
                            onClick={() => album._id && handleRemovePhoto(album._id, photo.photoId)}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                          <p className="text-xs text-slate-500 mt-1 truncate">{photo.caption || `Photo ${index + 1}`}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p>No photos in this album</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-lg">
              <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editingAlbum ? 'Edit Album' : 'Add New Album'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title (BN)</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Title (EN)</label>
                    <input
                      type="text"
                      value={formData.titleEn}
                      onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date (BN)</label>
                    <input
                      type="text"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Date (EN)</label>
                    <input
                      type="text"
                      value={formData.dateEn}
                      onChange={(e) => setFormData({ ...formData, dateEn: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description (BN)</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      rows={3}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Description (EN)</label>
                    <textarea
                      value={formData.descriptionEn}
                      onChange={(e) => setFormData({ ...formData, descriptionEn: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      rows={3}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Cover Image</label>
                  <ImageUploader
                    currentImage={formData.coverImage}
                    onImageUploaded={(url) => setFormData({ ...formData, coverImage: url })}
                    onRemove={() => setFormData({ ...formData, coverImage: '' })}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save Album
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl p-6 max-w-sm w-full">
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="font-semibold">Delete Album?</h3>
              </div>
              <p className="text-slate-600 mb-6">
                This will delete the album and all its photos. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
