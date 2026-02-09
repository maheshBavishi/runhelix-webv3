import React from 'react';
import styles from './creditUsage.module.scss';
import InfoIcon from '@/icons/infoIcon';

const CreditUsageContent = ({ type, count }) => {
  const tokenCost = type === 'video' ? 10 : 1;
  const totalTokens = count * tokenCost;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>{type === 'video' ? 'Video Generation Math' : 'Image Generation Math'}</p>
      </div>

      <div className={styles.body}>
        {/* Base Cost */}
        {type === 'video' && (
          <div className={styles.costBox}>
            <div className={styles.row}>
              <span className={styles.label}>Sora 2 <span className={styles.sub}>(:12s)</span></span>
              <span className={styles.value}>10 Tokens</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Veo 3.1 <span className={styles.sub}>(:08s)</span></span>
              <span className={styles.value}>10 Tokens</span>
            </div>
          </div>
        )}

        {type === 'image' && (
          <div className={styles.costBox}>
            <div className={styles.row}>
              <span className={styles.label}>Cost per Image <span className={styles.sub}>(Gemini 2.5)</span></span>
              <span className={styles.value}>1 Token</span>
            </div>
          </div>
        )}

        {/* Plan Breakdown */}
        <div className={styles.breakdown}>
          <p className={styles.breakdownTitle}>Plan Capacity</p>
          
          <div className={styles.capacityBox}>
            <div className={styles.row}>
              <span className={styles.label}>Total Tokens</span>
              <span className={styles.valueHighlight}>{totalTokens.toLocaleString()} Tokens</span>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.row}>
              <span className={styles.labelTotal}>Total {type === 'video' ? 'Videos' : 'Images'}</span>
              <span className={styles.valueTotal}>{count.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditUsageContent;
