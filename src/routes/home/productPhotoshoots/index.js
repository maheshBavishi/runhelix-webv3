'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './productPhotoshoots.module.scss';
const Video3 = '/assets/video/video3.mp4';
const imageList = [
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/6dc6f8c5-43c5-4687-bce4-c1c743d2db43_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/78b405ff-1aaa-46fa-87f9-4a68bc708284_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/ec01aa4f-8582-48a9-9d0a-18e68074c662_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/17d84221-bfcf-4a15-98da-cc2014cd3dd8_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/3e524dc8-7803-483a-8e88-175b153e9cff_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/315954c5-177e-4e63-999d-c885be8f77e3_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/9a8cb2ee-41d3-4f27-9805-25199def7edf_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/9b79e6b9-f206-4bf1-8ec5-6696d35f8c7b_UGC_image.png",
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
                <h2>For Product Pages <span> Product Photoshoots </span> For Decks</h2>
                <div className={styles.grid}>
                    {imageList.map((src, index) => (
                        <motion.div

                            key={index}
                            className={styles.items}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >

                            <img
                                preload="none"
                                src={src}

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
