import React from 'react'
import styles from './footer.module.scss';
const FooterLogo = '/assets/logo/footer-logo.svg';
const TiktokIcon = '/assets/icons/tiktok.svg';
const TwitterIcon = '/assets/icons/twitter.svg';
const LinkdinIcon = '/assets/icons/linkdin.svg';
const YoutubeIcon = '/assets/icons/youtube-outline.svg';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className='container-lg'>
        <div className={styles.footerTopAlignment}>
          <div className={styles.footerlogo}>
            <img src={FooterLogo} alt='FooterLogo' />
            <p>
              Copyright © Helix
            </p>
          </div>
          <div className={styles.footerMenu}>
            <a>Industries</a>
            <a>Workflow</a>
            <a>Pricing</a>
            <a>Login</a>
          </div>
          <div className={styles.socialIcon}>
            <img src={TiktokIcon} alt='TiktokIcon' />
            <img src={TwitterIcon} alt='TwitterIcon' />
            <img src={LinkdinIcon} alt='LinkdinIcon' />
            <img src={YoutubeIcon} alt='YoutubeIcon' />
          </div>
        </div>
        <div className={styles.line}></div>
        <div className={styles.footerBottomText}>
          <a>Privacy Policy</a>
          <a>Terms and Conditions</a>
        </div>
        <div className={styles.footerText}>
          <h4>
            Helix
          </h4>
        </div>
      </div>
      <div className={styles.bgbottom}></div>
    </footer>
  )
}
