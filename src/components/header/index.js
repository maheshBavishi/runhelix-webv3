import React from 'react'
import styles from './header.module.scss';
const Logo = '/assets/logo/logo.svg';
export default function Header() {
  return (
    <div className={styles.header}>
      <div className='header-container'>
        <div className={styles.headerDesign}>
          <div className={styles.logo}>
            <img src={Logo} alt='Logo' />
          </div>
          <div className={styles.button}>
            <button aria-label='Login or Signup'>
              Login or Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
