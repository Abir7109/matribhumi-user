/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import Album from '../../src/lib/schemas/Album';

// Middleware to verify JWT token
const verifyToken = (req: VercelRequest): boolean => {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    switch (req.method) {
      case 'GET':
        const albums = await Album.find().sort({ createdAt: -1 });
        return res.status(200).json(albums);

      case 'POST':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const newAlbum = new Album(req.body);
        await newAlbum.save();
        return res.status(201).json(newAlbum);

      case 'PUT':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id, ...updateData } = req.body;
        // @ts-ignore - Mongoose TypeScript compatibility
        const updatedAlbum = await Album.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedAlbum) {
          return res.status(404).json({ error: 'Album not found' });
        }
        return res.status(200).json(updatedAlbum);

      case 'DELETE':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id: deleteId } = req.query;
        // @ts-ignore - Mongoose TypeScript compatibility
        const deletedAlbum = await Album.findByIdAndDelete(deleteId as string);
        if (!deletedAlbum) {
          return res.status(404).json({ error: 'Album not found' });
        }
        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Albums API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
