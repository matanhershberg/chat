import { useEffect, useRef } from "react";

interface UseAutoScrollOptions {
  /**
   * Whether to enable auto-scroll behavior
   * @default true
   */
  enabled?: boolean;
  /**
   * Threshold in pixels from bottom to consider "at bottom"
   * @default 10
   */
  bottomThreshold?: number;
}

/**
 * Custom hook for auto-scrolling chat components
 * Automatically scrolls to bottom for new content unless user has scrolled up
 */
export const useAutoScroll = (
  dependencies: React.DependencyList,
  options: UseAutoScrollOptions = {},
) => {
  const { enabled = true, bottomThreshold = 10 } = options;

  const scrollRef = useRef<HTMLDivElement>(null);
  const isUserScrolling = useRef(false);

  // Auto-scroll when dependencies change (e.g., new messages) or on mount
  useEffect(() => {
    if (enabled && !isUserScrolling.current && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [enabled, dependencies]);

  // Handle scroll events to detect user scrolling
  const handleScroll = () => {
    if (!enabled || !scrollRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const isAtBottom =
      scrollTop + clientHeight >= scrollHeight - bottomThreshold;

    // If user is at bottom, allow auto-scroll
    if (isAtBottom) {
      isUserScrolling.current = false;
    } else {
      // User has scrolled up, disable auto-scroll
      isUserScrolling.current = true;
    }
  };

  return {
    scrollRef,
    handleScroll,
    isUserScrolling: isUserScrolling.current,
  };
};
