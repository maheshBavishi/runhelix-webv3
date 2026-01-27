'use client'
import React, { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from 'framer-motion'

const LeftImage = '/assets/images/left-image.png'
const RightImage = '/assets/images/right-img.png'

import styles from './helixOrchestrationLayer.module.scss'
import ImageIcon from '@/icons/imageIcon'
import LeftLineAnimation from '@/components/leftLineAnimation'
import PlayBlackIcon from '@/icons/playBlackIcon'
import RightLineAnimation from '@/components/rightLineAnimation'
const SoraIcon = '/assets/icons/sora.svg';
const LlevenlabsIcon = '/assets/icons/llevenlabs.svg';
const VeoIcon = '/assets/icons/veo.svg';
const KlingIcon = '/assets/icons/kling.svg';
const WanIcon = '/assets/icons/wan.svg';
const RunwayIcon = '/assets/icons/runway.svg';

/* ------------------ animation variants ------------------ */

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};  
export default function HelixOrchestrationLayer() {
    const containerRef = useRef(null)

    // Section-based scroll (IMPORTANT)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    })

    /* ---------------- TITLE ---------------- */
    const titleY = useTransform(scrollYProgress, [0, 0.2], [80, 0])
    const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])

    /* ---------------- LEFT COLUMN ---------------- */
    const leftRotateRaw = useTransform(scrollYProgress, [0, 0.4], [-25, 0])
    const leftXRaw = useTransform(scrollYProgress, [0, 0.4], [-140, 0])
    const leftOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

    const leftRotate = useSpring(leftRotateRaw, {
        stiffness: 90,
        damping: 22,
    })

    const leftX = useSpring(leftXRaw, {
        stiffness: 90,
        damping: 22,
    })

    /* ---------------- RIGHT COLUMN ---------------- */
    const rightRotateRaw = useTransform(scrollYProgress, [0, 0.4], [25, 0])
    const rightXRaw = useTransform(scrollYProgress, [0, 0.4], [140, 0])
    const rightOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1])

    const rightRotate = useSpring(rightRotateRaw, {
        stiffness: 90,
        damping: 22,
    })

    const rightX = useSpring(rightXRaw, {
        stiffness: 90,
        damping: 22,
    })

    /* ---------------- CENTER COLUMN ---------------- */
    const centerScaleRaw = useTransform(scrollYProgress, [0.15, 0.5], [0.85, 1])
    const centerRotateXRaw = useTransform(scrollYProgress, [0.15, 0.5], [28, 0])
    const centerZRaw = useTransform(scrollYProgress, [0.15, 0.5], [-220, 0])

    const centerScale = useSpring(centerScaleRaw, {
        stiffness: 110,
        damping: 26,
    })

    const centerRotateX = useSpring(centerRotateXRaw, {
        stiffness: 110,
        damping: 26,
    })

    const centerZ = useSpring(centerZRaw, {
        stiffness: 110,
        damping: 26,
    })

    return (
        <div ref={containerRef} className={styles.helixOrchestrationLayer}>
            <div className="container-lg">

                {/* TITLE */}
                <motion.div
                    className={styles.title}
                    style={{
                        y: titleY,
                        opacity: titleOpacity,
                    }}
                >
                    <h2>Helix Orchestration Layer</h2>
                    <p>
                        Watch as helix’s AI agents bring your product videos & images alive
                    </p>
                </motion.div>

                <div className={styles.contentAlignment}>
                    <h4>From Prompt</h4>
                    <h4 className={styles.rightAlignmentText}>To Output</h4>
                </div>

                <div className={styles.grid}>

                    {/* LEFT COLUMN */}
                    <motion.div
                        className={styles.items}
                        style={{
                            rotateY: leftRotate,
                            x: leftX,
                            opacity: leftOpacity,
                            transformPerspective: 1400,
                        }}
                    >
                        <div className={styles.leftImage}>
                            <img src={LeftImage} alt="LeftImage" />
                        </div>

                        <div className={styles.promptBox}>
                            <div className={styles.header}>
                                <ImageIcon />
                                <span>Prompt</span>
                            </div>
                            <div className={styles.body}>
                                <p>
                                    Create a high-end SaaS landing page section showcasing AI-generated UGC video ads that are already converting millions in revenue.The section should have a dark, modern background with a subtle gradient and soft shadows. At the top center, place a bold headline that reads
                                </p>
                            </div>
                        </div>

                        <div className={styles.leftLineAnimation}>
                            <LeftLineAnimation />
                        </div>
                    </motion.div>

                    {/* CENTER COLUMN */}
                    <motion.div
                        className={styles.items}
                        style={{
                            scale: centerScale,
                            rotateX: centerRotateX,
                            z: centerZ,
                            transformPerspective: 1600,
                        }}
                    >
                        <div className={styles.centerBoxDesign}>
                            <div className={styles.single}>
                                <div className={styles.textWhiteBox}>
                                    <h4>Script Agent</h4>
                                    <div className={styles.whiteBox}>
                                        <p>
                                            Creates context-aware, platform-optimized scripts aligned with campaign goals and brand
                                            tone. Ensures the narrative is clear, engaging, and purpose-driven.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.textWhiteBox}>
                                    <h4>QA Agent</h4>
                                    <div className={styles.whiteBox}>
                                        <p>
                                            Performs quality and compliance checks across brand, visuals, audio, and
                                            timing. Identifies issues early to ensure a polished final output.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.single}>
                                <div className={styles.textWhiteBox}>
                                    <h4>Visual Director Agent</h4>
                                    <div className={styles.whiteBox}>
                                        <p>
                                            Defines visual style, creative direction, and motion flow.
                                            Ensures consistency in pacing, transitions, and overall visual experience.
                                        </p>
                                    </div>
                                </div>

                                <div className={styles.textWhiteBox}>
                                    <h4>Generation Agent</h4>
                                    <div className={styles.whiteBox}>
                                        <p>
                                            Transforms scripts and creative directions into final media
                                            assets. Focuses on consistency, efficiency, and performance-ready execution.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.bottomContentAlignment}>
                            <div className={styles.textWhiteBox}>
                                <h4>Concept Agent</h4>
                                <div className={styles.whiteBox}>
                                    <p>
                                        Analyzes product DNA, target audience, and market context to understand the product deeply. Based on this
                                        insight, it defines the core concept, messaging angle, and strategic positioning.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.textWhiteBox}>
                                <h4>Performance Agent</h4>
                                <div className={styles.whiteBox}>
                                    <p>
                                        Analyzes engagement and performance data to identify what works best.
                                        Uses insights to continuously optimize future content and conversions.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT COLUMN */}
                    <motion.div
                        className={styles.items}
                        style={{
                            rotateY: rightRotate,
                            x: rightX,
                            opacity: rightOpacity,
                            transformPerspective: 1400,
                        }}
                    >
                        <div className={styles.rightlineAnimation}>
                            <RightLineAnimation />
                        </div>

                        <div className={styles.rightImage}>
                            <img src={RightImage} alt="RightImage" />
                        </div>

                        <div className={styles.promptBoxRight}>
                            <div className={styles.header}>
                                <PlayBlackIcon />
                                <span>Prompt</span>
                            </div>
                            <div className={styles.body}>
                                <p>
                                    Create a high-end SaaS landing page section showcasing AI-generated UGC video ads that are already converting millions in revenue.The section should have a dark, modern background with a subtle gradient and soft shadows. At the top center, place a bold headline that reads
                                </p>
                            </div>
                        </div>
                    </motion.div>

                </div>
                <motion.div
                    className={styles.imageAlignment}
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {[SoraIcon, LlevenlabsIcon, LlevenlabsIcon, VeoIcon, KlingIcon, WanIcon, RunwayIcon].map(
                        (icon, i) => (
                            <motion.img
                                key={i}
                                src={icon}
                                alt="model-icon"
                                variants={fadeUp}
                                transition={{ duration: 0.4 }}
                            />
                        )
                    )}
                </motion.div>
            </div>
        </div>
    )
}
