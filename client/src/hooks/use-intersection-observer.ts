import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number | number[];
  root?: Element | null;
  rootMargin?: string;
  once?: boolean;
}

export const useInView = (
  ref: RefObject<Element>,
  options: IntersectionObserverOptions = {},
): boolean => {
  const { threshold = 0, root = null, rootMargin = '0px', once = false } = options;
  const [isIntersecting, setIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const element = ref?.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isElementIntersecting = entry.isIntersecting;
        
        // Update state
        setIntersecting(isElementIntersecting);
        
        // Unobserve if it should only trigger once and is intersecting
        if (once && isElementIntersecting && observer && element) {
          observer.unobserve(element);
        }
      },
      { threshold, root, rootMargin }
    );

    observer.observe(element);
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, threshold, root, rootMargin, once]);

  return isIntersecting;
};
