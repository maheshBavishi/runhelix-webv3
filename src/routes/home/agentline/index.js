'use client'
import { motion, useTransform } from 'framer-motion'

export default function AnimatedLine({ progress }) {
    const pathLength = useTransform(progress, [0, 1], [0, 1])

    return (
        <svg
            width="492"
            height="442"
            viewBox="0 0 492 442"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <motion.path
                d="M14.2912 1.3866C12.7912 31.8866 54.4082 93.128 218.808 85.528C221.308 64.1946 240.308 17.328 296.308 0.527954C354.975 23.028 461.508 80.628 418.308 131.028C363.642 143.361 246.491 180.087 225.291 242.887C142.291 230.553 -26.909 235.687 4.29104 326.887C43.2911 440.887 149.808 445.028 213.808 439.028C279.803 436.148 427.691 407.787 491.291 317.387"
                stroke="#DCDCDC"
                strokeWidth="1.5"
                fill="none"
                style={{ pathLength }}
            />
        </svg>
    )
}
