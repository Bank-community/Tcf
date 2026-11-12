import { useEffect, useRef, useState } from 'react';
import { SITE } from './config.js';

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function Reveal({ children, className = '', delay = 0 }) {
  const ref = useRef();
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (reduced()) return setOn(true);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`rv ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}

export function Counter({ to, prefix = '', suffix = '' }) {
  const ref = useRef();
  const [v, setV] = useState(0);
  useEffect(() => {
    if (reduced()) return setV(to);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t) => {
        const p = Math.min((t - t0) / 1600, 1);
        setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{prefix}{v.toLocaleString('en-IN')}{suffix}</span>;
}

export function Logo({ size = 36 }) {
  const [bad, setBad] = useState(false);
  return bad
    ? <span className="logo mono" style={{ width: size, height: size }}>TCF</span>
    : <img className="logo" src={SITE.logo} alt="TCF logo" width={size} height={size} onError={() => setBad(true)} />;
}

export function HeroGraph() {
  return (
    <div className="hero-graph-card">
      <div className="hg-header">
        <div className="hg-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
          <span>TCF Growth Journey</span>
        </div>
        <div className="hg-stats">
          <strong><Counter to={32} /></strong> <span>कुल सदस्य</span>
        </div>
      </div>
      <div className="hg-body">
        <svg viewBox="0 0 600 160" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9a24b" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#c9a24b" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#25d366" stopOpacity="1" />
            </linearGradient>
            <filter id="glowLight">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Animated Growth Line */}
          <path className="g-line" d="M 20 130 C 50 130, 60 110, 100 110 C 200 110, 180 80, 260 80 C 360 80, 340 50, 420 50 C 520 50, 500 20, 560 20 C 580 20, 590 15, 600 10" fill="none" stroke="url(#lineGrad)" strokeWidth="4" filter="url(#glowLight)" strokeLinecap="round" />

          {/* Data Nodes for Light Theme */}
          <g className="g-nodes">
            <g className="g-node n1">
              <circle cx="100" cy="110" r="6" fill="#ffffff" stroke="#c9a24b" strokeWidth="2.5" />
              <text x="100" y="136" fill="#64748b" fontSize="13" textAnchor="middle" fontWeight="600">June 2024</text>
              <text x="100" y="94" fill="#0a1d38" fontSize="16" fontWeight="bold" textAnchor="middle">5</text>
            </g>
            <g className="g-node n2">
              <circle cx="260" cy="80" r="6" fill="#ffffff" stroke="#c9a24b" strokeWidth="2.5" />
              <text x="260" y="106" fill="#64748b" fontSize="13" textAnchor="middle" fontWeight="600">Dec 2024</text>
              <text x="260" y="64" fill="#0a1d38" fontSize="16" fontWeight="bold" textAnchor="middle">12</text>
            </g>
            <g className="g-node n3">
              <circle cx="420" cy="50" r="6" fill="#ffffff" stroke="#c9a24b" strokeWidth="2.5" />
              <text x="420" y="76" fill="#64748b" fontSize="13" textAnchor="middle" fontWeight="600">Dec 2025</text>
              <text x="420" y="34" fill="#0a1d38" fontSize="16" fontWeight="bold" textAnchor="middle">20</text>
            </g>
            <g className="g-node n4">
              <circle cx="560" cy="20" r="8" fill="#25d366" />
              <circle className="g-pulse" cx="560" cy="20" r="8" fill="none" stroke="#25d366" strokeWidth="2" />
              <text x="560" y="48" fill="#475569" fontSize="13" fontWeight="bold" textAnchor="middle">Now</text>
              <text x="560" y="4" fill="#25d366" fontSize="22" fontWeight="bold" textAnchor="middle">32</text>
            </g>
          </g>
        </svg>
      </div>
    </div>
  );
}


export function DonationSlider({ donors }) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Active Card Tracking logic (Find center card for 3D effect)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const center = el.scrollLeft + el.clientWidth / 2;
      const cards = el.querySelectorAll('.snap-card');
      let closestIndex = 0;
      let minDiff = Infinity;

      cards.forEach((card, i) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const diff = Math.abs(center - cardCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = i;
        }
      });
      setActiveIndex(closestIndex);
    };

    el.addEventListener('scroll', handleScroll, { passive: true });
    setTimeout(handleScroll, 100);

    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  // 1.5 Second Auto-scroll logic
  useEffect(() => {
    if (isHovered || !scrollRef.current || reduced()) return;
    
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (el) {
        const cards = el.querySelectorAll('.snap-card');
        const nextIndex = activeIndex + 1;
        
        if (nextIndex >= cards.length - 1) {
           el.scrollTo({ left: 0, behavior: 'smooth' });
        } else if (cards[nextIndex]) {
           const nextCard = cards[nextIndex];
           el.scrollTo({
             left: nextCard.offsetLeft - el.clientWidth / 2 + nextCard.offsetWidth / 2,
             behavior: 'smooth'
           });
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [activeIndex, isHovered]);

  if (!donors || donors.length === 0) return null;
  const loopDonors = [...donors, ...donors, ...donors]; // Duplicated for smooth loop

  return (
    <div 
      className="donor-carousel-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div className="donor-carousel" ref={scrollRef}>
        {loopDonors.map((d, i) => (
          <div key={i} className={`donor-card snap-card ${i === activeIndex ? 'active' : ''}`}>
            <div className="donor-badge">
              <span>★</span> {d.msg}
            </div>
            <div className="donor-img-wrapper">
              <img src={d.img} alt={d.name} loading="lazy" />
            </div>
            <div className="donor-info">
              <h4>{d.name}</h4>
              <strong>{d.amount}</strong>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Faq({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="faq">
      {items.map(([q, a], i) => (
        <div key={q} className={`faq-i ${open === i ? 'open' : ''}`}>
          <button aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{q}</span><b aria-hidden>+</b>
          </button>
          <div className="faq-a"><p>{a}</p></div>
        </div>
      ))}
    </div>
  );
}

export function LightboxGallery({ images }) {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);

  const openBox = (i) => { 
    setIdx(i); 
    setOpen(true); 
    document.body.style.overflow = 'hidden'; 
  };
  const closeBox = () => { 
    setOpen(false); 
    document.body.style.overflow = ''; 
  };
  const next = (e) => { 
    e.stopPropagation(); 
    setIdx((idx + 1) % images.length); 
  };
  const prev = (e) => { 
    e.stopPropagation(); 
    setIdx((idx - 1 + images.length) % images.length); 
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!open) return;
      if (e.key === 'Escape') closeBox();
      if (e.key === 'ArrowRight') next(e);
      if (e.key === 'ArrowLeft') prev(e);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, idx]);

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="gal-grid">
        {images.map((im, i) => (
          <div key={i} className={`gal-item ${i === 0 ? 'featured' : ''}`} onClick={() => openBox(i)}>
            <img src={im.src} alt={im.alt} loading="lazy" />
            <div className="gal-cap"><span>{im.caption || 'TCF Community'}</span></div>
          </div>
        ))}
      </div>

      {open && (
        <div className="lb-overlay" onClick={closeBox}>
          <button className="lb-close" onClick={closeBox} aria-label="Close">×</button>
          <button className="lb-nav lb-prev" onClick={prev} aria-label="Previous">‹</button>
          
          <div className="lb-content" onClick={(e) => e.stopPropagation()}>
            <img src={images[idx].src} alt={images[idx].alt} />
            {images[idx].caption && <p className="lb-text">{images[idx].caption}</p>}
          </div>
          
          <button className="lb-nav lb-next" onClick={next} aria-label="Next">›</button>
        </div>
      )}
    </>
  );
}

export function NavMenu({ onNavigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const handleNav = (target) => (e) => {
    setOpen(false);
    if (onNavigate) {
      e.preventDefault();
      onNavigate(target);
    }
  };

  return (
    <div className="nav-menu" ref={ref}>
      <button className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
        <span className={`hamburger ${open ? 'open' : ''}`}>
          <span /><span /><span />
        </span>
      </button>
      {open && (
        <div className="menu-drop">
          <a href="/leaderboard" onClick={handleNav('leaderboard')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.45 1-1 1H7"/><path d="M14 14.66V17c0 .55.45 1 1 1h2"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
            <span>दानदाता लीडरबोर्ड</span>
          </a>
          <a href="#gallery" onClick={handleNav('gallery')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>
            <span>Our Gallery</span>
          </a>
          <a href="#feedback" onClick={handleNav('feedback')}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
            <span>Feedback / Joining</span>
          </a>
        </div>
      )}
    </div>
  );
}

export function FeedbackForm() {
  const [form, setForm] = useState({ name: '', mobile: '', comments: '' });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `📋 TCF Joining / Feedback Form\n\n👤 नाम: ${form.name}\n📱 मोबाइल: ${form.mobile}\n💬 टिप्पणी: ${form.comments || 'N/A'}`;
    window.open(`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank');
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name: '', mobile: '', comments: '' }); }, 3000);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="ff-group">
        <label htmlFor="ff-name">आपका नाम</label>
        <input id="ff-name" type="text" placeholder="पूरा नाम लिखें" value={form.name} onChange={update('name')} required />
      </div>
      <div className="ff-group">
        <label htmlFor="ff-mobile">मोबाइल नंबर</label>
        <input id="ff-mobile" type="tel" placeholder="10 अंकों का मोबाइल नंबर" value={form.mobile} onChange={update('mobile')} pattern="[0-9]{10}" required />
      </div>
      <div className="ff-group">
        <label htmlFor="ff-comments">टिप्पणी / Comments</label>
        <textarea id="ff-comments" placeholder="अपनी बात लिखें..." value={form.comments} onChange={update('comments')} rows={4} />
      </div>
      <button type="submit" className={`btn btn-gold ff-submit ${sent ? 'sent' : ''}`}>
        {sent ? '✅ भेज दिया गया!' : '📩 WhatsApp पर भेजें'}
      </button>
    </form>
  );
}

export function GoldenScroll() {
  return (
    <div className="gs-wrapper-new">
      {/* Reveal wrapper ensures it animates ONLY when scrolled into view */}
      <Reveal delay={150} className="w-100">
        <div className="gs-banner-edge">
          <div className="gs-image-container">
            <img 
              src="https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/1579-amp_Gby-v2_ZV.jpg" 
              alt="TCF Journey & History" 
              className="gs-history-img"
              loading="lazy"
            />
            {/* The Golden Shine Overlay */}
            <div className="gs-shine-overlay"></div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}