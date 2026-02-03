'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './herobanner.module.scss';

import AdsIcon from '@/icons/adsIcon';
import NoteIcon from '@/icons/noteIcon';
import CameraIcon from '@/icons/cameraIcon';
import PlayOutlineIcon from '@/icons/playOutlineIcon';
import PlayIcon from '@/icons/playIcon';

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

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export default function Herobanner() {
  return (
    <div className={styles.herobanner}>
      <div className={styles.topSpacingAlignmemnt}>
        <div className={styles.heroContainer}>

          {/* Title */}
          <motion.div
            className={styles.title}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span>AI Content Studio</span>
            <h1>
              Create Stunning Product Videos & Images That Small
            </h1>
          </motion.div>

          {/* Feature icons */}
          <motion.div
            className={styles.buttonAlignment}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[AdsIcon, NoteIcon, CameraIcon, PlayOutlineIcon].map(
              (Icon, index) => (
                <motion.div
                  key={index}
                  className={styles.iconText}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <div className={styles.icon}>
                    <Icon />
                  </div>
                  <span>
                    {index === 0 && 'Digital Ads'}
                    {index === 1 && 'UGC AFFILIATE TESTIMONIALS & PRODUCT REVIEWS'}
                    {index === 2 && 'Product Photo Shoots'}
                    {index === 3 && 'Shorts & Long - form Promotional Videos'}
                  </span>
                </motion.div>
              )
            )}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            className={styles.buttonCenter}
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6, duration: 0.4, ease: 'easeOut' }}
          >
            <a href='#create-first-video'>
              <button>
                <PlayIcon />
                Create Your First Video
              </button>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom section */}
      <motion.div
        className={styles.botttomSection}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
      >
        <div className={styles.bottomContainer}>
          <p>
            Powered by the latest versions of the world’s best models
          </p>

          <motion.div
            className={styles.imageAlignment}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[SoraIcon, LlevenlabsIcon, VeoIcon, KlingIcon, WanIcon, RunwayIcon].map(
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
      </motion.div>
    </div>
  );
}
