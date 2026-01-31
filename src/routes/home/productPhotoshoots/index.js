'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './productPhotoshoots.module.scss';
const Video3 = '/assets/video/video3.mp4';
const videoList = [
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/3121bffa-fb1c-4e75-8a43-a61d4a3f4833.mp4",
    Video3,
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/e6056221-6367-45c4-bb4a-94b14228ceea.mp4",
    Video3,
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/cff2cd03-ab73-45ad-b875-0494273513f2.mp4",
    Video3,
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/acdb5051-9f58-4b2a-a7c4-4e39f6028965.mp4",
    Video3,
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
                        >

                            <video
                                src={src}
                                autoPlay
                                loop
                                muted
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    opacity: 1,
                                    transition: "opacity 0.5s ease",
                                    display: "block",
                                }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
