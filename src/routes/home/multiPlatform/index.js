'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './multiPlatform.module.scss';

const videoList = [
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
];

export default function MultiPlatform() {
    const videoRefs = useRef([]);

    const handleMouseEnter = (index) => {
        const video = videoRefs.current[index];
        if (video) video.play();
    };

    const handleMouseLeave = (index) => {
        const video = videoRefs.current[index];
        if (video) video.pause();
        if (video) video.currentTime = 0; // Reset to start
    };

    return (
        <div className={styles.multiPlatform}>
            <div className='container-lg'>
                <h2>Multi-Platform UGC Product Testimonials & Reviews</h2>
                <div className={styles.grid}>
                    {videoList.map((src, index) => (
                        <motion.div
                            key={index}
                            className={styles.items}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <video
                                ref={(el) => (videoRefs.current[index] = el)}
                                muted
                                loop
                                playsInline
                                src={src}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
