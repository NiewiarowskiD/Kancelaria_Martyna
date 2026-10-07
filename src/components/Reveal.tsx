import { useEffect, useRef, useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';

interface RevealProps {
  children: ReactNode;
  /** opóźnienie animacji w ms */
  delay?: number;
  /** kierunek wjazdu */
  from?: 'up' | 'left' | 'right';
}

/** Płynne pojawienie się elementu po przewinięciu do niego (IntersectionObserver). */
export default function Reveal({ children, delay = 0, from = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const offset =
    from === 'up' ? 'translateY(36px)' : from === 'left' ? 'translateX(-48px)' : 'translateX(48px)';

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : offset,
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Box>
  );
}
