"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import styles from "./multiPlatform.module.scss";
const Video = "/assets/video/video.mp4";
const videoList = [
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/277584b7-308e-455b-a220-e3012565cbce.mp4",
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/79c4a9ba-27a1-4e76-a824-d07254cc415a.mp4',
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/58d4c143-aa8b-4f84-b09e-bfc332dcf6cf.mp4#t=0,11.67',
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/221cf90b-e9ef-4655-bb45-9b51c371d032.mp4",

    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/f13f9369-2ab8-43c9-b2c5-1ab9afd72fdf.mp4",
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/27365f8d-cc5e-4e1d-aae0-e76e8762d1df.mp4",
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/0dd4be4f-84b3-4f4a-9baf-d02c92c4d8c7.mp4',
];

export default function MultiPlatform() {
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
        <div className={styles.multiPlatform}>
            <div className="container-lg">
                <h2>Multi-Platform <span>UGC Product Testimonials</span> & Reviews</h2>
                <div className={styles.grid}>
                    {videoList.map((src, index) => (
                        <div className={styles.items}>
                            <video
                                src={src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                preload="none"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    opacity: 1,
                                    transition: "opacity 0.5s ease",
                                    display: "block",
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
