import React from 'react';
import styles from '@/styles/dragon-animation.module.css';

export default function DragonAnimation() {
  return (
    <div className={styles.dragonContainer}>
      {/* Dragon SVG */}
      <div className={styles.dragon}>
        <svg
          width="120"
          height="80"
          viewBox="0 0 120 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Dragon body */}
          <ellipse cx="60" cy="40" rx="35" ry="15" fill="#8B4513" />
          <ellipse cx="60" cy="40" rx="30" ry="12" fill="#A0522D" />
          
          {/* Dragon head */}
          <ellipse cx="90" cy="35" rx="18" ry="12" fill="#8B4513" />
          <ellipse cx="90" cy="35" rx="15" ry="10" fill="#A0522D" />
          
          {/* Dragon neck */}
          <ellipse cx="75" cy="37" rx="8" ry="6" fill="#8B4513" />
          
          {/* Dragon tail */}
          <path
            d="M25 40 Q10 35 5 25 Q8 30 15 35"
            fill="#8B4513"
          />
          
          {/* Wings */}
          <ellipse cx="50" cy="25" rx="20" ry="8" fill="#654321" transform="rotate(-15 50 25)" />
          <ellipse cx="70" cy="25" rx="20" ry="8" fill="#654321" transform="rotate(15 70 25)" />
          
          {/* Wing details */}
          <ellipse cx="50" cy="25" rx="15" ry="6" fill="#8B4513" transform="rotate(-15 50 25)" />
          <ellipse cx="70" cy="25" rx="15" ry="6" fill="#8B4513" transform="rotate(15 70 25)" />
          
          {/* Dragon eyes */}
          <circle cx="95" cy="32" r="3" fill="#FF4500" />
          <circle cx="95" cy="32" r="1.5" fill="#000" />
          
          {/* Dragon nostrils */}
          <circle cx="102" cy="35" r="1" fill="#000" />
          <circle cx="102" cy="38" r="1" fill="#000" />
          
          {/* Dragon spikes */}
          <polygon points="45,25 47,20 49,25" fill="#654321" />
          <polygon points="55,23 57,18 59,23" fill="#654321" />
          <polygon points="65,23 67,18 69,23" fill="#654321" />
        </svg>
      </div>

      {/* Fire breath effect */}
      <div className={styles.fireBreath}>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.flame}></div>
        <div className={styles.spark}></div>
        <div className={styles.spark}></div>
        <div className={styles.spark}></div>
        <div className={styles.spark}></div>
        <div className={styles.spark}></div>
      </div>

      {/* Smoke particles */}
      <div className={styles.smokeContainer}>
        <div className={styles.smoke}></div>
        <div className={styles.smoke}></div>
        <div className={styles.smoke}></div>
      </div>
    </div>
  );
}
