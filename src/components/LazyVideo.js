'use client';

import React, { useRef, useState, forwardRef } from 'react';
import { useInView } from 'framer-motion';

const LazyVideo = forwardRef(({ src, className, style, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = useState(false);
    // Container ref for intersection observer
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className={className} style={{ position: 'relative', height: '550px', overflow: 'hidden', ...style }}>
            {/* Show skeleton if not loaded or not in view */}
            {(!isLoaded) && (
                <div
                    className="skeleton-video"
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        // Ensure it covers the video area
                        minHeight: '100%'
                    }}
                />
            )}

            {isLoaded && (
                <video
                    ref={ref}
                    src={src}
                    onLoadedData={() => setIsLoaded(true)}
                    style={{
                        ...style,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        opacity: isLoaded ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                        display: 'block'
                    }}
                    {...props}
                />
            )}
        </div>
    );
});

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;
