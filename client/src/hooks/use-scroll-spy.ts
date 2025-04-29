import { useState, useEffect } from 'react';

interface ScrollSpyOptions {
  offset?: number;
  rootMargin?: string;
}

export const useScrollSpy = (
  itemIds: string[],
  options: ScrollSpyOptions = {}
): string | null => {
  const [activeId, setActiveId] = useState<string | null>(null);
  
  useEffect(() => {
    const handler = () => {
      // Get all sections
      const elements = itemIds.map(id => document.getElementById(id));
      
      // Find the section closest to the top of the viewport
      let currentSection: Element | null = null;
      let minDistance = Infinity;
      
      elements.forEach(element => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(rect.top);
        
        if (distance < minDistance) {
          minDistance = distance;
          currentSection = element;
        }
      });
      
      setActiveId(currentSection?.id || null);
    };
    
    handler(); // Call once to set initial active section
    
    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [itemIds]);
  
  return activeId;
};
