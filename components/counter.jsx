'use client';

import { useEffect, useRef, useState } from 'react';

const formatter = (decimals) =>
  new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export default function Counter({ value, decimals = 0, prefix = '', suffix = '' }) {
  const node = useRef(null);
  const [current, setCurrent] = useState(0);
  const format = formatter(decimals);

  useEffect(() => {
    const element = node.current;
    if (!element) return undefined;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrent(value);
      return undefined;
    }

    let frame;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        const duration = 1500;
        const start = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - (1 - t) ** 3;
          setCurrent(value * eased);
          if (t < 1) frame = requestAnimationFrame(step);
        };
        frame = requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={node}>
      {prefix}
      {format.format(current)}
      {suffix}
    </span>
  );
}
