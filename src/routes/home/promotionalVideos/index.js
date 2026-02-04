'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './promotionalVideos.module.scss';
const SkinImage = '/assets/images/skin-img.png';
const SkinImage2 = '/assets/images/skin-sec.png';
const Video = '/assets/video/video2.mp4';


const videoList = [
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/5a3d2ca1-87f1-4fc7-88d8-5af0cb3c79a1.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/ca758ba2-5749-408c-8ac4-d5001e32c37c.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/0dd4be4f-84b3-4f4a-9baf-d02c92c4d8c7.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/38a1271a-694c-47cb-99cb-3bd99450ebf5.mp4',
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
                        src="https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/0adc4b69-d9f8-40bf-b3e0-80f89548bf27.mp4"></video>
                    <video playsInline
                        preload="none"
                        autoPlay
                        loop
                        muted
                        src="https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/51bf38f3-70dd-4ec2-ad5d-f07e47607580.mp4"></video>
                </div>
            </div>
        </div>
    )
}
