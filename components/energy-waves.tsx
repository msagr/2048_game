'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/energy-waves.module.css';

export default function EnergyWaves() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create multiple wave layers
    const createWave = (delay: number, size: string, duration: string, opacity: string) => {
      const wave = document.createElement('div');
      wave.className = styles.wave;
      wave.style.cssText = `
        width: ${size};
        height: ${size};
        animation-delay: ${delay}s;
        animation-duration: ${duration};
        opacity: ${opacity};
      `;
      return wave;
    };

    // Clear existing waves
    container.innerHTML = '';

    // Create wave layers
    const waves = [
      createWave(0, '200px', '4s', '0.1'),
      createWave(0.5, '300px', '5s', '0.08'),
      createWave(1, '400px', '6s', '0.06'),
      createWave(1.5, '500px', '7s', '0.04'),
      createWave(2, '600px', '8s', '0.03'),
      createWave(2.5, '700px', '9s', '0.02'),
    ];

    waves.forEach(wave => container.appendChild(wave));

    return () => {
      container.innerHTML = '';
    };
  }, []);

  return <div ref={containerRef} className={styles.energyContainer} />;
}
