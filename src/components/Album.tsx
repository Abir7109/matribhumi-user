/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "../lib/TranslationContext";
import { IMAGES } from "../constants";
import { X, ChevronLeft, ChevronRight, Camera, Calendar, Image as ImageIcon, FolderOpen } from "lucide-react";

interface Photo {
  id: string;
  src: string;
  caption: string;
  captionEn: string;
}

interface Album {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  coverImage: string;
  date: string;
  photoCount: number;
  photos: Photo[];
}


interface AlbumProps {
  onOpenChange?: (isOpen: boolean) => void;
}

export default function Album({ onOpenChange }: AlbumProps) {
  const { language } = useTranslation();
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [lightboxPhoto, setLightboxPhoto] = useState<Photo | null>(null);
  const [lightboxAlbum, setLightboxAlbum] = useState<Album | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Fetch albums from API
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await fetch('/api/albums');
        if (response.ok) {
          const data = await response.json();
          setAlbums(data);
        }
      } catch (error) {
        console.error('Failed to fetch albums:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

  const openAlbum = (album: Album) => {
    setSelectedAlbum(album);
    onOpenChange?.(true);
  };

  const closeAlbum = () => {
    setSelectedAlbum(null);
    onOpenChange?.(false);
  };

  const openLightbox = (photo: Photo, album: Album, index: number) => {
    setLightboxPhoto(photo);
    setLightboxAlbum(album);
    setCurrentPhotoIndex(index);
    onOpenChange?.(true);
  };

  const closeLightbox = () => {
    setLightboxPhoto(null);
    setLightboxAlbum(null);
    onOpenChange?.(false);
  };

  const nextPhoto = () => {
    if (lightboxAlbum) {
      const newIndex = (currentPhotoIndex + 1) % lightboxAlbum.photos.length;
      setCurrentPhotoIndex(newIndex);
      setLightboxPhoto(lightboxAlbum.photos[newIndex]);
    }
  };

  const prevPhoto = () => {
    if (lightboxAlbum) {
      const newIndex = (currentPhotoIndex - 1 + lightboxAlbum.photos.length) % lightboxAlbum.photos.length;
      setCurrentPhotoIndex(newIndex);
      setLightboxPhoto(lightboxAlbum.photos[newIndex]);
    }
  };

  return (
    <section id="album" className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4"
          >
            <Camera size={16} />
            <span>{language === "bn" ? "স্মৃতিচারণ" : "Memories"}</span>
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl font-bold text-primary mb-3"
          >
            {language === "bn" ? "ফটো অ্যালবাম" : "Photo Album"}
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-sm max-w-2xl mx-auto"
          >
            {language === "bn"
              ? "মাতৃভূমি হজ্জ কাফেলার বিভিন্ন সময়ের সুন্দর স্মৃতিময় ছবি"
              : "Beautiful memorable photos from different times of Matribhumi Hajj Kafela"}
          </motion.p>
        </div>

        {/* Albums Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : albums.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p>{language === "bn" ? "কোন অ্যালবাম উপলব্ধ নেই" : "No albums available"}</p>
          </div>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {albums.map((album, index) => (
            <motion.div
              key={album.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              onClick={() => openAlbum(album)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Album Cover */}
              <div className="relative h-28 md:h-56 overflow-hidden">
                <img
                  src={album.coverImage}
                  alt={language === "bn" ? album.title : album.titleEn}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Photo Count Badge */}
                <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-white/90 backdrop-blur-sm text-primary px-2 py-0.5 md:px-3 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold flex items-center gap-1 shadow-lg">
                  <ImageIcon size={10} className="md:w-3 md:h-3" />
                  <span>{album.photoCount}</span>
                </div>

                {/* Date Badge - hidden on mobile */}
                <div className="hidden md:flex absolute top-3 left-3 bg-primary/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium items-center gap-1.5 shadow-lg">
                  <Calendar size={12} />
                  <span>{album.date}</span>
                </div>

                {/* Album Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                  <h3 className="text-white font-bold text-xs md:text-lg mb-0 md:mb-1 group-hover:text-accent-gold transition-colors leading-tight">
                    {language === "bn" ? album.title : album.titleEn}
                  </h3>
                  <p className="hidden md:block text-white/80 text-xs line-clamp-2">
                    {language === "bn" ? album.description : album.descriptionEn}
                  </p>
                </div>
              </div>

              {/* Album Footer */}
              <div className="p-2 md:p-4 bg-white">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] md:text-xs text-slate-400 flex items-center gap-1">
                    <FolderOpen size={10} className="md:w-3 md:h-3" />
                    <span className="hidden md:inline">{language === "bn" ? "অ্যালবাম দেখুন" : "View Album"}</span>
                  </span>
                  <motion.div
                    whileHover={{ x: 4 }}
                    className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all"
                  >
                    <ChevronRight size={16} />
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}

        {/* Album Modal */}
        <AnimatePresence>
          {selectedAlbum && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeAlbum}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-100">
                  <div>
                    <h3 className="text-xl font-bold text-primary">
                      {language === "bn" ? selectedAlbum.title : selectedAlbum.titleEn}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {selectedAlbum.photoCount} {language === "bn" ? "টি ফটো" : "photos"}
                    </p>
                  </div>
                  <button
                    onClick={closeAlbum}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-all"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Photos Grid */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedAlbum.photos.map((photo, index) => (
                      <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => openLightbox(photo, selectedAlbum, index)}
                        className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden bg-slate-100"
                      >
                        <img
                          src={photo.src}
                          alt={language === "bn" ? photo.caption : photo.captionEn}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <p className="text-white text-xs font-medium line-clamp-2">
                              {language === "bn" ? photo.caption : photo.captionEn}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxPhoto && lightboxAlbum && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md z-[60] flex items-center justify-center"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              >
                <X size={24} />
              </button>

              {/* Navigation */}
              <button
                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                className="absolute left-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                className="absolute right-4 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
              >
                <ChevronRight size={24} />
              </button>

              {/* Photo */}
              <motion.div
                key={lightboxPhoto.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="max-w-5xl max-h-[80vh] w-full px-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={lightboxPhoto.src}
                    alt={language === "bn" ? lightboxPhoto.caption : lightboxPhoto.captionEn}
                    className="w-full max-h-[70vh] object-contain rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                  {/* Caption */}
                  <div className="mt-4 text-center">
                    <p className="text-white text-lg font-medium">
                      {language === "bn" ? lightboxPhoto.caption : lightboxPhoto.captionEn}
                    </p>
                    <p className="text-white/50 text-sm mt-1">
                      {currentPhotoIndex + 1} / {lightboxAlbum.photos.length}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
