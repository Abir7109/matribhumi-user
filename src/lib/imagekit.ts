/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import ImageKit from 'imagekit';

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_URL_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_URL_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

export interface UploadOptions {
  file: string | Buffer;
  fileName: string;
  folder?: string;
}

export interface UploadResult {
  url: string;
  fileId: string;
  thumbnailUrl: string;
}

export async function uploadImage(options: UploadOptions): Promise<UploadResult> {
  const { file, fileName, folder = 'uploads' } = options;

  const timestamp = Date.now();
  const uniqueFileName = `${timestamp}_${fileName}`;

  const uploadResponse = await imagekit.upload({
    file,
    fileName: uniqueFileName,
    folder,
  });

  // Generate thumbnail URL with transformation
  const thumbnailUrl = imagekit.url({
    src: uploadResponse.url,
    transformation: [{ height: 300, width: 400 }],
  });

  return {
    url: uploadResponse.url,
    fileId: uploadResponse.fileId,
    thumbnailUrl,
  };
}

export function getOptimizedUrl(url: string, width?: number, height?: number): string {
  const transformations: Record<string, string | number>[] = [];
  
  if (width) transformations.push({ width });
  if (height) transformations.push({ height });
  
  if (transformations.length === 0) {
    return url;
  }

  return imagekit.url({
    src: url,
    transformation: transformations,
  });
}

export default imagekit;
