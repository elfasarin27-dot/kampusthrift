import { useEffect, useRef } from 'react';

/**
 * Custom React Hook for 30-Minute Inactivity Auto-Logout
 * @param {boolean} isLoggedIn - Whether a user is currently logged in
 * @param {Function} onInactivityLogout - Callback to execute on 30 minutes of idle inactivity
 * @param {number} timeoutMs - Inactivity timeout in milliseconds (Default: 30 minutes = 1,800,000 ms)
 */
export function useInactivityTimer(isLoggedIn, onInactivityLogout, timeoutMs = 30 * 60 * 1000) {
  const timerRef = useRef(null);

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (isLoggedIn) {
      timerRef.current = setTimeout(() => {
        if (onInactivityLogout) {
          onInactivityLogout();
        }
      }, timeoutMs);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    // List of user interaction events that reset the 30-minute idle timer
    const activityEvents = [
      'mousemove', 
      'mousedown', 
      'keydown', 
      'scroll', 
      'touchstart', 
      'click'
    ];

    // Initialize timer
    resetTimer();

    const handleUserActivity = () => {
      resetTimer();
    };

    // Attach activity listeners
    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleUserActivity, { passive: true });
    });

    // Cleanup listeners and timer on unmount
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleUserActivity);
      });
    };
  }, [isLoggedIn, timeoutMs]);
}
