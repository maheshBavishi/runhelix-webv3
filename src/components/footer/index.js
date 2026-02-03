'use client'
import React from 'react'
import styles from './footer.module.scss';
import Link from 'next/link';
const FooterLogo = '/assets/logo/footer-logo.svg';
const TiktokIcon = '/assets/icons/tiktok.svg';
const TwitterIcon = '/assets/icons/twitter.svg';
const LinkdinIcon = '/assets/icons/linkdin.svg';
const YoutubeIcon = '/assets/icons/youtube-outline.svg';
export default function Footer() {
  const handleClick = (id) => {
    window.location.href = `/#${id}`;
  };
  return (
    <footer className={styles.footer}>
      <div className='container-lg'>
        <div style={{ position: "relative" }}>
          <div className={styles.footerTopAlignment}>
            <div className={styles.footerlogo}>
              <Link href="/">
                <img src={FooterLogo} alt='FooterLogo' />
              </Link>
              <p >
                Copyright © Helix
              </p>
            </div>
            <div className={styles.footerMenu}>
              <a onClick={() => { handleClick("industries"); }}>Industries</a>
              <a onClick={() => { handleClick("workflow"); }}>Workflow</a>
              <a onClick={() => { handleClick("pricing"); }}>Pricing</a>
              <a href='https://platform.runhelix.ai/auth' target='_blank'>Login</a>
            </div>
            <div className={styles.socialIcon}>
              <a href='https://www.tiktok.com/notfound' target='_blank'>
                <img src={TiktokIcon} alt='TiktokIcon' />
              </a>
              <img src={TwitterIcon} alt='TwitterIcon' />
              <a href='https://www.linkedin.com/company/run-helix-ai' target='_blank'>
                <img src={LinkdinIcon} alt='LinkdinIcon' />
              </a>
              <a href='https://www.youtube.com/@RunHelix_AI' target='_blank'>
                <img src={YoutubeIcon} alt='YoutubeIcon' />
              </a>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.footerBottomText}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms and Conditions</Link>
          </div>
          <div className={styles.footerText}>
            <h4>
              Helix
            </h4>
          </div>
        </div>
      </div>
      <div className={styles.bgbottom}></div>
    </footer>
  )
}
