'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styles from './aiAds.module.scss';
import Image from 'next/image';
import SimpleInterface from '../simpleInterface';

const AiAdsImage = '/assets/images/left-image-glass.webp';
const TiktokFrameImage = '/assets/images/tiktok-frame.png';
const AiAdsVideo = '/assets/video/glass-video.mp4';
const HelixIcon = '/assets/icons/helix.svg';
const TilktokIcon = '/assets/icons/tilktok.svg';
const InstagramIcon = '/assets/icons/instagram.svg';
const YoutubeIcon = '/assets/icons/youtube.svg';
const MediumIcon = '/assets/icons/medium.svg';
const DriveIcon = '/assets/icons/drive.svg';

/* ---------------- animation variants ---------------- */

const fadeLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
};

const fadeRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
};

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const stagger = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

export default function AiAds() {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef(null);

    const handleMove = (event) => {
        if (!isDragging && event.type !== 'mousemove' && event.type !== 'touchmove') return;
        if (isDragging || event.type === 'mousemove' || event.type === 'touchmove') {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const x = (event.pageX || event.touches?.[0]?.pageX) - rect.left;
            const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
            setSliderPosition(position);
        }
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMove);
            window.addEventListener('mouseup', handleMouseUp);
            window.addEventListener('touchmove', handleMove);
            window.addEventListener('touchend', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('touchmove', handleMove);
            window.removeEventListener('touchend', handleMouseUp);
        };
    }, [isDragging]);

    return (
        <div className={styles.aiAds}>
            <div className="container">
                <div className={styles.grid}>

                    {/* Left content */}
                    <motion.div
                        className={styles.griditems}
                        variants={fadeLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    >
                        <div className={styles.text}>
                            <h2>
                                AI Ads Currently Convert Millions in Revenue
                            </h2>

                            <motion.div
                                className={styles.allIconText}
                                variants={stagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {[1, 2, 3].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className={styles.iconText}
                                        variants={fadeUp}
                                        transition={{ duration: 0.4, ease: 'easeOut' }}
                                    >
                                        <Image src={HelixIcon} alt="HelixIcon" width={29} height={20} />
                                        <p>
                                            {i === 0 && 'Create unlimited UGC-style video ads with Helix AI.'}
                                            {i === 1 && 'Post. Track analytics. Boost what perform.'}
                                            {i === 2 && 'Watch your Media Spend & Customer Acquisition Cost disappear.'}
                                        </p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Social icons */}
                        <motion.div
                            className={styles.socialIconAlignment}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <motion.div
                                className={styles.imageAlignment}
                                variants={stagger}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                {[TilktokIcon, InstagramIcon, YoutubeIcon, MediumIcon, DriveIcon].map(
                                    (icon, index) => (
                                        <motion.img
                                            key={index}
                                            src={icon}
                                            alt="social-icon"
                                            variants={fadeUp}
                                            transition={{ duration: 0.3 }}
                                            whileHover={{
                                                y: -6,
                                                rotateX: 12,
                                                rotateY: -12,
                                                scale: 1.08
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                cursor: 'pointer'
                                            }}
                                        />
                                    )
                                )}
                            </motion.div>

                            <p>
                                Post Directly to
                            </p>
                        </motion.div>
                    </motion.div>

                    {/* Right image/video comparison */}
                    <motion.div
                        className={styles.griditems}
                        variants={fadeRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: 'easeOut' }}
                    >
                        <div className={styles.cardBox}>
                            <div
                                className={styles.compareContainer}
                                ref={containerRef}
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleMouseDown}
                            // onMouseMove={(e) => !isDragging && handleMove(e)}
                            >
                                {/* Left Side: Image */}
                                <div className={styles.leftImage}>
                                    <img src={AiAdsImage} alt="Before AI" />
                                </div>

                                {/* Right Side: Video clipped by slider position */}
                                <div
                                    className={styles.rightVideo}
                                    style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                                >
                                    <video
                                        src={AiAdsVideo}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                    />
                                    <div className={styles.frame}>
                                        <img src={TiktokFrameImage} alt="TiktokFrameImage" />
                                    </div>
                                </div>

                                {/* Slider Handle */}
                                <div
                                    className={styles.handle}
                                    style={{ left: `${sliderPosition}%` }}
                                />
                            </div>
                        </div>
                    </motion.div>

                </div>
                <SimpleInterface />
            </div>
        </div>
    );
}
