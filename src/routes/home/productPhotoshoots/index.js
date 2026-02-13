'use client'
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './productPhotoshoots.module.scss';
const Video3 = '/assets/video/video3.mp4';
const imageList = [
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/a8f7d451-6fd6-440f-bd76-cd750ea40c51_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/d98974da-0b49-4cd9-ae15-f882cc057f05_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/15f716a4-8973-4a41-aea8-205c871fa296_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/b4f153a0-4104-4ffe-96d0-5e12702ec6c9_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/ce556c38-4a46-44a3-a4c1-1e12a01811f3_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/f5b2704c-000d-4528-9875-08cb31e187ad_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/04c795c7-f9a1-454c-8b99-68e9f9fc0481_UGC_image.png",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/4a041720-4c98-41cb-8021-050a37887710_UGC_image.png"
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
