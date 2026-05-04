/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import connectToDatabase from '../../src/lib/mongodb';
import PrayerTime from '../../src/lib/schemas/PrayerTime';

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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    await connectToDatabase();

    switch (req.method) {
      case 'GET':
        // Get the latest prayer times
        const prayerTime = await PrayerTime.findOne().sort({ updatedAt: -1 });
        if (!prayerTime) {
          // Return default times if none exist
          return res.status(200).json({
            date: new Date().toISOString().split('T')[0],
            fajr: '4:30',
            sunrise: '5:45',
            duhr: '12:00',
            asr: '3:30',
            asrHanafi: '4:30',
            maghrib: '6:15',
            isha: '7:30',
          });
        }
        return res.status(200).json(prayerTime);

      case 'PUT':
        if (!verifyToken(req)) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        const updateData = req.body;
        
        // Find existing or create new
        let existingPrayerTime = await PrayerTime.findOne().sort({ updatedAt: -1 });
        if (existingPrayerTime) {
          Object.assign(existingPrayerTime, updateData);
          await existingPrayerTime.save();
          return res.status(200).json(existingPrayerTime);
        } else {
          const newPrayerTime = new PrayerTime(updateData);
          await newPrayerTime.save();
          return res.status(201).json(newPrayerTime);
        }

      default:
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Prayer times API error:', error);
    console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    return res.status(500).json({ error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' });
  }
}
