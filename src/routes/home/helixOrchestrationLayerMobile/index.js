'use client'
import React, { useRef, useState, useEffect } from 'react'
import styles from './helixOrchestrationLayerMobile.module.scss';
import classNames from 'classnames';
import ImageIcon from '@/icons/imageIcon';
import PlayBlackIcon from '@/icons/playBlackIcon';
import { motion, useInView } from 'framer-motion';

const LeftImage = '/assets/images/left-image.png'
const RightImage = '/assets/images/right-img.png'

export default function HelixOrchestrationLayerMobile() {
    const rightSectionRef = useRef(null);
    const isInView = useInView(rightSectionRef, { amount: 0.3 });
    const [isToggled, setIsToggled] = useState(false);

    useEffect(() => {
        if (isInView) {
            setIsToggled(true);
        } else {
            setIsToggled(false);
        }
    }, [isInView]);

    const cardItems = [
        { title: 'Concept Agent', desc: 'Analyzes product DNA, target audience, and market context to understand the product deeply. Based on this insight, it defines the core concept, messaging angle, and strategic positioning.' },
        { title: 'Script Agent', desc: 'Creates context-aware, platform-optimized scripts aligned with campaign goals and brand tone. Ensures the narrative is clear, engaging, and purpose-driven.' },
        { title: 'Visual Director Agent', desc: 'Defines visual style, creative direction, and motion flow. Ensures consistency in pacing, transitions, and overall visual experience.' },
        { title: 'QA Agent', desc: 'Performs quality and compliance checks across brand, visuals, audio, and timing. Identifies issues early to ensure a polished final output.' },
        { title: 'Generation Agent', desc: 'Transforms scripts and creative directions into final media assets. Focuses on consistency, efficiency, and performance-ready execution.' },
        { title: 'Performance Agent', desc: 'Analyzes engagement and performance data to identify what works best. Uses insights to continuously optimize future content and conversions.' }
    ];

    return (
        <div className={styles.helixOrchestrationLayerMobile}>
            <div className='container-lg'>
                <div className={styles.stickyWrapper}>
                    <div className={styles.title}>
                        <h2>
                            Helix Orchestration Layer
                        </h2>
                        <p>
                            Watch as helix’s AI agents bring your product videos & images alive
                        </p>
                    </div>
                    <div className={styles.contentAlignment}>
                        <h4 className={classNames(!isToggled && styles.darktext)}>
                            From Prompt
                        </h4>
                        <label className={styles.switch}>
                            <input
                                type="checkbox"
                                checked={isToggled}
                                readOnly
                            />
                            <span className={classNames(styles.slider, styles.round)} />
                        </label>
                        <h4 className={classNames(isToggled && styles.darktext)}>
                            To Output
                        </h4>
                    </div>
                </div>

                <motion.div
                    className={styles.mainrelative}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.image}>
                        <img src={LeftImage} alt="LeftImage" />
                    </div>
                    <div className={styles.promptBox}>
                        <div className={styles.header}>
                            <ImageIcon />
                            <span>Prompt</span>
                        </div>
                        <div className={styles.body}>
                            <p>
                                Create a high-end SaaS landing page section showcasing AI-generated UGC video ads that are already converting millions in revenue.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <div className={styles.threeCol}>
                    {cardItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className={styles.items}
                            initial={{ opacity: 0, y: 50, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.7,
                                delay: (index % 3) * 0.15,
                                ease: [0.215, 0.61, 0.355, 1]
                            }}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    ref={rightSectionRef}
                    className={styles.rightAlignment}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className={styles.image}>
                        <img src={RightImage} alt="RightImage" />
                    </div>
                    <div className={styles.promptBoxRight}>
                        <div className={styles.header}>
                            <PlayBlackIcon />
                            <span>Prompt</span>
                        </div>
                        <div className={styles.body}>
                            <p>
                                Create a high-end SaaS landing page section showcasing AI-generated UGC video ads that are already converting millions in revenue.The section should have a dark, modern background with a subtle gradient and soft
                                shadows. At the top center, place a bold headline that reads
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
