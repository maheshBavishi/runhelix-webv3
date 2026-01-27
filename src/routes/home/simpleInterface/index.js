'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './simpleInterface.module.scss';

const RightFrame = '/assets/images/right-frame.png';
const LeftFrame = '/assets/images/left-frame.png';

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2,
        },
    },
};

const fadeUp3D = {
    hidden: {
        opacity: 0,
        y: 40,
        rotateX: 10,
        transformPerspective: 1000,
    },
    show: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
            duration: 0.8,
            ease: 'easeOut',
        },
    },
};

const floatImage = {
    hidden: {
        opacity: 0,
        y: 60,
        rotateY: 12,
        scale: 0.95,
    },
    show: {
        opacity: 1,
        y: 0,
        rotateY: 0,
        scale: 1,
        transition: {
            duration: 1.1,
            ease: 'easeOut',
        },
    },
};

export default function SimpleInterface() {
    return (
        <motion.div
            className={styles.simpleInterface}
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
        >
            <motion.div className={styles.text} variants={fadeUp3D}>
                <h2>
                    Simple Interface,
                    Perfect Product Content
                </h2>
                <div className={styles.buttonCenter}>
                    <button>
                        Start with any product image
                    </button>
                </div>
            </motion.div>

            <motion.div className={styles.bottomText} variants={fadeUp3D}>
                <h3>Run Helix as you like:</h3>
                <div className={styles.cardGrid}>
                    <motion.div className={styles.items} variants={fadeUp3D}>
                        <button>Done For You</button>
                        <p>
                            You prompt, then let Helix’s
                            Orchestration Layer pick the
                            model and generate your perfect
                            content.
                        </p>
                    </motion.div>

                    <motion.div className={styles.items} variants={fadeUp3D}>
                        <button>Done For You</button>
                        <p>
                            You pick the model, then prompt
                            while Helix’s Orchestration Layer
                            delivers perfection.
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            <motion.div className={styles.image} variants={floatImage}>
                <img src={RightFrame} alt="RightFrame" />
            </motion.div>

            <motion.div className={styles.leftimage} variants={floatImage}>
                <img src={LeftFrame} alt="LeftFrame" />
            </motion.div>
        </motion.div>
    );
}
