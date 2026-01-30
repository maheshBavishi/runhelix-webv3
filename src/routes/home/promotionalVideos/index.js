'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './promotionalVideos.module.scss';
import LazyVideo from '../../../components/LazyVideo';
const SkinImage = '/assets/images/skin-img.png';
const SkinImage2 = '/assets/images/skin-sec.png';
const Video = '/assets/video/video2.mp4';


const videoList = [
    Video,
    Video,
    Video,
    Video,
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
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <LazyVideo
                                ref={(el) => (videoRefs.current[index] = el)}
                                muted
                                loop
                                playsInline
                                src={src}
                            />
                        </motion.div>
                    ))}
                </div>
                <div className={styles.imagegrid}>
                    <img src={SkinImage} alt="SkinImage" />
                    <img src={SkinImage2} alt="SkinImage2" />
                </div>
            </div>
        </div>
    )
}
