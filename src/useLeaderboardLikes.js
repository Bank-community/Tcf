import { useState, useEffect, useCallback } from 'react';
import { ref, onValue, runTransaction } from 'firebase/database';
import { db, LEADERBOARD_SETTINGS } from './config.js';

const STORAGE_KEY = 'tcf_chhath_likes_v2';

/**
 * Custom hook for managing donor appreciation (Likes).
 * Saves individual user's liked state in localStorage and syncs total countable likes
 * in real-time with Firebase Realtime Database. Likes NEVER affect donation ranking.
 */
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

  // Sync user's liked status to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(likesState));
    } catch {
      // Ignore quota/private browsing issues
    }
  }, [likesState]);

  // Subscribe to real-time like counts from Firebase Realtime Database
  useEffect(() => {
    if (LEADERBOARD_SETTINGS.isDemo) return;
    const likesRef = ref(db, 'leaderboardLikes');
    const unsubscribe = onValue(likesRef, (snapshot) => {
      setDbLikes(snapshot.val() || {});
    });
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
    const liveCount = typeof dbLikes[donor.id] === 'number' ? dbLikes[donor.id] : 0;
    if (likesState.userLiked[donor.id] && liveCount === 0) {
      return 1;
    }
    return liveCount;
  }, [likesState, dbLikes]);

  const toggleLike = useCallback((donorId) => {
    const currentlyLiked = !!likesState.userLiked[donorId];

    setLikesState((prev) => ({
      ...prev,
      userLiked: {
        ...prev.userLiked,
        [donorId]: !currentlyLiked,
      },
    }));

    // Atomically increment or decrement the count in Firebase Realtime Database
    if (!LEADERBOARD_SETTINGS.isDemo) {
      const donorLikeRef = ref(db, `leaderboardLikes/${donorId}`);
      runTransaction(donorLikeRef, (currentVal) => {
        const curr = Number(currentVal) || 0;
        return currentlyLiked ? Math.max(0, curr - 1) : curr + 1;
      }).catch((err) => {
        console.error('Failed to sync like to database:', err);
      });
    }

    // Trigger brief heartbeat pop animation
    setAnimatingId(donorId);
    setTimeout(() => {
      setAnimatingId((curr) => (curr === donorId ? null : curr));
    }, 700);
  }, [likesState]);

  return {
    isLiked,
    getLikeCount,
    toggleLike,
    animatingId,
  };
}
