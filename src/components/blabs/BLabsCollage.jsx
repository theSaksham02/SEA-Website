import React, { useRef, useState } from 'react';
import BLabsLightbox from './BLabsLightbox';
import { imageSources, isWide } from './blabsData';

const LEAD_SIZES = '(max-width: 767px) 80vw, (max-width: 1023px) 45vw, 34vw';
const TILE_SIZES = '(max-width: 767px) 80vw, (max-width: 1023px) 45vw, 17vw';

const BLabsCollage = ({ session }) => {
    const { images } = session;
    const [viewing, setViewing] = useState(null);
    const [stripIndex, setStripIndex] = useState(0);
    const tileRefs = useRef([]);
    const openedFrom = useRef(null);

    const openViewer = (i) => {
        openedFrom.current = tileRefs.current[i];
        setViewing(i);
    };

    const closeViewer = () => {
        setViewing(null);
        openedFrom.current?.focus();
    };

    const handleStripScroll = (e) => {
        const strip = e.currentTarget;
        const tile = strip.firstElementChild;
        if (!tile) return;
        const step = tile.getBoundingClientRect().width + 12;
        setStripIndex(Math.min(images.length - 1, Math.round(strip.scrollLeft / step)));
    };

    return (
        <div className="sea-blabs-collage-wrap">
            <div
                className={`sea-blabs-collage${isWide(images[0]) ? ' sea-blabs-collage--wide-lead' : ''}`}
                onScroll={handleStripScroll}
            >
                {images.map((image, i) => {
                    const { src, srcSet } = imageSources(image);
                    return (
                        <button
                            key={image.src}
                            type="button"
                            ref={el => { tileRefs.current[i] = el; }}
                            className="sea-blabs-tile"
                            style={{ '--i': i }}
                            onClick={() => openViewer(i)}
                            aria-label={`View photo ${i + 1} of ${images.length}: ${image.alt}`}
                        >
                            <img
                                src={src}
                                srcSet={srcSet}
                                sizes={i === 0 ? LEAD_SIZES : TILE_SIZES}
                                alt={image.alt}
                                loading="lazy"
                                decoding="async"
                                style={{ objectPosition: image.pos }}
                            />
                            <span className="sea-blabs-tile__caption" aria-hidden="true">{image.alt}</span>
                        </button>
                    );
                })}
            </div>

            <div className="sea-blabs-collage__dots" aria-hidden="true">
                {images.map((image, i) => (
                    <span key={image.src} className={i === stripIndex ? 'is-active' : undefined} />
                ))}
            </div>

            <p className="sea-blabs-collage__note">Certificate of completion issued for this session.</p>

            {viewing !== null && (
                <BLabsLightbox
                    images={images}
                    index={viewing}
                    onIndexChange={setViewing}
                    onClose={closeViewer}
                    label={`Session ${session.n} photos`}
                />
            )}
        </div>
    );
};

export default BLabsCollage;
