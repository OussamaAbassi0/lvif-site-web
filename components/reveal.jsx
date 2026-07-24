'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Révélation progressive à l'entrée dans le viewport.
 * Sans JavaScript ou avec prefers-reduced-motion, le contenu reste visible.
 */
export default function Reveal({ children, delay = 0, as: Tag = 'div', className = '' }) {
  const node = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = node.current;
    if (!element) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={node}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={shown ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
