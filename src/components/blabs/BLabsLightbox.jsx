import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { imageSources } from './blabsData';

const FOCUSABLE = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

// Rendered into <body> so no transformed ancestor can break `position: fixed`.
const BLabsLightbox = ({ images, index, onIndexChange, onClose, label }) => {
    const dialogRef = useRef(null);
    const closeRef = useRef(null);
    const touchStart = useRef(null);
    const image = images[index];
    const { full, width, height } = imageSources(image);
    const count = images.length;

    const go = (step) => onIndexChange((index + step + count) % count);

    useEffect(() => {
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        closeRef.current?.focus();
        return () => { document.body.style.overflow = previousOverflow; };
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') { e.preventDefault(); onClose(); return; }
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); return; }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); return; }
        if (e.key !== 'Tab') return;
        const focusable = [...dialogRef.current.querySelectorAll(FOCUSABLE)];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };

    const handleTouchStart = (e) => { touchStart.current = e.touches[0].clientX; };
    const handleTouchEnd = (e) => {
        if (touchStart.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStart.current;
        touchStart.current = null;
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    };

    return createPortal(
        <div
            className="sea-blabs-lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={label}
            ref={dialogRef}
            onKeyDown={handleKeyDown}
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="sea-blabs-lightbox__bar">
                <span className="sea-blabs-lightbox__count" aria-live="polite">
                    {String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
                </span>
                <button type="button" ref={closeRef} className="sea-blabs-lightbox__close" onClick={onClose} aria-label="Close photo viewer">
                    ×
                </button>
            </div>

            <figure className="sea-blabs-lightbox__figure">
                <img key={full} src={full} alt={image.alt} width={width} height={height} decoding="async" />
                <figcaption>{image.alt}</figcaption>
            </figure>

            {count > 1 && (
                <>
                    <button type="button" className="sea-blabs-lightbox__nav sea-blabs-lightbox__nav--prev" onClick={() => go(-1)} aria-label="Previous photo">
                        <span aria-hidden="true">←</span>
                    </button>
                    <button type="button" className="sea-blabs-lightbox__nav sea-blabs-lightbox__nav--next" onClick={() => go(1)} aria-label="Next photo">
                        <span aria-hidden="true">→</span>
                    </button>
                </>
            )}
        </div>,
        document.body
    );
};

export default BLabsLightbox;
