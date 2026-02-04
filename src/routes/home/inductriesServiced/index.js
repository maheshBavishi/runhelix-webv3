'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './inductriesServiced.module.scss'
import BeautyIcon from '@/icons/beautyIcon';
const Image1 = '/assets/images/Skincare.jpg';


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

    useEffect(() => {
        // Preload all images to avoid lag on hover
        Object.values(imagesMap).forEach((src) => {
            const img = new Image()
            img.src = src
        })
    }, [])

    return (
        <div className={styles.inductriesServiced} id='industries'>
            <div className='container-xs'>
                <div className={styles.title}>
                    <h2>Industries Serviced</h2>
                    <p>Instantly create stunning AI-generated product videos & images for your</p>
                </div>

                {/* Preload images hiddenly */}
                <div style={{ display: 'none' }}>
                    {Object.values(imagesMap).map((src) => (
                        <img key={src} src={src} alt="preload" />
                    ))}
                </div>

                <div className={styles.allDataAlignment}>
                    {/* Center Image */}
                    <div className={styles.box}>
                        <motion.img
                            key={selected}
                            src={imagesMap[selected]}
                            alt={selected}
                            initial={{ opacity: 0.9 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0.9 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Left Items */}
                    <div className={styles.left}>
                        {leftItems.map((item) => (
                            <div
                                key={item}
                                className={`${styles.iconTextAlignment} ${selected === item ? styles.active : ''}`}
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
                                className={`${styles.iconTextAlignment} ${selected === item ? styles.active : ''}`}
                                onMouseEnter={() => setSelected(item)}
                            >
                                <div className={styles.icon}>{iconsMap[item]}</div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.mobileShow}>
                    <div className={styles.leftrightAlignment}>
                        <div className={styles.imagebox}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={selected}
                                    src={imagesMap[selected]}
                                    alt={selected}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    drag="x"
                                    dragConstraints={{ left: 0, right: 0 }}
                                    onDragEnd={(e, { offset, velocity }) => {
                                        const swipe = offset.x;
                                        const allItems = [...leftItems, ...rightItems];
                                        const currentIndex = allItems.indexOf(selected);

                                        if (swipe < -50) {
                                            // Swipe left -> next image
                                            const nextIndex = (currentIndex + 1) % allItems.length;
                                            setSelected(allItems[nextIndex]);
                                        } else if (swipe > 50) {
                                            // Swipe right -> previous image
                                            const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
                                            setSelected(allItems[prevIndex]);
                                        }
                                    }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                    <div className={styles.alliconText}>
                        {[...leftItems, ...rightItems].map((item) => (
                            <div
                                key={item}
                                className={`${styles.iconTextAlignment} ${selected === item ? styles.active : ''}`}
                                onClick={() => setSelected(item)}
                            >
                                <div className={styles.icon}>
                                    {iconsMap[item]}
                                </div>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
