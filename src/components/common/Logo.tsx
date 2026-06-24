import styles from './Logo.module.css';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = { sm: 28, md: 36, lg: 130 };
  const px = sizes[size];

  return (
    <div className={`${styles.logo} ${styles[size]}`}>
      <svg width={px} height={px} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path
          d="M100 24 L166 52 L166 110 Q166 156 100 178 Q34 156 34 110 L34 52 Z"
          fill="#00d4ff"
          fillOpacity="0.04"
          stroke="#00d4ff"
          strokeWidth="1"
          opacity="0.55"
        />
        <polyline
          points="52,50 100,148 148,50"
          fill="none"
          stroke="#00d4ff"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points="52,50 100,148 148,50"
          fill="none"
          stroke="#d8f6ff"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.65"
        />
        <rect x="56" y="143" width="18" height="11" rx="5.5" fill="#00d4ff" fillOpacity="0.14" stroke="#00d4ff" strokeWidth="1.3" />
        <rect x="126" y="143" width="18" height="11" rx="5.5" fill="#00d4ff" fillOpacity="0.14" stroke="#00d4ff" strokeWidth="1.3" />
        <line x1="74" y1="148.5" x2="126" y2="148.5" stroke="#00d4ff" strokeWidth="1.1" opacity="0.5" />
        <circle cx="100" cy="148.5" r="4" fill="#00d4ff" opacity="0.9" />
        <circle cx="100" cy="148.5" r="1.8" fill="#fff" opacity="0.9" />
      </svg>
      {showText && <span className={styles.brand}>VISOR_LINK</span>}
    </div>
  );
}
