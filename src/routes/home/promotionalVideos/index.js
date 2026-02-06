'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './promotionalVideos.module.scss';
const SkinImage = '/assets/images/skin-img.png';
const SkinImage2 = '/assets/images/skin-sec.png';
const Video = '/assets/video/video2.mp4';


const videoList = [
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/c167208f-16a6-4d78-894c-837f8a43dcc0.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/5921fae9-1084-417e-8089-ef66aeb5b9dc.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/f631aba2-242f-4e7a-ad7d-eacfab71315b.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/e3240607-4d29-4595-9692-d5e1b0c1f4ca.mp4',
];
export default function PromotionalVideos() {
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
        <div className={styles.promotionalVideos}>
            <div className='container-lg'>
                <h2>For Website <span>Promotional Videos</span> For Product Pages</h2>

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
                                playsInline
                                preload="none"
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
                <div className={styles.imagegrid}>
                    <video playsInline
                        preload="none"
                        autoPlay
                        loop
                        muted
                        src="https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/819d39d1-230d-476c-a6db-a30cd3577e0a.mp4#t=0,7.5"></video>
                    <video playsInline
                        preload="none"
                        autoPlay
                        loop
                        muted
                        src="https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/1fbdf5b4-e647-458d-84e3-1f2929d4578e.mp4#t=0,7.5"></video>
                </div>
            </div>
        </div>
    )
}
