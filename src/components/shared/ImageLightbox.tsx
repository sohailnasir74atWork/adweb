'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageLightboxProps {
    images: string[];
    initialIndex?: number;
    open: boolean;
    onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, open, onClose }: ImageLightboxProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {
        if (open) setCurrentIndex(initialIndex);
    }, [open, initialIndex]);

    // Keyboard navigation
    useEffect(() => {
        if (!open) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setCurrentIndex((i) => Math.max(0, i - 1));
            if (e.key === 'ArrowRight') setCurrentIndex((i) => Math.min(images.length - 1, i + 1));
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [open, images.length, onClose]);

    // Lock body scroll when open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = ''; };
        }
    }, [open]);

    if (!open || images.length === 0) return null;

    const goPrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((i) => Math.max(0, i - 1));
    };

    const goNext = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((i) => Math.min(images.length - 1, i + 1));
    };

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
            onClick={onClose}
        >
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
                <X className="h-5 w-5" />
            </button>

            {/* Image counter */}
            {images.length > 1 && (
                <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Previous button */}
            {currentIndex > 0 && (
                <button
                    onClick={goPrev}
                    className="absolute left-3 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
            )}

            {/* Next button */}
            {currentIndex < images.length - 1 && (
                <button
                    onClick={goNext}
                    className="absolute right-3 z-50 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <ChevronRight className="h-6 w-6" />
                </button>
            )}

            {/* Main image */}
            <div
                className="relative w-full h-full max-w-4xl max-h-[85vh] mx-auto flex items-center justify-center p-4"
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={images[currentIndex]}
                    alt={`Image ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    unoptimized
                    priority
                />
            </div>

            {/* Thumbnail dots */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); }}
                            className={cn(
                                'h-2 rounded-full transition-all',
                                idx === currentIndex
                                    ? 'w-6 bg-white'
                                    : 'w-2 bg-white/40 hover:bg-white/60',
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
