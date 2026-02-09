'use client'

import React from 'react'
import { motion } from 'framer-motion'
import styles from './marketingSection.module.scss'

const MarketingImage = '/assets/images/3d-img.png'

export default function MarketingSection() {
    return (
        <div className={styles.marketingSection}>
            <div className='container-xs'>

                {/* Text Animation */}
                <motion.div
                    className={styles.text}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <h2>Run Helix</h2>
                    <h3>
                        For Any <span>Marketing Task</span>
                    </h3>
                    <p>
                        Instantly Create Unlimited Videos and Photos Featuring Your Product
                    </p>
                </motion.div>

                {/* Image Animation */}
                <motion.div
                    className={styles.centerImage}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <motion.img
                        src={MarketingImage}
                        alt='MarketingImage'
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                    />
                </motion.div>

                {/* Button Animation */}
                <motion.div
                    className={styles.buttonCenter}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <a href='https://platform.runhelix.ai/auth' target='_blank'>
                        <button>Get Started</button>
                    </a>
                </motion.div>

            </div>
        </div>
    )
}
