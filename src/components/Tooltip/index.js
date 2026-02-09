'use client';
import React, { useState } from 'react';
import styles from './tooltip.module.scss';
import classNames from 'classnames';

export default function Tooltip({ children, content, position = 'top' }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div 
            className={styles.tooltipContainer}
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}
            {isVisible && (
                <div className={classNames(styles.tooltipContent, styles[position])}>
                    {content}
                </div>
            )}
        </div>
    );
}
