'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './productPhotoshoots.module.scss';
const Video3 = '/assets/video/video3.mp4';
const videoList = [
   'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/b8ba17de-5ccd-4d22-9ca9-d296120ddac1.mp4',
   'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/277584b7-308e-455b-a220-e3012565cbce.mp4',
   'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/5a3d2ca1-87f1-4fc7-88d8-5af0cb3c79a1.mp4',
   'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/23a509b7-0840-49c7-8699-1cc330340267.mp4',
   'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/8304c143-4baa-4bd8-b605-210089b58db5.mp4',
   'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/ceb29008-f18f-47a0-8d90-dbdef57dca4a.mp4',
   'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/be2c6e16-c55b-43cf-b167-3456e8defcb6.mp4',
   'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/f13f9369-2ab8-43c9-b2c5-1ab9afd72fdf.mp4',
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
