'use client'

import React from 'react'
import { motion } from 'framer-motion'

export default function RightLineAnimation() {
    return (
        <svg
            width="81"
            height="355"
            viewBox="0 0 81 355"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d="M5.93611 129.5L6.41502 129.356L5.93611 129.5ZM51.8009 352C51.8009 353.473 52.9948 354.667 54.4675 354.667C55.9403 354.667 57.1342 353.473 57.1342 352C57.1342 350.527 55.9403 349.333 54.4675 349.333C52.9948 349.333 51.8009 350.527 51.8009 352ZM70.6391 2.5L70.5039 2.01862C50.8154 7.54816 29.1339 21.3657 15.0816 42.8513C1.01842 64.3537 -5.38379 93.5071 5.4572 129.644L5.93611 129.5L6.41502 129.356C-4.344 93.4929 2.02194 64.6463 15.9185 43.3987C29.8261 22.1343 51.2961 8.45184 70.7743 2.98138L70.6391 2.5ZM5.93611 129.5L5.4572 129.644C12.2258 152.206 23.0355 171.968 34.328 190.263C45.6342 208.58 57.3901 225.376 66.1337 242.107C74.8679 258.819 80.5481 275.383 79.7132 293.164C78.8786 310.938 71.5301 329.996 54.078 351.687L54.4675 352L54.8571 352.313C72.405 330.504 79.8651 311.249 80.7121 293.211C81.5588 275.179 75.7935 258.431 67.02 241.643C58.2557 224.874 46.4412 207.983 35.179 189.737C23.9031 171.47 13.1464 151.794 6.41502 129.356L5.93611 129.5Z"
                fill="none"
                stroke="url(#paint0_linear_4301_876)"
                strokeWidth="1.5"
                strokeDasharray="6 10"
                initial={{ strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -100 }}
                transition={{
                    duration: 4,
                    ease: 'linear',
                    repeat: Infinity,
                }}
            />

            {/* Arrow */}
            <path
                d="M63.1406 13L57.1406 0L72.6406 1L63.1406 13Z"
                fill="#8FCED0"
            />

            <defs>
                <linearGradient
                    id="paint0_linear_4301_876"
                    x1="21.3892"
                    y1="2.5"
                    x2="21.3892"
                    y2="357"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#8DCDCF" />
                    <stop offset="1" stopColor="#DEDEDE" />
                </linearGradient>
            </defs>
        </svg>
    )
}
