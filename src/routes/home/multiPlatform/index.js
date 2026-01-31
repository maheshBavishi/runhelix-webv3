"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import styles from "./multiPlatform.module.scss";
import LazyVideo from "../../../components/LazyVideo";
const Video = "/assets/video/video.mp4";
const videoList = [
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/8495c879-2a08-4248-87e1-6a11f3060567.mp4",
    Video,
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/e6056221-6367-45c4-bb4a-94b14228ceea.mp4",
    Video,
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/582cf7fc-0da4-42e2-8e75-113d42de9506.mp4",
    Video,
    "https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/acdb5051-9f58-4b2a-a7c4-4e39f6028965.mp4",
    Video,
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
