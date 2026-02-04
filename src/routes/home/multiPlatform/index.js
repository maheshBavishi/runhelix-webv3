"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import styles from "./multiPlatform.module.scss";
const Video = "/assets/video/video.mp4";
const videoList = [
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/3121bffa-fb1c-4e75-8a43-a61d4a3f4833.mp4",
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/90adfdb5-c25a-41c4-ab3c-f8f8057c8b43.mp4',
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/2b32188f-7dd9-4d8e-9104-2a1c14b17e21.mp4",
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/247f7276-f03f-4fb4-b7bc-5da9e97c0ed3.mp4',
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/221cf90b-e9ef-4655-bb45-9b51c371d032.mp4",
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/79c4a9ba-27a1-4e76-a824-d07254cc415a.mp4',
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/27365f8d-cc5e-4e1d-aae0-e76e8762d1df.mp4",
    'https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/e575a068-bf6c-489f-abe0-066181a89ccb.mp4',
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
                <h2>Multi-Platform UGC Product Testimonials & Reviews</h2>
                <div className={styles.grid}>
                    {videoList.map((src, index) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
}
