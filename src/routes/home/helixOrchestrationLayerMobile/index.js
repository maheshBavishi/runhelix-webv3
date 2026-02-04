import React from 'react'
import styles from './helixOrchestrationLayerMobile.module.scss';
import classNames from 'classnames';
import ImageIcon from '@/icons/imageIcon';
import PlayBlackIcon from '@/icons/playBlackIcon';
const LeftImage = '/assets/images/left-image.png'
const RightImage = '/assets/images/right-img.png'
export default function HelixOrchestrationLayerMobile() {
    return (
        <div className={styles.helixOrchestrationLayerMobile}>
            <div className='container-lg'>
                <div className={styles.title}>
                    <h2>
                        Helix Orchestration Layer
                    </h2>
                    <p>
                        Watch as helix’s AI agents bring your product videos & images alive
                    </p>
                </div>
                <div className={styles.contentAlignment}>
                    <h4 className={styles.darktext}>
                        From Prompt
                    </h4>
                    <label className={styles.switch}>
                        <input type="checkbox" />
                        <span className={classNames(styles.slider, styles.round)} />
                    </label>
                    <h4 className={styles.darktext}>
                        To Output
                    </h4>
                </div>
                <div className={styles.mainrelative}>
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
                </div>
                <div className={styles.threeCol}>
                    <div className={styles.items}>
                        <h3>
                            Script Agent
                        </h3>
                        <p>
                            Creates context-aware, platform-optimized scripts aligned with campaign goals and brand tone. Ensures the narrative is clear, engaging, and purpose-driven.
                        </p>
                    </div>
                    <div className={styles.items}>
                        <h3>
                            Visual Director Agent
                        </h3>
                        <p>
                            Defines visual style, creative direction, and motion flow. Ensures consistency in pacing, transitions, and overall visual experience.
                        </p>
                    </div>
                    <div className={styles.items}>
                        <h3>
                            QA Agent
                        </h3>
                        <p>
                            Performs quality and compliance checks across brand, visuals, audio, and timing. Identifies issues early to ensure a
                            polished final output.
                        </p>
                    </div>
                    <div className={styles.items}>
                        <h3>
                            Generation Agent
                        </h3>
                        <p>
                            Transforms scripts and creative directions into final media assets. Focuses on consistency, efficiency, and
                            performance-ready execution.
                        </p>
                    </div>
                    <div className={styles.items}>
                        <h3>
                            Concept Agent
                        </h3>
                        <p>
                            Analyzes product DNA, target audience, and market context to understand the product deeply. Based on this insight,
                            it defines the core concept, messaging angle, and strategic positioning.
                        </p>
                    </div>
                    <div className={styles.items}>
                        <h3>
                            Performance Agent
                        </h3>
                        <p>
                            Analyzes engagement and performance data to identify what works best. Uses insights to continuously optimize future
                            content and conversions.
                        </p>
                    </div>
                </div>
                <div className={styles.rightAlignment}>
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
                </div>
            </div>
        </div>
    )
}
