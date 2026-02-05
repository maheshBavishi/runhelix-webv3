'use client'
import React, { useRef, useState } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValueEvent,
} from 'framer-motion'

import styles from './helixOrchestrationLayer.module.scss'
import ImageIcon from '@/icons/imageIcon'
import LeftLineAnimation from '@/components/leftLineAnimation'
import PlayBlackIcon from '@/icons/playBlackIcon'
import RightLineAnimation from '@/components/rightLineAnimation'
import classNames from 'classnames'
import AgentLine from '../agentline'
import AnimatedLine from '../agentline'

const LeftImage = '/assets/images/left-image.png'
const RightImage = '/assets/images/right-img.png'

const SoraIcon = '/assets/icons/sora.svg'
const LlevenlabsIcon = '/assets/icons/llevenlabs.svg'
const VeoIcon = '/assets/icons/veo.svg'
const KlingIcon = '/assets/icons/kling.svg'
const WanIcon = '/assets/icons/wan.svg'
const RunwayIcon = '/assets/icons/runway.svg'

export default function HelixOrchestrationLayer() {
    const containerRef = useRef(null)
    const switchRef = useRef(null)
    const [isSwitchActive, setIsSwitchActive] = useState(false)

    /* ---------------- SCROLL ---------------- */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    /* ---------------- SYNCHRONIZED SCROLL PROGRESS ---------------- */
    const activeProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22 })

    /* ---------------- LEFT ---------------- */
    const leftX = useSpring(
        useTransform(scrollYProgress, [0.15, 0.35], [-180, 0]),
        { stiffness: 90, damping: 22 }
    )
    const leftRotate = useSpring(
        useTransform(scrollYProgress, [0.15, 0.35], [-25, 0]),
        { stiffness: 90, damping: 22 }
    )
    const leftOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])

    /* ---------------- RIGHT ---------------- */
    const rightX = useSpring(
        useTransform(scrollYProgress, [0.75, 0.95], [180, 0]),
        { stiffness: 90, damping: 22 }
    )
    const rightRotate = useSpring(
        useTransform(scrollYProgress, [0.75, 0.95], [25, 0]),
        { stiffness: 90, damping: 22 }
    )
    const rightOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1])

    /* ---------------- CENTER ---------------- */
    const centerScale = useSpring(
        useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]),
        { stiffness: 110, damping: 26 }
    )
    const centerRotateX = useSpring(
        useTransform(scrollYProgress, [0.3, 0.6], [22, 0]),
        { stiffness: 110, damping: 26 }
    )

    /* ---------------- AGENT REVEAL (SCROLL BASED) ---------------- */
    const agent1 = useTransform(activeProgress, [0.34, 0.38], [0, 1])
    const agent2 = useTransform(activeProgress, [0.38, 0.42], [0, 1])
    const agent3 = useTransform(activeProgress, [0.42, 0.46], [0, 1])
    const agent4 = useTransform(activeProgress, [0.46, 0.50], [0, 1])
    const agent5 = useTransform(activeProgress, [0.50, 0.54], [0, 1])
    const agent6 = useTransform(activeProgress, [0.54, 0.58], [0, 1])

    /* ---------------- SWITCH AUTO ON AFTER 4TH CARD ---------------- */

    useMotionValueEvent(activeProgress, 'change', (v) => {
        const isActive = v > 0.50
        setIsSwitchActive(isActive)
        if (switchRef.current) {
            switchRef.current.checked = isActive
        }
    })

    /* ---------------- LINE PROGRESS ---------------- */
    const lineProgress = useTransform(activeProgress, [0.34, 0.58], [0, 1])

    return (
        <div ref={containerRef} className={styles.helixOrchestrationLayer} id='workflow'>
            <motion.div
                className={styles.stickyWrap}
            >
                <div className="container-lg" style={{ width: '100%' }}>

                    {/* TITLE */}
                    <motion.div
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <h2>Helix Orchestration Layer</h2>
                        <p>
                            Watch as helix’s AI agents bring your product videos & images alive
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.contentAlignment}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4 className={classNames(!isSwitchActive && styles.darktext)}>From Prompt</h4>
                        <label className={styles.switch}>
                            <input ref={switchRef} type="checkbox" checked={isSwitchActive} readOnly />
                            <span className={classNames(styles.slider, styles.round)} />
                        </label>
                        <h4 className={classNames(styles.rightAlignmentText, isSwitchActive && styles.darktext)}>To Output</h4>
                    </motion.div>

                    <div className={styles.grid}>

                        {/* LEFT */}
                        <motion.div
                            className={styles.items}
                            style={{
                                x: leftX,
                                rotateY: leftRotate,
                                opacity: leftOpacity,
                                transformPerspective: 1400,
                            }}
                        >
                            <div className={styles.leftImage}>
                                <img src='https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/uploaded_image/dji-mavic-3-pro_b4eu.jpg' alt="LeftImage" />
                            </div>

                            <div className={styles.promptBox}>
                                <div className={styles.header}>
                                    <ImageIcon />
                                    <span>Prompt</span>
                                </div>
                                <div className={styles.body}>
                                    <p>
                                        Create a high-quality UGC-style video ad for a new compact camera drone. The video should feature a real person (not an actor) unboxing and demonstrating the drone in a natural, everyday setting.
                                    </p>
                                </div>
                            </div>

                            <div className={styles.leftLineAnimation}>
                                <LeftLineAnimation progress={lineProgress} />
                            </div>
                        </motion.div>

                        {/* CENTER */}
                        <motion.div
                            className={styles.items}
                            style={{
                                scale: centerScale,
                                rotateX: centerRotateX,
                                transformPerspective: 1600,
                            }}
                        >
                            <div className={styles.agentLine}>
                                <AnimatedLine progress={lineProgress} />
                            </div>

                            <div className={styles.centerBoxDesign}>
                                <div className={styles.single}>
                                    <Agent style={agent5} title="Concept Agent" desc="Analyzes product DNA, target audience, and market context to understand the product deeply. Based on this insight, it defines the core concept, messaging angle, and strategic positioning." />
                                    <Agent style={agent2} title="QA Agent" desc="Performs quality and compliance checks across brand, visuals, audio, and timing. Identifies issues early to ensure a polished final output." />
                                </div>
                                <div className={styles.single}>
                                    <Agent style={agent1} title="Script Agent" desc="Creates context-aware, platform-optimized scripts aligned with campaign goals and brand tone. Ensures the narrative is clear, engaging, and purpose-driven." />
                                    <Agent style={agent3} title="Visual Director Agent" desc="Defines visual style, creative direction, and motion flow. Ensures consistency in pacing, transitions, and overall visual experience." />
                                </div>
                            </div>

                            <div className={styles.bottomContentAlignment}>
                                <Agent style={agent4} title="Generation Agent" desc="Transforms scripts and creative directions into final media assets. Focuses on consistency, efficiency, and performance-ready execution." />
                                <Agent style={agent6} title="Performance Agent" desc="Analyzes engagement and performance data to identify what works best. Uses insights to continuously optimize future content and conversions." />
                            </div>
                        </motion.div>

                        {/* RIGHT */}
                        <motion.div
                            className={styles.items}
                            style={{
                                x: rightX,
                                rotateY: rightRotate,
                                opacity: rightOpacity,
                                transformPerspective: 1400,
                            }}
                        >
                            <div className={styles.rightlineAnimation}>
                                <RightLineAnimation progress={lineProgress} />
                            </div>

                            <div className={styles.rightImage}>
                                <video src="https://rnhlndmeazutnirvjzzt.supabase.co/storage/v1/object/public/my-videos/right-video.mp4" autoPlay loop muted playsInline></video>
                            </div>

                            <div className={styles.promptBoxRight}>
                                <div className={styles.header}>
                                    <PlayBlackIcon />
                                    <span>Prompt</span>
                                </div>
                                <div className={styles.body}>
                                    <p>
                                        A real person records a casual phone video showing a compact camera drone at home and outdoors. The person unfolds the drone, turns it on, and flies it briefly. Natural lighting, handheld camera, slightly imperfect movements. The person speaks naturally, saying the drone is easy to fly and the camera looks surprisingly good.
                                        Authentic UGC style, not an ad, realistic and human.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    <div className={styles.imageAlignment}>
                        {[SoraIcon, LlevenlabsIcon, VeoIcon, KlingIcon, WanIcon, RunwayIcon].map(
                            (icon, i) => (
                                <img key={i} src={icon} alt="icon" />
                            )
                        )}
                    </div>

                </div>
            </motion.div>
        </div>
    )
}

/* ---------------- AGENT ---------------- */
function Agent({ title, desc, style }) {
    return (
        <motion.div
            className={styles.textWhiteBox}
            style={{
                opacity: style,
                y: useTransform(style, [0, 1], [30, 0]),
            }}
        >
            <h4>{title}</h4>
            <div className={styles.whiteBox}>
                <p>{desc}</p>
            </div>
        </motion.div>
    )
}
