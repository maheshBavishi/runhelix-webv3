'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './promotionalVideos.module.scss';
const SkinImage = '/assets/images/skin-img.png';
const SkinImage2 = '/assets/images/skin-sec.png';
const Video = '/assets/video/video2.mp4';


const videoList = [
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/5a3d2ca1-87f1-4fc7-88d8-5af0cb3c79a1.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/a798c647-b764-48ae-b1af-6977ac0a7702.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/0dd4be4f-84b3-4f4a-9baf-d02c92c4d8c7.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/8256e509-917b-4334-b8c9-51832b27c7a7.mp4',
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
                <h2>Promotional Videos For Website & Product Pages</h2>

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
                        src="https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/3e3e829a-f023-4120-9876-51c97ab5f109.mp4"></video>
                    <video playsInline
                        preload="none"
                        autoPlay
                        loop
                        muted
                        src="https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/ca0dc05f-0d3b-4a8c-b083-daedd31d05a5.mp4"></video>
                </div>
            </div>
        </div>
    )
}
