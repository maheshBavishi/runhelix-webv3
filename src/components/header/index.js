"use client";
import React, { useEffect, useState } from "react";
import styles from './header.module.scss';
import classNames from "classnames";
import Link from "next/link";
const Logo = '/assets/logo/logo.svg';
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState("noScroll");

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "topToDown" : "downToTop";
      if (currentScrollTop === 0) {
        setScrollDirection("noScroll");
      } else if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection);
    return () => {
      window.removeEventListener("scroll", updateScrollDirection);
    };
  }, [scrollDirection]);

  return scrollDirection;
}
export default function Header() {
  const scrollDirection = useScrollDirection();
  return (
    <div className={classNames(
      styles.header,
      scrollDirection === "downToTop"
        ? styles.show
        : scrollDirection === "noScroll"
          ? null
          : styles.hide
    )}>
      <div className='header-container'>
        <div className={styles.headerDesign}>
          <div className={styles.logo}>
            <Link href="/">
              <img src={Logo} alt='Logo' />
            </Link>
          </div>
          <div className={styles.button}>
            <a href="https://platform.runhelix.ai/auth" target="_blank">
              <button aria-label='Login or Signup'>
                Login or Signup
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
