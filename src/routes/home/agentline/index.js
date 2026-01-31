'use client'
import { motion, useTransform } from 'framer-motion'

export default function CurvedAgentLine({ progress }) {
    // Smooth draw effect
    const dashOffset = useTransform(progress, [0, 1], [1, 0])
    const opacity = useTransform(progress, [0, 0.1], [0, 1])

    return (
        <svg
            width="429"
            height="442"
            viewBox="0 0 429 442"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d="M14.2912 1.38657
                   C12.7912 31.8866 54.4082 93.1279 218.808 85.5279
                   C221.308 64.1946 240.308 17.3279 296.308 0.527924
                   C354.975 23.0279 461.508 80.6279 418.308 131.028
                   C363.642 143.361 246.491 180.087 225.291 242.887
                   C142.291 230.553 -26.909 235.687 4.29104 326.887
                   C43.2911 440.887 149.808 445.028 213.808 439.028"
                stroke="#DEDEDE"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                strokeDasharray="1"
                style={{
                    strokeDashoffset: dashOffset,
                    opacity,
                }}
            />
        </svg>
    )
}
