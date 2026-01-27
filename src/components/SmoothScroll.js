'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export default function SmoothScroll({ children }) {
  // Use scrollY to get the current scroll position in pixels
  const { scrollY } = useScroll();

  // Apply spring physics to the scroll value
  // These physics values (mass, stiffness, damping) control the "smoothness"
  // Adjust them to get the desired "fully smooth" feel (momentum-like)
  const smoothY = useSpring(scrollY, {
    mass: 0.1,
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  const [pageHeight, setPageHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (contentRef.current) {
        setPageHeight(contentRef.current.scrollHeight);
      }
    };

    // Initial measure
    handleResize();

    // Re-measure on window resize
    window.addEventListener('resize', handleResize);

    // Re-measure when content changes size
    const resizeObserver = new ResizeObserver(() => handleResize());
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, []);

  // Transform the smoothY value to negative for the fixed container
  const y = useTransform(smoothY, (value) => -value);

  return (
    <>
      <motion.div
        ref={contentRef}
        style={{
          y,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          willChange: 'transform',
          // Ensure it's above the dummy spacer if needed, but z-index usage depends on the app
        }}
        className="smooth-scroll-wrapper"
      >
        {children}
      </motion.div>
      {/* 
        This div maintains the body height so the browser scrollbar works 
        and drives the useScroll value.
      */}
      <div style={{ height: pageHeight }} />
    </>
  );
}
