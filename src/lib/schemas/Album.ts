/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import mongoose from 'mongoose';

const PhotoSchema = new mongoose.Schema({
  photoId: { type: String, required: true },
  src: { type: String, required: true },
  caption: { type: String, required: true },
  captionEn: { type: String, required: true },
});

const AlbumSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleEn: { type: String, required: true },
  description: { type: String, required: true },
  descriptionEn: { type: String, required: true },
  coverImage: { type: String, required: true },
  date: { type: String, required: true },
  dateEn: { type: String, required: true },
  photoCount: { type: Number, default: 0 },
  photos: [PhotoSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field on each save
AlbumSchema.pre('save', function() {
  this.updatedAt = new Date();
  this.photoCount = this.photos.length;
});

export default mongoose.models.Album || mongoose.model('Album', AlbumSchema);
