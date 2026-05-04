/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const mongoose = require('mongoose');

const ItineraryItemSchema = new mongoose.Schema({
  day: { type: String, required: true },
  dayEn: { type: String, required: true },
  activity: { type: String, required: true },
  activityEn: { type: String, required: true },
});

const PricingItemSchema = new mongoose.Schema({
  item: { type: String, required: true },
  itemEn: { type: String, required: true },
  cost: { type: String, required: true },
  costEn: { type: String, required: true },
});

const PackageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: { type: String, required: true },
  price: { type: String, required: true },
  priceEn: { type: String, required: true },
  image: { type: String, required: true },
  tag: { type: String, required: true },
  tagEn: { type: String, required: true },
  features: [{ type: String, required: true }],
  featuresEn: [{ type: String, required: true }],
  status: { type: String, default: 'Available' },
  progress: { type: Number, default: 0 },
  color: { type: String, default: 'bg-primary' },
  itinerary: [ItineraryItemSchema],
  inclusions: [{ type: String, required: true }],
  inclusionsEn: [{ type: String, required: true }],
  exclusions: [{ type: String, required: true }],
  exclusionsEn: [{ type: String, required: true }],
  pricing: [PricingItemSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on each save
PackageSchema.pre('save', function() {
  this.updatedAt = new Date();
});

module.exports = mongoose.models.Package || mongoose.model('Package', PackageSchema);
