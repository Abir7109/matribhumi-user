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
  Save,
  AlertCircle,
  Package as PackageIcon,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ImageUploader from './ImageUploader';

interface ItineraryItem {
  day: string;
  dayEn: string;
  activity: string;
  activityEn: string;
}

interface PricingItem {
  item: string;
  itemEn: string;
  cost: string;
  costEn: string;
}

interface Package {
  _id?: string;
  title: string;
  titleEn: string;
  price: string;
  priceEn: string;
  image: string;
  tag: string;
  tagEn: string;
  features: string[];
  featuresEn: string[];
  status: string;
  progress: number;
  color: string;
  itinerary: ItineraryItem[];
  inclusions: string[];
  inclusionsEn: string[];
  exclusions: string[];
  exclusionsEn: string[];
  pricing: PricingItem[];
}

const emptyPackage: Package = {
  title: '',
  titleEn: '',
  price: '',
  priceEn: '',
  image: '',
  tag: '',
  tagEn: '',
  features: [],
  featuresEn: [],
  status: 'Available',
  progress: 50,
  color: 'bg-primary',
  itinerary: [],
  inclusions: [],
  inclusionsEn: [],
  exclusions: [],
  exclusionsEn: [],
  pricing: [],
};

export default function PackagesManager() {
  const { token } = useAuth();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [formData, setFormData] = useState<Package>(emptyPackage);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages');
      if (response.ok) {
        const data = await response.json();
        setPackages(data);
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const url = editingPackage?._id ? '/api/packages' : '/api/packages';
    const method = editingPackage?._id ? 'PUT' : 'POST';
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(editingPackage?._id ? { ...formData, id: editingPackage._id } : formData),
      });

      if (response.ok) {
        await fetchPackages();
        setShowForm(false);
        setEditingPackage(null);
        setFormData(emptyPackage);
      }
    } catch (error) {
      console.error('Failed to save package:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/packages?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        await fetchPackages();
        setDeleteConfirm(null);
      }
    } catch (error) {
      console.error('Failed to delete package:', error);
    }
  };

  const startEdit = (pkg: Package) => {
    setEditingPackage(pkg);
    setFormData(pkg);
    setShowForm(true);
  };

  const addArrayItem = (field: keyof Package, item: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[] || []), item],
    }));
  };

  const removeArrayItem = (field: keyof Package, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <PackageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{packages.length}</p>
              <p className="text-sm text-slate-500">Total Packages</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{packages.filter(p => p.status === 'Available').length}</p>
              <p className="text-sm text-slate-500">Available</p>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => {
            setEditingPackage(null);
            setFormData(emptyPackage);
            setShowForm(true);
          }}
          className="bg-primary text-white rounded-xl p-5 hover:bg-primary/90 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-lg font-bold">Add New</p>
              <p className="text-sm text-white/70">Create Package</p>
            </div>
          </div>
        </button>
      </div>

      {/* Packages Grid */}
      {packages.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <PackageIcon className="w-10 h-10 text-slate-400" />
          </div>
          <h3 className="text-lg font-medium text-slate-600 mb-2">No packages yet</h3>
          <p className="text-slate-400 mb-6">Create your first Hajj package</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Package
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg._id}
              className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={pkg.image || 'https://via.placeholder.com/400x200'}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Tag Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${pkg.color} text-white`}>
                    {pkg.tag}
                  </span>
                </div>
                
                {/* Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => startEdit(pkg)}
                    className="p-3 bg-white rounded-full hover:bg-slate-100 transition-colors"
                  >
                    <Edit2 className="w-5 h-5 text-primary" />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(pkg._id || null)}
                    className="p-3 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-slate-800 text-lg mb-1">{pkg.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{pkg.titleEn}</p>
                <div className="flex items-center justify-between">
                  <p className="text-lg font-bold text-primary">{pkg.price}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${pkg.status === 'Available' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                    {pkg.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-xl">
              {/* Modal Header */}
              <div className="bg-primary px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <PackageIcon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {editingPackage ? 'Edit Package' : 'Add New Package'}
                    </h2>
                    <p className="text-sm text-white/70">
                      {editingPackage ? 'Update package details' : 'Create a new Hajj package'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
                {/* Basic Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Title (BN)</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all outline-none"
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
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (BN)</label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Price (EN)</label>
                    <input
                      type="text"
                      value={formData.priceEn}
                      onChange={(e) => setFormData({ ...formData, priceEn: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Tag and Status */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tag (BN)</label>
                    <input
                      type="text"
                      value={formData.tag}
                      onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tag (EN)</label>
                    <input
                      type="text"
                      value={formData.tagEn}
                      onChange={(e) => setFormData({ ...formData, tagEn: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Color</label>
                    <select
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    >
                      <option value="bg-primary">Primary</option>
                      <option value="bg-secondary">Secondary</option>
                    </select>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Package Image</label>
                  <ImageUploader
                    currentImage={formData.image}
                    onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                    onRemove={() => setFormData({ ...formData, image: '' })}
                  />
                </div>

                {/* Features */}
                <ArrayInput
                  label="Features"
                  labelBn="ফিচার"
                  items={formData.features}
                  itemsEn={formData.featuresEn}
                  onAdd={(bn, en) => {
                    addArrayItem('features', bn);
                    addArrayItem('featuresEn', en);
                  }}
                  onRemove={(index) => {
                    removeArrayItem('features', index);
                    removeArrayItem('featuresEn', index);
                  }}
                />

                {/* Action Buttons */}
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
                    Save Package
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
            <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-7 h-7 text-red-500" />
              </div>
              <h3 className="text-lg font-semibold text-center text-slate-800 mb-2">Delete Package?</h3>
              <p className="text-slate-500 text-center mb-6">
                This action cannot be undone. The package will be permanently removed.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 px-4 py-3 bg-slate-100 text-slate-600 rounded-xl font-medium hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteConfirm && handleDelete(deleteConfirm)}
                  className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors"
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

// Helper Component for Array Inputs
function ArrayInput({
  label,
  labelBn,
  items,
  itemsEn,
  onAdd,
  onRemove,
}: {
  label: string;
  labelBn: string;
  items: string[];
  itemsEn: string[];
  onAdd: (bn: string, en: string) => void;
  onRemove: (index: number) => void;
}) {
  const [newItemBn, setNewItemBn] = useState('');
  const [newItemEn, setNewItemEn] = useState('');

  const handleAdd = () => {
    if (newItemBn && newItemEn) {
      onAdd(newItemBn, newItemEn);
      setNewItemBn('');
      setNewItemEn('');
    }
  };

  return (
    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
      <h4 className="font-medium text-slate-700 mb-3">
        {label}
      </h4>
      <div className="space-y-2 mb-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-slate-200 group"
          >
            <span className="flex-1 text-sm text-slate-700">{item}</span>
            <span className="text-sm text-slate-400">/ {itemsEn[index]}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-1 text-red-400 hover:text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={newItemBn}
          onChange={(e) => setNewItemBn(e.target.value)}
          placeholder={`${labelBn} (Bangla)`}
          className="flex-1 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        />
        <input
          type="text"
          value={newItemEn}
          onChange={(e) => setNewItemEn(e.target.value)}
          placeholder={`${label} (English)`}
          className="flex-1 px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
