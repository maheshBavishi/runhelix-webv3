'use client'
import React from 'react'
import { motion } from 'framer-motion'

export default function LeftLineAnimation() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="178"
            viewBox="0 0 96 178"
            fill="none"
        >
            {/* Animated Line */}
            <motion.path
                d="M93.4662 3.27051C93.4662 3.90161 92.9546 4.41322 92.3235 4.41322C91.6924 4.41322 91.1808 3.90161 91.1808 3.27051C91.1808 2.63941 91.6924 2.1278 92.3235 2.1278C92.9546 2.1278 93.4662 2.63941 93.4662 3.27051ZM1.87046 173.06L3.692 171.386L4.23109 173.801L1.87046 173.06ZM92.3235 3.27051L92.4631 3.43306C77.1058 16.6196 48.2606 54.69 55.73 101.443L55.5185 101.476L55.3069 101.51C47.8048 54.553 76.7663 16.3463 92.1839 3.10795L92.3235 3.27051ZM55.5185 101.476L55.73 101.443C59.3754 124.26 51.7619 140.835 40.5466 152.342C29.3391 163.842 14.5414 170.276 3.8041 172.848L3.7542 172.64L3.7043 172.431C14.3843 169.873 29.1024 163.471 40.2397 152.043C51.369 140.624 58.9291 124.182 55.3069 101.51L55.5185 101.476Z"
                fill="none"
                stroke="url(#paint0_linear_4297_3565)"
                strokeWidth="1.5"
                strokeDasharray="800"
                strokeDashoffset="800"
                animate={{
                    strokeDashoffset: [800, 0],
                }}
                transition={{
                    duration: 3,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            />

            {/* Arrow */}
            <path
                d="M1.50043 173.346L10.9172 175.132L7.24187 166.112L1.50043 173.346Z"
                fill="#8DCDCF"
            />

            {/* Top Circle */}
            <ellipse
                cx="3.16335"
                cy="3"
                rx="3.16335"
                ry="3"
                transform="matrix(-1 0 0 1 95.175 0.271484)"
                fill="#DEDEDE"
                stroke="#6D6D6D"
                strokeWidth="0.543248"
            />

            <defs>
                <linearGradient
                    id="paint0_linear_4297_3565"
                    x1="47.097"
                    y1="3.27051"
                    x2="47.097"
                    y2="173.06"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#DEDEDE" />
                    <stop offset="1" stopColor="#8DCDCF" />
                </linearGradient>
            </defs>
        </svg>
    )
}
