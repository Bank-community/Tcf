import React, { useState, useMemo } from 'react';
import { SITE, LEADERBOARD_DONORS, LEADERBOARD_SETTINGS, getSortedLeaderboard, formatINR, wa, MSGS, useLiveLeaderboard } from './config.js';
import { DonorAvatar, LikeButton } from './LeaderboardSection.jsx';
import { useLeaderboardLikes } from './useLeaderboardLikes.js';
import { Logo } from './components.jsx';

/**
 * Dedicated Full Leaderboard Page (/leaderboard)
 * Displays all 10 ranked donors strictly sorted by donation amount.
 * Likes do NOT affect ranking.
 * Excludes donation count and last donation date as requested.
 */
export default function LeaderboardPage({ onBack, onNavigate }) {
  const [searchTerm, setSearchTerm] = useState('');
  const { isLiked, getLikeCount, toggleLike, animatingId } = useLeaderboardLikes();
  const { liveDonors } = useLiveLeaderboard();

  // Full sorted donors list (strictly amount descending, then stable tie-breaker)
  const displayDonors = LEADERBOARD_SETTINGS.isDemo ? LEADERBOARD_DONORS : liveDonors;
  const allSortedDonors = useMemo(() => getSortedLeaderboard(displayDonors), [displayDonors]);

  // Filtered by search keyword (member name)
  const filteredDonors = useMemo(() => {
    if (!searchTerm.trim()) return allSortedDonors;
    const term = searchTerm.toLowerCase().trim();
    return allSortedDonors.filter((d) => d.name.toLowerCase().includes(term));
  }, [allSortedDonors, searchTerm]);

  // Campaign totals
  const totalDonors = allSortedDonors.length;
  const totalCollected = useMemo(() => {
    return allSortedDonors.reduce((sum, d) => sum + d.amount, 0);
  }, [allSortedDonors]);

  return (
    <div className="chhath-full-leaderboard-page">
      {/* Sticky Top Navigation Header */}
      <header className="flb-nav">
        <div className="wrap flb-nav-in">
          <button
            type="button"
            className="flb-back-btn"
            onClick={onBack}
            aria-label="मुख्य पृष्ठ पर वापस जाएँ (Back to Home)"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flb-back-arrow">
              <path d="m15 18-6-6 6-6" />
            </svg>
            <span className="flb-back-text">वापस जाएँ</span>
          </button>

          <div className="flb-brand">
            <Logo size={36} />
            <div className="flb-brand-txt">
              <strong>{SITE.name}</strong>
              <span>{LEADERBOARD_SETTINGS.festivalTag}</span>
            </div>
          </div>

          <div className="flb-header-badge">
            <span className="flb-pill-badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flb-pill-icon">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                <path d="M4 22h16" />
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
              </svg>
              TCF COMMUNITY
            </span>
          </div>
        </div>
      </header>

      {/* Hero Banner with Festive Chhath Atmosphere */}
      <div className="flb-hero-banner">
        <div className="flb-hero-overlay"></div>
        <div className="flb-sun-glow" aria-hidden="true"></div>
        <div className="wrap flb-hero-content">
          <div className="flb-eyebrow-row">
            <span className="flb-tag-gold">CHHATH PUJA SPECIAL 2026</span>
          </div>
          <h1 className="flb-hero-title">{LEADERBOARD_SETTINGS.altTitle}</h1>
          <p className="flb-hero-sub">{LEADERBOARD_SETTINGS.fullPageSupportingCopy}</p>

          {LEADERBOARD_SETTINGS.isDemo && (
            <div className="flb-demo-badge">
              <span className="flb-demo-pulse"></span>
              <span>डेमो डेटा (Demo Figures for Preview)</span>
            </div>
          )}

          {/* Metric Summary Cards */}
          <div className="flb-summary-cards">
            <div className="flb-stat-card">
              <div className="flb-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="flb-stat-info">
                <span className="flb-stat-title">कुल दानदाता</span>
                <strong className="flb-stat-number">{totalDonors}</strong>
              </div>
            </div>

            <div className="flb-stat-card featured-stat">
              <div className="flb-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="22" y2="12" />
                  <path d="M14.5 9a2.5 2.5 0 0 0-5 0c0 4 5 2 5 6a2.5 2.5 0 0 1-5 0" />
                </svg>
              </div>
              <div className="flb-stat-info">
                <span className="flb-stat-title">कुल संग्रह राशि</span>
                <strong className="flb-stat-number">{formatINR(totalCollected)}</strong>
              </div>
            </div>

            <div className="flb-stat-card">
              <div className="flb-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="flb-stat-info">
                <span className="flb-stat-title">हमारा लक्ष्य</span>
                <strong className="flb-stat-number">{formatINR(LEADERBOARD_SETTINGS.campaignGoal)}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table / Card Section */}
      <main className="flb-main-body">
        <div className="wrap">
          {/* Interactive Search & Sort Bar */}
          <div className="flb-filter-bar">
            <div className="flb-search-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flb-search-icon">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="flb-search-input"
                placeholder="नाम से खोजें..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="दानदाता के नाम से खोजें"
              />
              {searchTerm && (
                <button
                  type="button"
                  className="flb-clear-search-btn"
                  onClick={() => setSearchTerm('')}
                  aria-label="खोज साफ़ करें"
                >
                  ×
                </button>
              )}
            </div>

            <div className="flb-sort-indicator">
              <span className="flb-sort-label">क्रम:</span>
              <span className="flb-sort-val">राशि के अनुसार (अधिक से कम) ↓</span>
            </div>
          </div>

          {/* Table Header (Desktop view) */}
          <div className="flb-table-head" aria-hidden="true">
            <div className="th-col th-rank">रैंक</div>
            <div className="th-col th-member">सदस्य का नाम</div>
            <div className="th-col th-amount">कुल दान राशि</div>
            <div className="th-col th-likes">कृतज्ञता (लाइक)</div>
          </div>

          {/* Donor Rows List */}
          <div className="flb-donors-list" role="feed" aria-label="दानदाता सूची">
            {filteredDonors.length === 0 ? (
              <div className="flb-no-results">
                <p>"{searchTerm}" नाम से कोई दानदाता नहीं मिला।</p>
                <button type="button" className="btn btn-sm btn-gold" onClick={() => setSearchTerm('')}>
                  सभी दानदाता देखें
                </button>
              </div>
            ) : (
              filteredDonors.map((donor) => {
                const isPodium = donor.rank <= 3;
                const rankType = donor.rank === 1 ? 'rank-1' : donor.rank === 2 ? 'rank-2' : donor.rank === 3 ? 'rank-3' : 'rank-standard';

                return (
                  <article key={donor.id} className={`flb-donor-row ${rankType}`}>
                    {/* Rank Badge */}
                    <div className="flb-col-rank">
                      {donor.rank === 1 ? (
                        <div className="flb-medal-badge gold" title="Rank 1">
                          <span className="medal-crown">👑</span>
                          <span className="medal-num">1</span>
                        </div>
                      ) : donor.rank === 2 ? (
                        <div className="flb-medal-badge silver" title="Rank 2">
                          <span className="medal-crown">🥈</span>
                          <span className="medal-num">2</span>
                        </div>
                      ) : donor.rank === 3 ? (
                        <div className="flb-medal-badge bronze" title="Rank 3">
                          <span className="medal-crown">🥉</span>
                          <span className="medal-num">3</span>
                        </div>
                      ) : (
                        <div className="flb-regular-rank" title={`Rank ${donor.rank}`}>
                          {donor.rank}
                        </div>
                      )}
                    </div>

                    {/* Member Details */}
                    <div className="flb-col-member">
                      <DonorAvatar photo={donor.photo} name={donor.name} rank={donor.rank} size={50} />
                      <div className="flb-member-info">
                        <h3 className={`flb-member-name ${isPodium ? 'podium-name' : ''}`}>{donor.name}</h3>
                        <span className="flb-member-badge">
                          {donor.rank === 1 ? 'सर्वोच्च दानदाता' : donor.rank <= 3 ? 'विशेष सहयोगी' : 'समुदाय साथी'}
                        </span>
                      </div>
                    </div>

                    {/* Donation Amount */}
                    <div className="flb-col-amount">
                      <span className="flb-amount-display">{formatINR(donor.amount)}</span>
                    </div>

                    {/* Like / Appreciation Button */}
                    <div className="flb-col-likes">
                      <LikeButton
                        donor={donor}
                        isLiked={isLiked(donor.id)}
                        count={getLikeCount(donor)}
                        onToggle={toggleLike}
                        isAnimating={animatingId === donor.id}
                      />
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Traditional Chhath Quote Box */}
          <div className="flb-quote-card">
            <div className="flb-quote-icon" aria-hidden="true">❝</div>
            <div className="flb-quote-body">
              <p className="flb-quote-text">{LEADERBOARD_SETTINGS.quote}</p>
              <span className="flb-quote-author">— {LEADERBOARD_SETTINGS.quoteAuthor}</span>
            </div>
            <div className="flb-quote-diya" aria-hidden="true">🪔</div>
          </div>

          {/* Action to contribute or inquire */}
          <div className="flb-footer-actions">
            <div className="flb-help-card">
              <h3>क्या आप भी इस पावन महापर्व में सहयोग करना चाहते हैं?</h3>
              <p>TCF परिवार के साथ जुड़कर समाज कल्याण में अपना योगदान दें।</p>
              <div className="flb-cta-btns">
                <a
                  className="btn btn-gold"
                  href={wa('नमस्ते TCF, मैं छठ पूजा दान व सहयोग में भाग लेना चाहता/चाहती हूँ।')}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '20px', height: '20px', marginRight: '8px' }}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp पर संपर्क करें</span>
                </a>
                <button type="button" className="btn btn-ghost" onClick={onBack}>
                  मुख्य पृष्ठ पर जाएँ
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}