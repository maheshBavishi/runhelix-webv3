'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './multiPlatformDigital.module.scss';
const Video4 = '/assets/video/video4.mp4';

const videoList = [
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/188e86eb-cd75-4877-b832-2d7b3a886b9e.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/fba3f9fc-5a2b-4985-9269-42b0f0980589.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/e9b5668f-d707-49c8-88b4-edded5c18a86.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/5366b959-1cc7-40f3-86a2-f4006019492e.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/trim_videos/trimmed/cd9c13b1-9623-4419-bdde-6e1a9e6c17fd.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/49eb288f-f239-45a6-be92-11a96a39fd2e.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/b3f0f9c8-11a1-4382-aa38-3fcf0ad1e0ab.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/a4803275-c9e9-42ad-bcab-7793bc27e612.mp4",
];
export default function MultiPlatformDigital() {
    const videoRefs = useRef([]);
    return (
        <div className={styles.multiPlatformDigital}>
            <div className='container-lg'>
                <h2>Multi-Platform Digital Ad Creatives That Convert</h2>
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
            </div>
        </div>
    )
}
