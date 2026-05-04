/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const mongoose = require('mongoose');

const PrayerTimeSchema = new mongoose.Schema({
  date: { type: String, required: true },
  fajr: { type: String, required: true },
  sunrise: { type: String, required: true },
  duhr: { type: String, required: true },
  asr: { type: String, required: true },
  asrHanafi: { type: String, required: true },
  maghrib: { type: String, required: true },
  isha: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on each save
PrayerTimeSchema.pre('save', function() {
  this.updatedAt = new Date();
});

module.exports = mongoose.models.PrayerTime || mongoose.model('PrayerTime', PrayerTimeSchema);
