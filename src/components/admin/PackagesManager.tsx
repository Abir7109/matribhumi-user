/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Plus,
  Edit2,
  Trash2,
  X,
  ChevronDown,
  ChevronUp,
  Save,
  AlertCircle,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

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
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500">{packages.length} packages</p>
        <button
          onClick={() => {
            setEditingPackage(null);
            setFormData(emptyPackage);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Package
        </button>
      </div>

      {/* Packages List */}
      <div className="space-y-3">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden"
          >
            <div
              className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50"
              onClick={() => setExpandedId(expandedId === pkg._id ? null : pkg._id || null)}
            >
              <img
                src={pkg.image || 'https://via.placeholder.com/60'}
                alt={pkg.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-slate-800">{pkg.title}</h3>
                <p className="text-sm text-slate-500">{pkg.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs ${pkg.color} text-white`}>
                  {pkg.tag}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEdit(pkg);
                  }}
                  className="p-2 text-slate-400 hover:text-primary transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirm(pkg._id || null);
                  }}
                  className="p-2 text-slate-400 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                {expandedId === pkg._id ? (
                  <ChevronUp className="w-5 h-5 text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                )}
              </div>
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
              {expandedId === pkg._id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-slate-100 bg-slate-50/50"
                >
                  <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">Features (BN)</h4>
                      <ul className="space-y-1 text-slate-600">
                        {pkg.features.map((f, i) => <li key={i}>• {f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-700 mb-2">Inclusions (BN)</h4>
                      <ul className="space-y-1 text-slate-600">
                        {pkg.inclusions.map((inc, i) => <li key={i}>• {inc}</li>)}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {editingPackage ? 'Edit Package' : 'Add New Package'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Basic Info */}
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

                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    required
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
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl p-6 max-w-sm w-full"
            >
              <div className="flex items-center gap-3 text-red-600 mb-4">
                <AlertCircle className="w-6 h-6" />
                <h3 className="font-semibold">Delete Package?</h3>
              </div>
              <p className="text-slate-600 mb-6">
                This action cannot be undone. The package will be permanently removed.
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
            </motion.div>
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
    <div className="border border-slate-200 rounded-lg p-4">
      <h4 className="font-medium text-slate-700 mb-3">{label}</h4>
      <div className="space-y-2 mb-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2 bg-slate-50 px-3 py-2 rounded-lg">
            <span className="flex-1 text-sm">{item}</span>
            <span className="text-sm text-slate-500">/ {itemsEn[index]}</span>
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
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
          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        />
        <input
          type="text"
          value={newItemEn}
          onChange={(e) => setNewItemEn(e.target.value)}
          placeholder={`${label} (English)`}
          className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
