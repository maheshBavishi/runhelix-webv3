'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './inductriesServiced.module.scss'
import BeautyIcon from '@/icons/beautyIcon'


// Images for each category
const imagesMap = {
    'Beauty & Skincare': '/assets/images/Skincare.jpg',
    'Fashion Apparel & Accessories': '/assets/images/Fashion.jpg',
    'Health & Wellness Tech': '/assets/images/health.jpg',
    'Food, Beverage & Supplements': '/assets/images/food.jpg',
    'Home Decor & Lifestyle Goods': '/assets/images/home-decor.jpg',
    'Smart Home Devices': '/assets/images/smart-home.png',
    'Productivity & Workspace Tech': '/assets/images/Productivity.jpg',
    'Pets & Companion Products': '/assets/images/Pets.png',
    'Travel & Luggage': '/assets/images/Travel.png',
    'Kids, Baby & Family Products': '/assets/images/kids.jpg',
}

// Icons for each category
const iconsMap = {
    'Beauty & Skincare': <BeautyIcon />,
    'Fashion Apparel & Accessories': <BeautyIcon />,
    'Health & Wellness Tech': <BeautyIcon />,
    'Food, Beverage & Supplements': <BeautyIcon />,
    'Home Decor & Lifestyle Goods': <BeautyIcon />,
    'Smart Home Devices': <BeautyIcon />,
    'Productivity & Workspace Tech': <BeautyIcon />,
    'Pets & Companion Products': <BeautyIcon />,
    'Travel & Luggage': <BeautyIcon />,
    'Kids, Baby & Family Products': <BeautyIcon />,
}

const leftItems = [
    'Beauty & Skincare',
    'Fashion Apparel & Accessories',
    'Health & Wellness Tech',
    'Food, Beverage & Supplements',
    'Home Decor & Lifestyle Goods',
]

const rightItems = [
    'Smart Home Devices',
    'Productivity & Workspace Tech',
    'Pets & Companion Products',
    'Travel & Luggage',
    'Kids, Baby & Family Products',
]

export default function InductriesServiced() {
    const [selected, setSelected] = useState('Beauty & Skincare')

    return (
        <div className={styles.inductriesServiced}>
            <div className='container-xs'>
                <div className={styles.title}>
                    <h2>Inductries Serviced</h2>
                    <p>Instantly create stunning AI-generated product videos & images for your</p>
                </div>

                <div className={styles.allDataAlignment}>
                    {/* Center Image */}
                    <div className={styles.box}>
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={selected}
                                src={imagesMap[selected]}
                                alt={selected}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.2 }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Left Items */}
                    <div className={styles.left}>
                        {leftItems.map((item) => (
                            <div
                                key={item}
                                className={styles.iconTextAlignment}
                                onMouseEnter={() => setSelected(item)}
                            >
                                <div className={styles.icon}>{iconsMap[item]}</div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>

                    {/* Right Items */}
                    <div className={styles.right}>
                        {rightItems.map((item) => (
                            <div
                                key={item}
                                className={styles.iconTextAlignment}
                                onMouseEnter={() => setSelected(item)}
                            >
                                <div className={styles.icon}>{iconsMap[item]}</div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
