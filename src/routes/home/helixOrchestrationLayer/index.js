'use client'
import React, { useRef } from 'react'
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
} from 'framer-motion'

import styles from './helixOrchestrationLayer.module.scss'

import ImageIcon from '@/icons/imageIcon'
import LeftLineAnimation from '@/components/leftLineAnimation'
import PlayBlackIcon from '@/icons/playBlackIcon'
import RightLineAnimation from '@/components/rightLineAnimation'
import classNames from 'classnames'
import AgentLine from '../agentline'

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

    /* ---------------- SCROLL SETUP ---------------- */
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    /* ---------------- SECTION FADE ---------------- */
    const sectionOpacity = useTransform(scrollYProgress, [0, 0.09], [0, 1])

    /* ---------------- LEFT (PROMPT) ---------------- */
    const leftX = useSpring(
        useTransform(scrollYProgress, [0.15, 0.35], [-180, 0]),
        { stiffness: 90, damping: 22 }
    )
    const leftRotate = useSpring(
        useTransform(scrollYProgress, [0.15, 0.35], [-25, 0]),
        { stiffness: 90, damping: 22 }
    )
    const leftOpacity = useTransform(scrollYProgress, [0.15, 0.25], [0, 1])

    /* ---------------- RIGHT (OUTPUT) ---------------- */
    const rightX = useSpring(
        useTransform(scrollYProgress, [0.75, 0.95], [180, 0]),
        { stiffness: 90, damping: 22 }
    )
    const rightRotate = useSpring(
        useTransform(scrollYProgress, [0.75, 0.95], [25, 0]),
        { stiffness: 90, damping: 22 }
    )
    const rightOpacity = useTransform(scrollYProgress, [0.75, 0.85], [0, 1])

    /* ---------------- CENTER BASE ---------------- */
    const centerScale = useSpring(
        useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]),
        { stiffness: 110, damping: 26 }
    )
    const centerRotateX = useSpring(
        useTransform(scrollYProgress, [0.3, 0.6], [22, 0]),
        { stiffness: 110, damping: 26 }
    )

    /* ---------------- AGENT STEP REVEALS ---------------- */
    const agent1 = useTransform(scrollYProgress, [0.35, 0.4], [0, 1])
    const agent2 = useTransform(scrollYProgress, [0.4, 0.45], [0, 1])
    const agent3 = useTransform(scrollYProgress, [0.45, 0.5], [0, 1])
    const agent4 = useTransform(scrollYProgress, [0.5, 0.55], [0, 1])
    const agent5 = useTransform(scrollYProgress, [0.55, 0.6], [0, 1])
    const agent6 = useTransform(scrollYProgress, [0.6, 0.65], [0, 1])

    /* ---------------- LINE FLOW ---------------- */
    const lineProgress = useTransform(scrollYProgress, [0.6, 0.8], [0, 1])

    return (
        <div ref={containerRef} className={styles.helixOrchestrationLayer}>
            {/* STICKY WRAP */}
            <motion.div
                className={styles.stickyWrap}
                style={{ opacity: sectionOpacity }}
            >
                <div className="container-lg" style={{ width: '100%' }}>

                    {/* TITLE */}
                    <motion.div className={styles.title}>
                        <h2>Helix Orchestration Layer</h2>
                        <p>
                            Watch as helix’s AI agents bring your product videos & images alive
                        </p>
                    </motion.div>

                    <div className={styles.contentAlignment}>
                        <h4>From Prompt</h4>
                        <label className={styles.switch}>
                            <input type="checkbox" />
                            <span className={classNames(styles.slider, styles.round)}></span>
                        </label>
                        <h4 className={styles.rightAlignmentText}>To Output</h4>
                    </div>

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
                                <img src={LeftImage} alt="LeftImage" />
                            </div>

                            <div className={styles.promptBox}>
                                <div className={styles.header}>
                                    <ImageIcon />
                                    <span>Prompt</span>
                                </div>
                                <div className={styles.body}>
                                    <p>
                                        Create a high-end SaaS landing page section showcasing AI-generated UGC video ads that are already converting millions in revenue.The section should have a dark, modern background with a subtle gradient and soft
                                        shadows. At the top center, place a bold headline that reads
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
                                <AgentLine progress={lineProgress} />
                            </div>
                            <div className={styles.centerBoxDesign}>
                                <div className={styles.single}>
                                    <Agent style={agent1} title="Script Agent" desc='Creates context-aware, platform-optimized scripts aligned with campaign goals and brand tone. Ensures the narrative is clear, engaging, and purpose-driven.' />
                                    <Agent style={agent2} title="QA Agent" desc='Performs quality and compliance checks across brand, visuals, audio, and timing. Identifies issues early to ensure a polished final output.' />
                                </div>

                                <div className={styles.single}>
                                    <Agent style={agent3} title="Visual Director Agent" desc='Defines visual style, creative direction, and motion flow. Ensures consistency in pacing, transitions, and overall visual experience.' />
                                    <Agent style={agent4} title="Generation Agent" desc='Transforms scripts and creative directions into final media assets. Focuses on consistency, efficiency, and performance-ready execution.' />
                                </div>
                            </div>

                            <div className={styles.bottomContentAlignment}>
                                <Agent style={agent5} title="Concept Agent" desc='Analyzes product DNA, target audience, and market context to understand the product deeply. Based on this insight, it defines the core concept, messaging angle, and strategic positioning.' />
                                <Agent style={agent6} title="Performance Agent" desc='Analyzes engagement and performance data to identify what works best. Uses insights to continuously optimize future content and conversions.' />
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

                    {/* ICONS */}
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

/* ---------------- AGENT COMPONENT ---------------- */
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
                <p>
                    {desc}
                </p>
            </div>
        </motion.div>
    )
}
