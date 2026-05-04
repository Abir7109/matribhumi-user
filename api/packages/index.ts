/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import Package from '../../src/lib/schemas/Package';

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
        const packages = await Package.find().sort({ createdAt: -1 });
        return res.status(200).json(packages);

      case 'POST':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const newPackage = new Package(req.body);
        await newPackage.save();
        return res.status(201).json(newPackage);

      case 'PUT':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id, ...updateData } = req.body;
        const updatedPackage = await Package.findByIdAndUpdate(
          id,
          updateData,
          { new: true }
        );
        if (!updatedPackage) {
          return res.status(404).json({ error: 'Package not found' });
        }
        return res.status(200).json(updatedPackage);

      case 'DELETE':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const { id: deleteId } = req.query;
        const deletedPackage = await Package.findByIdAndDelete(deleteId);
        if (!deletedPackage) {
          return res.status(404).json({ error: 'Package not found' });
        }
        return res.status(200).json({ success: true });

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Packages API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
