'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './multiPlatformDigital.module.scss';
const TiktokFrameImage = '/assets/images/tiktok-frame.png';
const LinkdinImage = '/assets/images/linkdin.png';
const InstagramImage = '/assets/images/Instagram.png';
const YoutubeImage = '/assets/images/youtube.png';
const frames = [TiktokFrameImage, LinkdinImage, InstagramImage, YoutubeImage];

const videoList = [
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/ceb29008-f18f-47a0-8d90-dbdef57dca4a.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/794ea989-dc02-41b9-bd88-52f683342c99.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/2c159a36-087e-45fc-8b3b-d50b0d6d3140.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/5366b959-1cc7-40f3-86a2-f4006019492e.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/cd9c13b1-9623-4419-bdde-6e1a9e6c17fd.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/49eb288f-f239-45a6-be92-11a96a39fd2e.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/16fc20f6-4d8a-4c5c-94c8-624a685d9423.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/a4803275-c9e9-42ad-bcab-7793bc27e612.mp4",
];

export default function MultiPlatformDigital() {
    const videoRefs = useRef([]);
    return (
        <div className={styles.multiPlatformDigital}>
            <div className='container-lg'>
                <h2>Multi-Platform <span> Digital Ad Creatives </span> That Convert</h2>
                <div className={styles.grid}>
                    {videoList.map((src, index) => (
                        <motion.div
                            key={index}
                            className={styles.items}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            {index < 4 && (
                                <div className={styles.frame}>
                                    <img
                                        src={frames[index]}
                                        alt="Platform Frame"

                                    />
                                </div>
                            )}
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
            </div>
        </div>
    )
}
