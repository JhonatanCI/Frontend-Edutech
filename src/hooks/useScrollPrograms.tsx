import {useState, useEffect } from 'react';

export const useScrollPrograms = (containerRef: React.RefObject<HTMLDivElement>) => {
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    const checkScrollPosition = () => {
        if (containerRef.current) {
          const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    
          setIsAtStart(scrollLeft <= 0);
          setIsAtEnd(scrollLeft + clientWidth >= scrollWidth);
        }
      };

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
          container.addEventListener('scroll', checkScrollPosition);
        }
        
        checkScrollPosition();
    
        return () => {
          if (container) {
            container.removeEventListener('scroll', checkScrollPosition);
          }
        };
      }, []);

      return {isAtStart, isAtEnd}
}