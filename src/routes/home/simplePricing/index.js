import React from 'react'
import styles from './simplePricing.module.scss';
import classNames from 'classnames';
import CheckIcon from '@/icons/checkIcon';
const StartIcon = '/assets/icons/start.svg';
const ScaleIcon = '/assets/icons/Scale.svg';
export default function SimplePricing() {
    return (
        <div className={styles.simplePricing}>
            <div className='container-xs3'>
                <div className={styles.title}>
                    <h2>
                        Simple Pricing
                    </h2>
                    <p>
                        Choose the plan that fits your needs.all plans include a 14-day free trial.
                    </p>
                </div>
                <div className={styles.centerAlignment}>
                    <div className={styles.toggleGroup}>
                        <span>
                            Monthly Billing
                        </span>
                        <label className={styles.switch}>
                            <input type="checkbox" />
                            <span className={classNames(styles.slider, styles.round)}></span>
                        </label>
                        <span>
                            Yearly Billing
                        </span>
                    </div>
                </div>
                <div className={styles.grid}>
                    <div className={styles.griditems}>
                        <div className={styles.firstList}>
                            <img src={StartIcon} alt='StartIcon' />
                            <div className={styles.textstyle}>
                                <h3>
                                    Start
                                </h3>
                                <p>
                                    Perfect for Small Teams and Startups
                                </p>
                                <h4>
                                    $99 <sub> / month </sub>
                                </h4>
                            </div>
                            <div className={styles.buttonDesign}>
                                <button>
                                    Choose Plan
                                </button>
                            </div>
                            <div className={styles.allListAlignment}>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        Up to 30 videos/month (12 second video)
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        12,24:48 second video options
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        up to 300 free images
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        Ideal for founders, solo operators, early launches
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        No contracts, cancel anytime.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.lastBox}>
                            <div className={styles.cardheader}>
                                <h4>
                                    Monthly Savings
                                </h4>
                                <h5>
                                    $7.400 <sub>
                                        / month
                                    </sub>
                                </h5>
                            </div>
                            <p>
                                <b>
                                    Traditional Cost:</b> 30 UGC videos* $250 = $7,500/month
                            </p>
                            <span>
                                Paid to affiliates & creators
                            </span>
                        </div>

                    </div>
                    <div className={styles.griditems}>
                        <div className={styles.firstList}>
                            <img src={ScaleIcon} alt='ScaleIcon' />
                            <div className={styles.textstyle}>
                                <h3>
                                    Scale
                                </h3>
                                <p>
                                    Perfect for Small Teams and Startups
                                </p>
                                <h4>
                                    $399 <sub> / month </sub>
                                </h4>
                            </div>
                            <div className={styles.buttonDesign}>
                                <button>
                                    Subscribe
                                </button>
                            </div>
                            <div className={styles.allListAlignment}>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        up to 150 videos/month (12 second video)
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        12,24:48 second video options
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        up to 1500 free images
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        Built for scaling DTC brands and products teams
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        Consistent daily content across social & ads
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.lastBox}>
                            <div className={styles.cardheader}>
                                <h4>
                                    Monthly Savings
                                </h4>
                                <h5>
                                    $37,000 <sub>
                                        / month
                                    </sub>
                                </h5>
                            </div>
                            <p>
                                <b>
                                    Traditional Cost:</b> 30 UGC videos* $250 = $7,500/month
                            </p>
                            <span>
                                Paid to affiliates & creators
                            </span>
                        </div>

                    </div>
                    <div className={styles.griditems}>
                        <div className={styles.firstList}>
                            <img src={StartIcon} alt='StartIcon' />
                            <div className={styles.textstyle}>
                                <h3>
                                    Agency Standard
                                </h3>
                                <p>
                                    Perfect for Small Teams and Startups
                                </p>
                                <h4>
                                    $999 <sub> / month </sub>
                                </h4>
                            </div>
                            <div className={styles.buttonDesign}>
                                <button>
                                    Choose Plan
                                </button>
                            </div>
                            <div className={styles.allListAlignment}>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        up to 150 videos/month (12 second video)
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        12,24:48 second video options
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        up to 4500 free images
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        Designed for agencies & in house brand teams
                                    </span>
                                </div>
                                <div className={styles.list}>
                                    <CheckIcon />
                                    <span>
                                        Serve multiple clients without adding headcount
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.lastBox}>
                            <div className={styles.cardheader}>
                                <h4>
                                    Monthly Savings
                                </h4>
                                <h5>
                                    $37,000 <sub>
                                        / month
                                    </sub>
                                </h5>
                            </div>
                            <p>
                                <b>
                                    Traditional Cost:</b> 30 UGC videos* $250 = $7,500/month
                            </p>
                            <span>
                                Paid to affiliates & creators
                            </span>
                        </div>

                    </div>
                </div>
                <div className={styles.agencyIntegration}>
                    <h4>
                        Agency Integration
                    </h4>
                    <div className={styles.gridList}>
                        <div className={styles.items}>
                            <CheckIcon />
                            <span>
                                White labeling branded with your interface
                            </span>
                        </div>
                        <div className={styles.items}>
                            <CheckIcon />
                            <span>
                                Custom model tuning
                            </span>
                        </div>
                        <div className={styles.items}>
                            <CheckIcon />
                            <span>
                                API & custom integrations-workflow tools,cloud,CRM,DAM,social
                            </span>
                        </div>
                        <div className={styles.items}>
                            <CheckIcon />
                            <span>
                                99.5% uptime with priority support & analytics
                            </span>
                        </div>
                        <div className={styles.items}>
                            <CheckIcon />
                            <span>
                                Highest video & image volume tiers
                            </span>
                        </div>
                        <div className={styles.items}>
                            <CheckIcon />
                            <span>
                                Dedicated account & technical support managment
                            </span>
                        </div>
                        <div className={styles.items}>
                            <CheckIcon />
                            <span>
                                Contact for custom configuration plan
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
