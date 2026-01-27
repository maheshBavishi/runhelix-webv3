'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './productPhotoshoots.module.scss';
const videoList = [
    'http://kblkgatxovviyqgonsbq.supabase.co/storage/v1/object/public/my-videos/9a65b325-ce71-43eb-b9ad-f114f80debda.mp4',
    'http://kblkgatxovviyqgonsbq.supabase.co/storage/v1/object/public/my-videos/9a65b325-ce71-43eb-b9ad-f114f80debda.mp4',
    'http://kblkgatxovviyqgonsbq.supabase.co/storage/v1/object/public/my-videos/9a65b325-ce71-43eb-b9ad-f114f80debda.mp4',
    'http://kblkgatxovviyqgonsbq.supabase.co/storage/v1/object/public/my-videos/9a65b325-ce71-43eb-b9ad-f114f80debda.mp4',
    'http://kblkgatxovviyqgonsbq.supabase.co/storage/v1/object/public/my-videos/9a65b325-ce71-43eb-b9ad-f114f80debda.mp4',
    'http://kblkgatxovviyqgonsbq.supabase.co/storage/v1/object/public/my-videos/9a65b325-ce71-43eb-b9ad-f114f80debda.mp4',
    'http://kblkgatxovviyqgonsbq.supabase.co/storage/v1/object/public/my-videos/9a65b325-ce71-43eb-b9ad-f114f80debda.mp4',
    'http://kblkgatxovviyqgonsbq.supabase.co/storage/v1/object/public/my-videos/9a65b325-ce71-43eb-b9ad-f114f80debda.mp4',
];

export default function ProductPhotoshoots() {
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
        <div className={styles.productPhotoshoots}>
            <div className='container-lg'>
                <h2>Product Photoshoots For Product Pages, Crowdfunding, & Decks</h2>
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
    )
}
