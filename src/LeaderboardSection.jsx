import React from 'react';
import { LEADERBOARD_DONORS, LEADERBOARD_SETTINGS, getSortedLeaderboard, formatINR, useLiveLeaderboard } from './config.js';
import { useLeaderboardLikes } from './useLeaderboardLikes.js';
import { Reveal } from './components.jsx';

/**
 * Avatar component with graceful image error fallback and initials fallback
 */
export function DonorAvatar({ photo, name, rank, size = 64 }) {
  const [imgError, setImgError] = React.useState(false);

  // Generate initials (e.g. "Keshav Mishra" -> "KM")
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()
    : 'TC';

  const rankClass = rank === 1 ? 'rank-1-avatar' : rank === 2 ? 'rank-2-avatar' : rank === 3 ? 'rank-3-avatar' : 'rank-other-avatar';

  if (!photo || imgError) {
    return (
      <div
        className={`donor-avatar-placeholder ${rankClass}`}
        style={{ width: `${size}px`, height: `${size}px`, fontSize: `${Math.round(size * 0.38)}px` }}
        aria-hidden="true"
      >
        <span>{initials}</span>
      </div>
    );
  }

  return (
    <div className={`donor-avatar-wrapper ${rankClass}`} style={{ width: `${size}px`, height: `${size}px` }}>
      <img
        src={photo}
        alt={`${name}'s photo`}
        className="donor-avatar-img"
        loading="lazy"
        onError={() => setImgError(true)}
      />
    </div>
  );
}

/**
 * Like button with Heart icon, like count, accessible state, and heartbeat animation
 */
export function LikeButton({ donor, isLiked, count, onToggle, isAnimating }) {
  return (
    <button
      type="button"
      className={`tcf-like-btn ${isLiked ? 'liked' : ''} ${isAnimating ? 'animating' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(donor.id);
      }}
      aria-label={`Like ${donor.name} (वर्तमान लाइक: ${count})`}
      aria-pressed={isLiked}
      title={isLiked ? 'लाइक हटाएँ (Unlike)' : 'लाइक करें (Like)'}
    >
      <svg
        className="heart-icon"
        viewBox="0 0 24 24"
        fill={isLiked ? '#ef4444' : 'none'}
        stroke={isLiked ? '#ef4444' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span className="like-count">{count}</span>
    </button>
  );
}

/**
 * Homepage Top 5 Leaderboard Section
 * Displays Rank 1, 2, 3 in prestigious podium layout, Ranks 4 & 5 in compact rows, and a View All button.
 */
export default function LeaderboardSection({ onNavigate }) {
  const { liveDonors } = useLiveLeaderboard();
  const displayDonors = LEADERBOARD_SETTINGS.isDemo ? LEADERBOARD_DONORS : liveDonors;
  const sortedDonors = React.useMemo(() => getSortedLeaderboard(displayDonors), [displayDonors]);
  const topFive = sortedDonors.slice(0, 5);

  const { isLiked, getLikeCount, toggleLike, animatingId } = useLeaderboardLikes();

  // Metrics calculated from full demo dataset
  const totalDonorsCount = sortedDonors.length;
  const totalCollected = sortedDonors.reduce((acc, d) => acc + d.amount, 0);

  const rank1 = topFive[0];
  const rank2 = topFive[1];
  const rank3 = topFive[2];
  const rank4 = topFive[3];
  const rank5 = topFive[4];

  return (
    <section id="leaderboard-section" className="chhath-leaderboard-section">
      <div className="wrap">
        {/* Section Header */}
        <Reveal>
          <div className="clb-header">
            <div className="clb-eyebrows">
              <span className="clb-badge-gold">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="clb-badge-icon">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.45 1-1 1H7" />
                  <path d="M14 14.66V17c0 .55.45 1 1 1h2" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
                {LEADERBOARD_SETTINGS.englishEyebrow}
              </span>
              <span className="clb-badge-festive">
                {LEADERBOARD_SETTINGS.festivalTag}
              </span>
            </div>

            <h2 className="clb-main-title">
              {LEADERBOARD_SETTINGS.title} <span className="clb-namaste">🙏</span>
            </h2>
            <p className="clb-subtitle">{LEADERBOARD_SETTINGS.subtitle}</p>

            {LEADERBOARD_SETTINGS.isDemo && (
              <div className="clb-demo-notice">
                <span className="clb-demo-dot"></span>
                <span>प्रारंभिक डेमो सूची • सत्यापन उपरांत अद्यतन किया जाएगा (DEMO)</span>
              </div>
            )}
          </div>
        </Reveal>

        {/* Podium for Top 3 */}
        <div className="clb-podium-container">
          {/* Rank #2 (Silver - Left) */}
          {rank2 && (
            <Reveal delay={120} className="clb-podium-slot slot-rank-2">
              <div className="clb-podium-card card-silver">
                <div className="clb-crown-badge silver">
                  <span className="crown-icon">🥈</span>
                  <span className="crown-rank">2</span>
                </div>

                <div className="clb-card-avatar-box">
                  <DonorAvatar photo={rank2.photo} name={rank2.name} rank={2} size={76} />
                </div>

                <h4 className="clb-donor-name">{rank2.name}</h4>
                <div className="clb-amount-tag silver">{formatINR(rank2.amount)}</div>

                <div className="clb-card-footer">
                  <LikeButton
                    donor={rank2}
                    isLiked={isLiked(rank2.id)}
                    count={getLikeCount(rank2)}
                    onToggle={toggleLike}
                    isAnimating={animatingId === rank2.id}
                  />
                </div>
              </div>
            </Reveal>
          )}

          {/* Rank #1 (Gold - Center, Tallest) */}
          {rank1 && (
            <Reveal delay={60} className="clb-podium-slot slot-rank-1">
              <div className="clb-podium-card card-gold">
                <div className="clb-gold-laurel-accent" aria-hidden="true"></div>
                <div className="clb-crown-badge gold">
                  <span className="crown-icon">👑</span>
                  <span className="crown-rank">1</span>
                </div>

                <div className="clb-card-avatar-box gold-glow">
                  <DonorAvatar photo={rank1.photo} name={rank1.name} rank={1} size={88} />
                </div>

                <h4 className="clb-donor-name gold-highlight">{rank1.name}</h4>
                <div className="clb-amount-tag gold">{formatINR(rank1.amount)}</div>

                <div className="clb-card-footer">
                  <LikeButton
                    donor={rank1}
                    isLiked={isLiked(rank1.id)}
                    count={getLikeCount(rank1)}
                    onToggle={toggleLike}
                    isAnimating={animatingId === rank1.id}
                  />
                </div>
              </div>
            </Reveal>
          )}

          {/* Rank #3 (Bronze - Right) */}
          {rank3 && (
            <Reveal delay={180} className="clb-podium-slot slot-rank-3">
              <div className="clb-podium-card card-bronze">
                <div className="clb-crown-badge bronze">
                  <span className="crown-icon">🥉</span>
                  <span className="crown-rank">3</span>
                </div>

                <div className="clb-card-avatar-box">
                  <DonorAvatar photo={rank3.photo} name={rank3.name} rank={3} size={76} />
                </div>

                <h4 className="clb-donor-name">{rank3.name}</h4>
                <div className="clb-amount-tag bronze">{formatINR(rank3.amount)}</div>

                <div className="clb-card-footer">
                  <LikeButton
                    donor={rank3}
                    isLiked={isLiked(rank3.id)}
                    count={getLikeCount(rank3)}
                    onToggle={toggleLike}
                    isAnimating={animatingId === rank3.id}
                  />
                </div>
              </div>
            </Reveal>
          )}
        </div>

        {/* Compact Horizontal Cards for Rank 4 & 5 */}
        <div className="clb-sub-ranks-list">
          {[rank4, rank5].filter(Boolean).map((donor, idx) => {
            const rankNum = idx + 4;
            return (
              <Reveal key={donor.id} delay={220 + idx * 70}>
                <div className="clb-horizontal-card">
                  <div className="clb-h-left">
                    <div className="clb-rank-circle">{rankNum}</div>
                    <DonorAvatar photo={donor.photo} name={donor.name} rank={rankNum} size={48} />
                    <div className="clb-h-info">
                      <h4 className="clb-h-name">{donor.name}</h4>
                      <span className="clb-h-tag">समुदाय साथी</span>
                    </div>
                  </div>

                  <div className="clb-h-right">
                    <div className="clb-h-amount">{formatINR(donor.amount)}</div>
                    <LikeButton
                      donor={donor}
                      isLiked={isLiked(donor.id)}
                      count={getLikeCount(donor)}
                      onToggle={toggleLike}
                      isAnimating={animatingId === donor.id}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Campaign Metrics Summary Bar */}
        <Reveal delay={340}>
          <div className="clb-stats-bar">
            <div className="clb-stat-item">
              <div className="clb-stat-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="clb-stat-data">
                <span className="clb-stat-label">कुल दानदाता</span>
                <strong className="clb-stat-val">{totalDonorsCount}</strong>
              </div>
            </div>

            <div className="clb-stat-item">
              <div className="clb-stat-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="8" />
                  <line x1="12" y1="2" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="22" y2="12" />
                  <path d="M14.5 9a2.5 2.5 0 0 0-5 0c0 4 5 2 5 6a2.5 2.5 0 0 1-5 0" />
                </svg>
              </div>
              <div className="clb-stat-data">
                <span className="clb-stat-label">कुल संग्रह राशि</span>
                <strong className="clb-stat-val">{formatINR(totalCollected)}</strong>
              </div>
            </div>

            <div className="clb-stat-item">
              <div className="clb-stat-icon-wrap">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </div>
              <div className="clb-stat-data">
                <span className="clb-stat-label">हमारा लक्ष्य</span>
                <strong className="clb-stat-val">{formatINR(LEADERBOARD_SETTINGS.campaignGoal)}</strong>
              </div>
            </div>
          </div>
        </Reveal>

        {/* View All Button */}
        <Reveal delay={400}>
          <div className="clb-actions-center">
            <button
              type="button"
              className="clb-view-all-btn"
              onClick={() => onNavigate && onNavigate('leaderboard')}
              id="view-all-donors-btn"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="clb-eye-icon">
                <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              <span>सभी दानदाताओं को देखें →</span>
            </button>
          </div>
        </Reveal>

        {/* Festive Decorative Bottom Accent */}
        <Reveal delay={450}>
          <div className="clb-bottom-motif">
            <div className="clb-diya-icon" aria-hidden="true">🪔</div>
            <span>आस्था • सेवा • समुदाय • साथ हमेशा</span>
            <div className="clb-diya-icon" aria-hidden="true">🪔</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}