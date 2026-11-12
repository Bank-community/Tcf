import { useState, useEffect } from 'react';
import { SITE, STATS, IMAGES, MSGS, FAQ, wa, DONORS } from './config.js';
import { Reveal, Counter, Logo, Faq, LightboxGallery, HeroGraph, NavMenu, FeedbackForm, GoldenScroll } from './components.jsx';
import GalleryPage from './GalleryPage.jsx';
import LeaderboardSection from './LeaderboardSection.jsx';
import LeaderboardPage from './LeaderboardPage.jsx';

const STEPS = [
  { t: 'Community', d: 'भरोसेमंद लोग एक परिवार की तरह जुड़ते हैं।', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' },
  { t: 'Contribution', d: <>सदस्य नियमों के अनुसार पर Month <strong>SIP</strong> जमा करते हैं।</>, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>' },
  { t: 'Support', d: <>ज़रूरत पड़ने पर, <strong>TCF</strong> के नियमों और पात्रता के अनुसार <strong>लोन</strong> उपलब्ध कराया जाता है।</>, icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>' }
];



const resolveRoute = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname;
  const hash = window.location.hash;
  if (path === '/leaderboard' || path.endsWith('/leaderboard') || hash === '#leaderboard') {
    return 'leaderboard';
  }
  if (hash === '#gallery' || hash === '#gallery-page') {
    return 'gallery';
  }
  return 'home';
};

export default function App() {
  const [page, setPage] = useState(resolveRoute);

  useEffect(() => {
    const onLocationChange = () => {
      setPage(resolveRoute());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', onLocationChange);
    window.addEventListener('hashchange', onLocationChange);

    return () => {
      window.removeEventListener('popstate', onLocationChange);
      window.removeEventListener('hashchange', onLocationChange);
    };
  }, []);

  const navigateTo = (target) => {
    if (target === 'leaderboard') {
      try {
        window.history.pushState(null, '', '/leaderboard');
      } catch {
        window.location.hash = '#leaderboard';
      }
      setPage('leaderboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'gallery') {
      window.location.hash = '#gallery';
      setPage('gallery');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'home') {
      try {
        window.history.pushState(null, '', '/');
      } catch {
        window.location.hash = '';
      }
      setPage('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'feedback') {
      if (page !== 'home') {
        try {
          window.history.pushState(null, '', '/');
        } catch {}
        setPage('home');
        window.location.hash = '#feedback';
        setTimeout(() => {
          const el = document.getElementById('feedback');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        const el = document.getElementById('feedback');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (page === 'leaderboard') {
    return <LeaderboardPage onBack={() => navigateTo('home')} onNavigate={navigateTo} />;
  }

  if (page === 'gallery') {
    return <GalleryPage onBack={() => navigateTo('home')} onFeedback={() => navigateTo('feedback')} />;
  }

  return (
    <>
      <header className="nav">
        <div className="wrap">
          <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}><Logo /> <span>{SITE.name}</span></a>
          <NavMenu onNavigate={navigateTo} />
        </div>
      </header>

      <main id="top">
                  <section className="hero">
          {/* उगते सूर्य (Sunrise) का सेक्शन अब सबसे ऊपर (Edge-to-Edge) */}
          <div className="sunrise sunrise-hero" aria-label="छठ पर्व">
            <Reveal className="sun" delay={100}></Reveal>
            <div className="water" aria-hidden="true" />
            <div className="wrap narrow sun-txt">
              <Reveal delay={400}>
                <h2 className="sunrise-title">उगते सूर्य की तरह, एक नई शुरुआत</h2>
                <p className="sunrise-desc">छठ आस्था, अनुशासन और परिवार की एकजुटता का पर्व है। इसी भावना के साथ, TCF आपको मिलकर आगे बढ़ने की सोच से जुड़ने का निमंत्रण देता है।</p>
              </Reveal>
            </div>
          </div>
          
          {/* Logo & Headline */}
          <div className="wrap hero-in">
            <Reveal delay={200}><Logo size={84} /></Reveal>
            <Reveal delay={300}><h1>इस छठ, जुड़िए एक नई सोच से।</h1></Reveal>
            <Reveal delay={500}><h2 className="hero-sub-title">Trust Community Fund (TCF)</h2></Reveal>
            <Reveal delay={700} className="w-100">
              <div className="story-badge-container">
                <div className="story-badge-glow" aria-hidden="true"></div>
                
                <h2 className="story-main-text">Starting TCF</h2>
                
                <div className="story-line-wrap">
                  <div className="story-line left-line"></div>
                  <div className="story-star">✦</div>
                  <div className="story-line right-line"></div>
                </div>

                <div className="story-date-badge">
                  <span className="story-date-label">ESTD.</span>
                  <span className="story-date-value">{SITE.established}</span>
                </div>
              </div>
            </Reveal>
          </div>

          <GoldenScroll />
        </section>

        {/* --- The Foundation: First 5 Members Section (Moved Right Below Scroll) --- */}
        <section className="foundation-section">
          <div className="wrap narrow">
            <Reveal className="foundation-header">
              <span className="fd-badge">THE FOUNDATION</span>
              <h2>First 5 Members of TCF</h2>
              <p>कोई भी बड़ा बदलाव अकेले नहीं आता। यह उन 5 सदस्यों का अटूट विश्वास था, जहाँ से इस पूरे सफर की मजबूत नींव रखी गई।</p>
            </Reveal>
            
            <Reveal delay={200} className="fd-image-wrapper">
              <div className="fd-glow-bg"></div>
              <div className="fd-glass-frame">
                <img 
                  src="https://ik.imagekit.io/kdtvm0r78/imagebox-uploads/file_00000000ef588208a34ab4c0604686da_qvQGJ5vFL0.png" 
                  alt="First 5 Members of TCF" 
                  className="fd-poster" 
                  loading="lazy" 
                />
                <div className="fd-shine"></div>
              </div>
            </Reveal>
          </div>
        </section>

               {/* Light Theme Edge-to-Edge Growth Card */}
        <section className="growth-section-light">
          <div className="wrap narrow">
            <Reveal className="section-header-light">
              <span className="light-badge">NOW</span>
              <h2>Present Status & Growth</h2>
              <p>Bank Community Loan से TCF का सफर: साथ मिलकर बढ़ता परिवार।</p>
            </Reveal>
          </div>
          
          <Reveal delay={200} className="w-100">
            <HeroGraph />
          </Reveal>
        </section>


        <section className="stats">
          <div className="wrap">
            <Reveal className="section-header-dark">
              <span className="dark-badge">MILESTONE</span>
              <h2>अब तक ₹15 लाख+ का सफल Loan वितरण</h2>
            
            </Reveal>
            <div className="stat-grid">
              {STATS.map((s, i) => (
                <Reveal key={s.label} delay={i * 150} className="stat-card">
                  <div className="stat-icon" dangerouslySetInnerHTML={{ __html: s.icon }}></div>
                  <strong><Counter to={s.value} prefix={s.prefix} suffix={s.suffix} /></strong>
                  <span>{s.label}</span>
                </Reveal>
              ))}
            </div>
           {SITE.provisional && (
              <Reveal delay={450}>
                <small className="note">* आँकड़े अस्थायी हैं और आधिकारिक रिकॉर्ड से पुष्टि के बाद अपडेट किए जाएँगे।</small>
                         </Reveal>
            )}
          </div>
        </section>

               <section id="what" className="about-section">
          <div className="wrap narrow">
            <Reveal className="mission-card">
              <div className="mission-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
              </div>
              <h2>TCF क्या है?</h2>
              <p>TCF एक सामुदायिक फंड है, जिसकी शुरुआत <strong>{SITE.established}</strong> को हुई। सदस्य नियमित योगदान करते हैं और ज़रूरत पड़ने पर नियमों के अनुसार  <strong>लोन</strong> प्राप्त कर सकते हैं।</p>
            </Reveal>
          </div>
        </section>



        <section className="alt">
          <div className="wrap narrow">
            <Reveal><h2 className="c">तीन आसान कदम</h2></Reveal>
            <div className="timeline-steps">
              {STEPS.map((s, i) => (
                <Reveal key={s.t} delay={i * 150} className="timeline-card">
                  <div className="step-number">{i + 1}</div>
                  <div className="step-content">
                    <div className="step-icon" dangerouslySetInnerHTML={{ __html: s.icon }}></div>
                    <div>
                      <h3>{s.t}</h3>
                      <p>{s.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

      

             {/* Chhath Puja Donation Leaderboard Section */}
        <LeaderboardSection onNavigate={navigateTo} />

        {IMAGES.length > 0 && (

          <section id="gallery" className="community-story">
            <div className="wrap">
              <Reveal>
                <div className="section-head c">
                  <span className="badge-text">हमारी Community | Chhath Puja 2025</span>
                  <h2>TCF सिर्फ एक सिस्टम नहीं, एक Community है ❤️</h2>
                  <p>साथ मिलकर आगे बढ़ने की सोच, आपसी सहयोग और यादगार पल — यही है TCF की Community की पहचान।</p>
                  <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
                    <button
                      type="button"
                      onClick={() => navigateTo('gallery')}
                      className="btn btn-gold gp-launch-btn"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '20px', height: '20px' }}>
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                      <span>Our Gallery (गैलरी पेज खोलें) →</span>
                    </button>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={150}>
                <LightboxGallery images={IMAGES} />
              </Reveal>
            </div>
          </section>
        )}

        <section className="alt">
          <div className="wrap narrow">
            <Reveal><h2 className="c">अक्सर पूछे जाने वाले सवाल</h2></Reveal>
            <Faq items={FAQ} />
          </div>
        </section>

        <section id="feedback" className="feedback-section">
          <div className="wrap narrow">
            <Reveal>
              <div className="section-head c">
                <span className="badge-text">Joining / Feedback</span>
                <h2>अपनी बात हम तक पहुँचाएँ</h2>
                <p>सदस्यता, सुझाव या किसी भी जानकारी के लिए नीचे फॉर्म भरें — आपका संदेश सीधे WhatsApp पर पहुँचेगा।</p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <FeedbackForm />
            </Reveal>
          </div>
        </section>

        <section className="cta">
          <div className="wrap">
            <Reveal>
              <h2>आज ही बातचीत शुरू करें</h2>
              <div className="cta-btns">
                <a className="btn btn-gold" href={wa(MSGS.info)} target="_blank" rel="noopener noreferrer">TCF के बारे में जानें</a>
                <a className="btn btn-ghost" href={wa(MSGS.member)} target="_blank" rel="noopener noreferrer">सदस्यता के बारे में पूछें</a>
                <a className="btn btn-ghost" href={wa(MSGS.how)} target="_blank" rel="noopener noreferrer">TCF कैसे काम करता है</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

          <footer className="footer">
        <div className="wrap footer-in">
          <Reveal delay={100} className="footer-brand">
            <Logo size={54} />
            <h3>Trust Community Fund</h3>
            <span className="estd">स्थापना {SITE.established}</span>
          </Reveal>
          
          <Reveal delay={200} className="footer-contact">
            <a href={wa(MSGS.info)} target="_blank" rel="noopener noreferrer" className="fc-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path></svg>
              <span>WhatsApp: {SITE.phoneDisplay}</span>
            </a>
          </Reveal>

          <Reveal delay={300} className="footer-legal">
            <p>अस्वीकरण: यह पेज केवल जानकारी के लिए है। यह किसी ऋण, रिटर्न, लाभ या वित्तीय परिणाम की गारंटी नहीं देता। सभी सहयोग TCF के लागू नियमों, पात्रता और उपलब्ध फंड के अधीन हैं।</p>
            <div className="copy">© {new Date().getFullYear()} Trust Community Fund. All rights reserved.</div>
          </Reveal>
        </div>
      </footer>


      <a className="fab" href={wa(MSGS.info)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp पर संपर्क करें">
        <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>
      </a>
    </>
  );
}