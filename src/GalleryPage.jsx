import { useState, useEffect, useRef } from 'react';
import { SITE, IMAGES, GALLERY_CATEGORIES, wa, MSGS } from './config.js';
import { Logo } from './components.jsx';

export default function GalleryPage({ onBack, onFeedback }) {
  const [selectedCat, setSelectedCat] = useState('all');
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState(null);
  const touchStartX = useRef(null);
  const filtersRef = useRef(null);

  // Filter images based on category
  const filteredImages = selectedCat === 'all'
    ? IMAGES
    : IMAGES.filter((img) => img.category === selectedCat);

  // Clamp active index and reset filter scroll when filtered list changes
  useEffect(() => {
    setActiveIdx(0);
    if (filtersRef.current) filtersRef.current.scrollLeft = 0;
  }, [selectedCat]);

  const total = filteredImages.length;

  const nextSlide = () => {
    if (total <= 1) return;
    setActiveIdx((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    if (total <= 1) return;
    setActiveIdx((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation for coverflow & lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIdx !== null) {
        if (e.key === 'Escape') setLightboxIdx(null);
        if (e.key === 'ArrowRight') setLightboxIdx((prev) => (prev + 1) % total);
        if (e.key === 'ArrowLeft') setLightboxIdx((prev) => (prev - 1 + total) % total);
        return;
      }
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIdx, total]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  // Calculate position offset for 3D coverflow
  const getOffset = (index) => {
    let diff = index - activeIdx;
    // Circular wrap for closest distance
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div className="gallery-page">
      {/* Top Sticky Header */}
      <header className="gp-nav">
        <div className="wrap gp-nav-in">
          <button type="button" className="gp-back-btn" onClick={onBack} aria-label="मुख्य पेज पर वापस जाएँ">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span className="gp-back-desktop">मुख्य पेज (Home)</span>
            <span className="gp-back-mobile">Home</span>
          </button>

          <div className="gp-brand" onClick={onBack} style={{ cursor: 'pointer' }}>
            <Logo size={40} />
            <div className="gp-brand-txt">
              <strong>TCF Gallery</strong>
              <span>Trust Community Fund</span>
            </div>
          </div>

          <div className="gp-actions">
            {onFeedback && (
              <button type="button" className="btn btn-ghost gp-action-btn" onClick={onFeedback}>
                Feedback
              </button>
            )}
            <a href={wa(MSGS.member)} target="_blank" rel="noopener noreferrer" className="btn btn-gold gp-wa-btn">
              <span className="gp-wa-desktop">संपर्क करें</span>
              <span className="gp-wa-mobile">संपर्क</span>
            </a>
          </div>
        </div>
      </header>

      <main className="gp-main">
        {/* Visual Diary Header Section */}
        <section className="gp-hero">
          <div className="wrap">
            <div className="gp-badge-wrap">
              <span className="gp-pill-badge">GALLERY</span>
            </div>
            <h1 className="gp-title">Our Gallery</h1>
            <p className="gp-hindi-sub">
              TCF परिवार की एकजुटता, छठ महापर्व की आस्था और समाज सेवा के पावन लम्हे।
            </p>

            {/* Category / Filter Pills */}
            <div className="gp-filters-container" ref={filtersRef}>
              <div className="gp-filters" role="tablist">
                {GALLERY_CATEGORIES.map((cat) => {
                  const isActive = selectedCat === cat.id;
                  const count = cat.id === 'all'
                    ? IMAGES.length
                    : IMAGES.filter((img) => img.category === cat.id).length;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`gp-filter-pill ${isActive ? 'active' : ''}`}
                      onClick={() => setSelectedCat(cat.id)}
                    >
                      <span>{cat.label}</span>
                      <small className="gp-pill-count">{count}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 3D Coverflow Visual Carousel Section */}
        <section className="gp-carousel-section">
          <div
            className="gp-coverflow-wrapper"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="gp-coverflow-stage">
              {filteredImages.map((img, i) => {
                const offset = getOffset(i);
                const isCenter = offset === 0;
                const isNear = Math.abs(offset) <= 2;

                if (!isNear) return null;

                return (
                  <div
                    key={img.id || i}
                    className={`gp-card ${isCenter ? 'center' : ''} ${offset < 0 ? 'left' : offset > 0 ? 'right' : ''}`}
                    style={{
                      '--offset': offset,
                      '--abs-offset': Math.abs(offset),
                      zIndex: isCenter ? 10 : 10 - Math.abs(offset) * 2,
                    }}
                    onClick={() => {
                      if (isCenter) {
                        setLightboxIdx(i);
                      } else {
                        setActiveIdx(i);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={img.title || img.caption}
                  >
                    <div className="gp-card-inner">
                      <img src={img.src} alt={img.alt || img.title} loading="lazy" />
                      
                      {/* Top Tag */}
                      <div className="gp-card-tag-badge">
                        <span>{img.tag || 'Community'}</span>
                      </div>

                      {/* Video / Play indicator or Expand icon */}
                      <div className="gp-card-action-circle" title={isCenter ? 'बड़ा करके देखें (Zoom)' : 'आगे लाएँ'}>
                        {img.isVideo ? (
                          <svg viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            <line x1="11" y1="8" x2="11" y2="14" />
                            <line x1="8" y1="11" x2="14" y2="11" />
                          </svg>
                        )}
                      </div>

                      {/* Bottom Gradient Overlay Info */}
                      <div className="gp-card-overlay">
                        <span className="gp-card-date">{img.date || 'TCF Event'}</span>
                        <h3 className="gp-card-title">{img.title || img.caption}</h3>
                        <p className="gp-card-caption">{img.caption}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Controls: Circular Arrows & Slide Progress */}
            <div className="gp-controls">
              <button
                type="button"
                className="gp-arrow-btn"
                onClick={prevSlide}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="gp-counter-pill">
                <span className="current">{String(activeIdx + 1).padStart(2, '0')}</span>
                <span className="divider">/</span>
                <span className="total">{String(total).padStart(2, '0')}</span>
              </div>

              <button
                type="button"
                className="gp-arrow-btn"
                onClick={nextSlide}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Gallery Grid Section (Explore All Moments) */}
        <section className="gp-grid-section">
          <div className="wrap">
            <div className="gp-grid-head">
              <div>
                <h2>सभी तस्वीरें एक्सप्लोर करें</h2>
                <p>क्लिक करके हाई-क्वालिटी में देखें और TCF की यात्रा के साक्षी बनें।</p>
              </div>
              <span className="gp-grid-count-badge">
                {filteredImages.length} तस्वीरें उपलब्ध
              </span>
            </div>

            <div className="gp-grid">
              {filteredImages.map((img, i) => (
                <div
                  key={img.id || i}
                  className={`gp-grid-item ${i === activeIdx ? 'highlighted' : ''}`}
                  onClick={() => setLightboxIdx(i)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="gp-grid-img-wrap">
                    <img src={img.src} alt={img.alt || img.title} loading="lazy" />
                    <div className="gp-grid-tag">{img.tag || 'TCF'}</div>
                    {img.isVideo && (
                      <div className="gp-grid-video-pill">
                        <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 18 12 6 20 6 4" /></svg>
                      </div>
                    )}
                  </div>
                  <div className="gp-grid-info">
                    <h4>{img.title || img.caption}</h4>
                    <p>{img.caption}</p>
                    <div className="gp-grid-meta">
                      <span>{img.date || 'TCF Community'}</span>
                      <span className="gp-view-link">View Fullscreen ↗</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Banner */}
        <section className="gp-cta-banner">
          <div className="wrap narrow">
            <div className="gp-cta-box">
              <Logo size={64} />
              <h3>आप भी बनिए TCF परिवार का हिस्सा</h3>
              <p>आस्था, अनुशासन और पारस्परिक सहयोग की एक सशक्त एवं भरोसेमंद पहल।</p>
              <div className="gp-cta-actions">
                <a href={wa(MSGS.member)} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                  सदस्यता की जानकारी लें
                </a>
                <button type="button" onClick={onBack} className="btn btn-ghost">
                  ← मुख्य पेज पर वापस जाएँ
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIdx !== null && filteredImages[lightboxIdx] && (
        <div className="gp-lightbox-overlay" onClick={() => setLightboxIdx(null)}>
          <button
            type="button"
            className="gp-lb-close"
            onClick={() => setLightboxIdx(null)}
            aria-label="बंद करें"
          >
            ✕
          </button>

          <button
            type="button"
            className="gp-lb-nav gp-lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx - 1 + total) % total);
            }}
            aria-label="Previous"
          >
            ‹
          </button>

          <div className="gp-lb-modal" onClick={(e) => e.stopPropagation()}>
            <div className="gp-lb-image-container">
              <img
                src={filteredImages[lightboxIdx].src}
                alt={filteredImages[lightboxIdx].alt || filteredImages[lightboxIdx].title}
              />
            </div>
            <div className="gp-lb-caption-bar">
              <div className="gp-lb-text">
                <span className="gp-lb-tag">{filteredImages[lightboxIdx].tag || 'Community'}</span>
                <h3>{filteredImages[lightboxIdx].title || filteredImages[lightboxIdx].caption}</h3>
                <p>{filteredImages[lightboxIdx].caption}</p>
              </div>
              <div className="gp-lb-meta">
                <span>{filteredImages[lightboxIdx].date}</span>
                <span className="gp-lb-count">{lightboxIdx + 1} / {total}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="gp-lb-nav gp-lb-next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIdx((lightboxIdx + 1) % total);
            }}
            aria-label="Next"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
