/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

const connectToDatabase = require('../../../src/lib/mongodb');
const Album = require('../../../src/lib/schemas/Album');

// Middleware to verify JWT token
const verifyToken = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) return false;
  
  const token = authHeader.substring(7);
  try {
    const jwt = require('jsonwebtoken');
    jwt.verify(token, process.env.JWT_SECRET);
    return true;
  } catch {
    return false;
  }
};

module.exports = async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { id } = req.query;
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Album ID is required' });
  }

  try {
    await connectToDatabase();

    const album = await Album.findById(id);
    if (!album) {
      return res.status(404).json({ error: 'Album not found' });
    }

    switch (req.method) {
      case 'POST':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const { photo } = req.body;
        album.photos.push(photo);
        await album.save();
        return res.status(201).json(album);

      case 'DELETE':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const { photoId } = req.body;
        album.photos = album.photos.filter((p) => p.photoId !== photoId);
        await album.save();
        return res.status(200).json(album);

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Album photos API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
