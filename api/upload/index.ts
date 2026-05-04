/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import ImageKit from 'imagekit';

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

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_URL_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_URL_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!verifyToken(req)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const { file, fileName, folder } = req.body;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now();
    const uniqueFileName = fileName ? `${timestamp}_${fileName}` : `${timestamp}.jpg`;
    const uploadFolder = folder || 'uploads';

    // Upload to ImageKit
    const uploadResponse = await imagekit.upload({
      file: file,
      fileName: uniqueFileName,
      folder: uploadFolder,
    });

    return res.status(200).json({
      success: true,
      url: uploadResponse.url,
      fileId: uploadResponse.fileId,
      thumbnailUrl: imagekit.url({
        src: uploadResponse.url,
        transformation: [{ height: 300, width: 400 }],
      }),
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'Upload failed' });
  }
}
