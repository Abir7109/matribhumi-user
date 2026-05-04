/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Save,
  Clock,
  RefreshCw,
  Check,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PrayerTimeData {
  _id?: string;
  date: string;
  fajr: string;
  sunrise: string;
  duhr: string;
  asr: string;
  asrHanafi: string;
  maghrib: string;
  isha: string;
}

const emptyPrayerTime: PrayerTimeData = {
  date: new Date().toISOString().split('T')[0],
  fajr: '4:30',
  sunrise: '5:45',
  duhr: '12:00',
  asr: '3:30',
  asrHanafi: '4:30',
  maghrib: '6:15',
  isha: '7:30',
};

export default function PrayerTimesManager() {
  const { token } = useAuth();
  const [prayerTime, setPrayerTime] = useState<PrayerTimeData>(emptyPrayerTime);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchPrayerTimes();
  }, []);

  const fetchPrayerTimes = async () => {
    try {
      const response = await fetch('/api/prayer-times');
      if (response.ok) {
        const data = await response.json();
        setPrayerTime(data);
      }
    } catch (error) {
      console.error('Failed to fetch prayer times:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaved(false);

    try {
      const response = await fetch('/api/prayer-times', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(prayerTime),
      });

      if (response.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Failed to save prayer times:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof PrayerTimeData, value: string) => {
    setPrayerTime(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const timeFields = [
    { key: 'fajr', label: 'Fajr (ফাজর)', color: 'bg-amber-100 text-amber-700' },
    { key: 'sunrise', label: 'Sunrise (সূর্যোদয়)', color: 'bg-orange-100 text-orange-700' },
    { key: 'duhr', label: 'Dhuhr (যোহর)', color: 'bg-yellow-100 text-yellow-700' },
    { key: 'asr', label: 'Asr (আসর)', color: 'bg-blue-100 text-blue-700' },
    { key: 'asrHanafi', label: 'Asr Hanafi (আসর হাফি)', color: 'bg-indigo-100 text-indigo-700' },
    { key: 'maghrib', label: 'Maghrib (মাগরিব)', color: 'bg-purple-100 text-purple-700' },
    { key: 'isha', label: 'Isha (এশা)', color: 'bg-slate-800 text-white' },
  ] as const;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Info Card */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Prayer Times Management</h3>
            <p className="text-sm text-blue-700 mt-1">
              Update the daily prayer times that appear on the website. These times are displayed in the floating widget on the homepage.
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-xl p-6">
        {/* Date */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Date Reference
          </label>
          <input
            type="date"
            value={prayerTime.date}
            onChange={(e) => handleChange('date', e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
            required
          />
          <p className="text-xs text-slate-500 mt-1">
            Used to track when these prayer times were last updated
          </p>
        </div>

        {/* Time Fields Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {timeFields.map(({ key, label, color }) => (
            <div key={key} className={`p-4 rounded-xl ${color}`}>
              <label className="block text-sm font-semibold mb-2 opacity-90">
                {label}
              </label>
              <input
                type="time"
                value={prayerTime[key]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-3 py-2 bg-white/80 border-0 rounded-lg focus:ring-2 focus:ring-black/10 outline-none font-mono text-lg"
                required
              />
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
          <div className="flex items-center gap-2">
            {saved && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-1 text-green-600 text-sm font-medium"
              >
                <Check className="w-4 h-4" />
                Saved successfully
              </motion.span>
            )}
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={fetchPrayerTimes}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Reset
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Save Changes
            </button>
          </div>
        </div>
      </form>

      {/* Preview */}
      <div className="mt-8">
        <h3 className="text-sm font-medium text-slate-700 mb-3">Live Preview</h3>
        <div className="bg-white/95 backdrop-blur-sm border border-primary/10 rounded-xl p-4 shadow-xl max-w-xs">
          <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2 mb-2">
            <Clock className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-widest font-black">Dhaka Time</span>
          </div>
          <div className="flex flex-col gap-1.5">
            {timeFields.map((field, idx) => (
              <div
                key={field.key}
                className={`flex justify-between items-center gap-3 ${idx === 3 ? 'text-primary font-bold' : 'text-slate-400'}`}
              >
                <span className="text-[10px] font-bold tracking-wider">{field.label.split(' ')[0]}</span>
                <span className="font-bold text-xs tracking-tight">
                  {prayerTime[field.key]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
