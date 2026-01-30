import React from 'react'
import styles from './createProduct.module.scss';
import RightArrow from '@/icons/rightArrow';
import PlusIcon from '@/icons/plusIcon';
import MediaIcon from '@/icons/mediaIcon';
import MicIcon from '@/icons/micIcon';
import PlayWhiteIcon from '@/icons/playWhiteIcon';
const PosterImage = '/assets/images/poster.png';
export default function CreateProduct() {
    return (
        <div className={styles.createProductAlignment}>
            <div className='container-xs2'>
                <div className={styles.title}>
                    <h2>
                        Create Your First Product Video or Image
                    </h2>
                    <div className={styles.allIconAlignment}>
                        <span>Idea</span>
                        <RightArrow />
                        <span>Run Helix</span>
                        <RightArrow />
                        <span>Post</span>
                        <RightArrow />
                        <span>Test</span>
                        <RightArrow />
                        <span>Boost</span>
                        <RightArrow />
                        <span>Repeat</span>
                    </div>
                </div>
                <div className={styles.outlineBox}>
                    <div className={styles.boxCenter}>
                        <div className={styles.relativeClass}>
                            <div className={styles.subtitle}>
                                <h2>
                                    Good Afternoon,Jason What’s on <span>your mind?</span>
                                </h2>
                            </div>
                            <div className={styles.videobox}>
                                <div className={styles.poster}>
                                    <img src={PosterImage} alt='PosterImage' />
                                </div>
                                <div className={styles.textBox}>
                                    <p>
                                        Real creator. Real setting. Handheld phone shots with casual movement and natural lighting — true UGC authenticity.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.toggleCenter}>
                                <div className={styles.buttonGroup}>
                                    <button className={styles.active}>Photo</button>
                                    <button>Video</button>
                                </div>
                            </div>
                            <div className={styles.messageBox}>
                                <textarea placeholder='Message AI Chat....'></textarea>
                                <div className={styles.chatBottomAlignment}>
                                    <div className={styles.leftAlignment}>
                                        <button>
                                            <PlusIcon />
                                            Media
                                        </button>
                                        <button>
                                            <MediaIcon />
                                            Attach
                                        </button>
                                    </div>
                                    <div className={styles.rightAlignment}>
                                        <div className={styles.voice}>
                                            <MicIcon />
                                        </div>
                                        <button>
                                            <PlayWhiteIcon />
                                            Run Helix
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
