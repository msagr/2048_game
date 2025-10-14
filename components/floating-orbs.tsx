'use client';

import { useEffect, useRef } from 'react';
import styles from '@/styles/floating-orbs.module.css';

interface Orb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
  pulse: number;
  pulseSpeed: number;
  trail: { x: number; y: number; opacity: number }[];
}

export default function FloatingOrbs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize orbs
    const initOrbs = () => {
      orbsRef.current = [];
      const colors = [
        'rgba(59, 130, 246, 0.8)', // Blue
        'rgba(147, 51, 234, 0.8)', // Purple
        'rgba(236, 72, 153, 0.8)', // Pink
        'rgba(34, 197, 94, 0.8)',  // Green
        'rgba(251, 191, 36, 0.8)', // Yellow
        'rgba(239, 68, 68, 0.8)',  // Red
      ];

      for (let i = 0; i < 8; i++) {
        const orb: Orb = {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          radius: Math.random() * 30 + 20,
          color: colors[Math.floor(Math.random() * colors.length)],
          opacity: Math.random() * 0.6 + 0.4,
          pulse: 0,
          pulseSpeed: Math.random() * 0.05 + 0.02,
          trail: [],
        };
        orbsRef.current.push(orb);
      }
    };

    const updateOrbs = () => {
      orbsRef.current.forEach(orb => {
        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off walls
        if (orb.x <= orb.radius || orb.x >= window.innerWidth - orb.radius) {
          orb.vx *= -0.8;
          orb.x = Math.max(orb.radius, Math.min(window.innerWidth - orb.radius, orb.x));
        }
        if (orb.y <= orb.radius || orb.y >= window.innerHeight - orb.radius) {
          orb.vy *= -0.8;
          orb.y = Math.max(orb.radius, Math.min(window.innerHeight - orb.radius, orb.y));
        }

        // Add gravity and air resistance
        orb.vy += 0.02;
        orb.vx *= 0.999;
        orb.vy *= 0.999;

        // Update pulse
        orb.pulse += orb.pulseSpeed;

        // Update trail
        orb.trail.push({ x: orb.x, y: orb.y, opacity: 1 });
        if (orb.trail.length > 20) {
          orb.trail.shift();
        }
        orb.trail.forEach((point, index) => {
          point.opacity = index / orb.trail.length;
        });
      });
    };

    const renderOrbs = () => {
      // Clear previous orbs
      const existingOrbs = container.querySelectorAll('.orb');
      existingOrbs.forEach(orb => orb.remove());

      orbsRef.current.forEach((orb, index) => {
        // Create orb element
        const orbElement = document.createElement('div');
        orbElement.className = `orb ${styles.orb}`;
        orbElement.style.cssText = `
          position: absolute;
          left: ${orb.x - orb.radius}px;
          top: ${orb.y - orb.radius}px;
          width: ${orb.radius * 2}px;
          height: ${orb.radius * 2}px;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(255, 255, 255, 0.8),
            ${orb.color},
            rgba(0, 0, 0, 0.1)
          );
          border-radius: 50%;
          opacity: ${orb.opacity + Math.sin(orb.pulse) * 0.3};
          transform: scale(${1 + Math.sin(orb.pulse) * 0.2});
          box-shadow: 
            0 0 ${orb.radius}px ${orb.color},
            inset 0 0 ${orb.radius / 2}px rgba(255, 255, 255, 0.3);
          filter: blur(0.5px);
          pointer-events: none;
          z-index: ${10 - index};
        `;

        // Create trail
        orb.trail.forEach((point, trailIndex) => {
          const trailElement = document.createElement('div');
          trailElement.className = styles.trail;
          const size = (orb.radius / 3) * (trailIndex / orb.trail.length);
          trailElement.style.cssText = `
            position: absolute;
            left: ${point.x - size}px;
            top: ${point.y - size}px;
            width: ${size * 2}px;
            height: ${size * 2}px;
            background: ${orb.color};
            border-radius: 50%;
            opacity: ${point.opacity * 0.5};
            pointer-events: none;
            z-index: ${5 - index};
          `;
          container.appendChild(trailElement);
        });

        container.appendChild(orbElement);
      });
    };

    const animate = () => {
      updateOrbs();
      renderOrbs();
      animationRef.current = requestAnimationFrame(animate);
    };

    initOrbs();
    animate();

    const handleResize = () => {
      initOrbs();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <div ref={containerRef} className={styles.orbContainer} />;
}
