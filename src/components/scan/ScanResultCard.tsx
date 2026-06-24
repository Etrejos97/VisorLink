import { useEffect, useState } from 'react';
import type { ScanResult } from '@/types';
import { getRiskColor } from '@/utils';
import { RiskBadge } from '@/components/common/RiskBadge';
import { SignalGrid } from './SignalGrid';
import styles from './ScanResultCard.module.css';

interface ScanResultCardProps {
  result: ScanResult;
  showRecommendation?: boolean;
}

export function ScanResultCard({ result, showRecommendation = true }: ScanResultCardProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const color = getRiskColor(result.nivel);

  useEffect(() => {
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + 2, result.score);
      setAnimatedScore(cur);
      if (cur >= result.score) clearInterval(t);
    }, 14);
    return () => clearInterval(t);
  }, [result.score]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.url} title={result.url}>
          {result.url}
        </span>
        <RiskBadge level={result.nivel} />
      </div>
      <div className={styles.body}>
        <div className={styles.scoreRow}>
          <div className={styles.scoreTop}>
            <span className={styles.scoreNum} style={{ color, textShadow: `0 0 20px ${color}` }}>
              {animatedScore}
            </span>
            <div className={styles.scoreLabel}>
              / 100
              <br />
              SCORE DE RIESGO
            </div>
          </div>
          <div className={styles.scoreTrack}>
            <div
              className={styles.scoreFill}
              style={{
                width: `${animatedScore}%`,
                background: color,
                boxShadow: `0 0 12px ${color}`,
              }}
            />
          </div>
        </div>
        <SignalGrid signals={result.signals} />
        {showRecommendation && (
          <div className={styles.recommendation}>
            <span className={styles.recLabel}>// recomendación</span>
            <p>{result.recommendation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
