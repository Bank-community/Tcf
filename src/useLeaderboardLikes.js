import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, update, increment } from 'firebase/database';
import confetti from 'canvas-confetti';
import { db, LEADERBOARD_SETTINGS } from './config.js';

const STORAGE_KEY = 'tcf_chhath_likes_v2';

// Firebase key में अवैध अक्षर (., #, $, [, ], /) हटाने के लिए
const toSafeKey = (id) => String(id || '').trim().replace(/[.#$\[\]/]/g, '_');

export function useLeaderboardLikes() {
  const [likesState, setLikesState] = useState(() => {
    if (typeof window === 'undefined') {
      return { userLiked: {} };
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : { userLiked: {} };
    } catch {
      return { userLiked: {} };
    }
  });

  const [dbLikes, setDbLikes] = useState({});
  const [animatingId, setAnimatingId] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likesState));
    } catch {
      // Ignore storage errors
    }
  }, [likesState]);

  // Firebase Realtime Database से लाइव लाइक काउंट सुनें
  useEffect(() => {
    if (LEADERBOARD_SETTINGS.isDemo) return;
    const likesRef = ref(db, 'leaderboardLikes');
    const unsubscribe = onValue(
      likesRef,
      (snapshot) => {
        setDbLikes(snapshot.val() || {});
      },
      (error) => {
        console.error('Error reading leaderboardLikes:', error);
      }
    );
    return () => unsubscribe();
  }, []);

  const isLiked = useCallback((donorId) => {
    return !!likesState.userLiked[donorId];
  }, [likesState]);

  const getLikeCount = useCallback((donor) => {
    if (LEADERBOARD_SETTINGS.isDemo) {
      const base = donor.initialLikes || 0;
      const likedByUser = !!likesState.userLiked[donor.id];
      return base + (likedByUser ? 1 : 0);
    }
    const safeKey = toSafeKey(donor.id);
    return typeof dbLikes[safeKey] === 'number' ? dbLikes[safeKey] : 0;
  }, [likesState, dbLikes]);

  const toggleLike = useCallback((donorId) => {
    const currentlyLiked = !!likesState.userLiked[donorId];
    const safeKey = toSafeKey(donorId);

    setLikesState((prev) => ({
      ...prev,
      userLiked: {
        ...prev.userLiked,
        [donorId]: !currentlyLiked,
      },
    }));

    if (!LEADERBOARD_SETTINGS.isDemo && safeKey) {
      const currentDbVal = typeof dbLikes[safeKey] === 'number' ? dbLikes[safeKey] : 0;
      // अगर पहले से लाइक है तो -1 करें (0 से नीचे न जाए), वरना +1 करें
      const delta = currentlyLiked ? (currentDbVal > 0 ? -1 : 0) : 1;

      if (delta !== 0) {
        update(ref(db, 'leaderboardLikes'), {
          [safeKey]: increment(delta),
        }).catch((err) => {
          console.error('Failed to save like to Firebase:', err);
        });
      }
    }

    if (!currentlyLiked) {
      try {
        confetti({
          particleCount: 55,
          spread: 65,
          origin: { y: 0.72 },
          colors: ['#ffd700', '#f59e0b', '#ef4444', '#ffffff'],
          zIndex: 99999
        });
      } catch {}
    }

    setAnimatingId(donorId);
    setTimeout(() => {
      setAnimatingId((curr) => (curr === donorId ? null : curr));
    }, 700);
  }, [likesState, dbLikes]);

  return {
    isLiked,
    getLikeCount,
    toggleLike,
    animatingId,
  };
}