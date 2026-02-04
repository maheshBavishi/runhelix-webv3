'use client'
import React, { useState, useEffect } from 'react'
import { createClient } from "@supabase/supabase-js";
import styles from './simplePricing.module.scss';
import classNames from 'classnames';
import CheckIcon from '@/icons/checkIcon';

const StartIcon = '/assets/icons/start.svg';
const ScaleIcon = '/assets/icons/Scale.svg';
const LogoIcon = '/assets/icons/logo-primary.svg';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Static metadata matching "Image 3" for features and savings
const PLAN_METADATA = {
  'start': {
    icon: StartIcon,
    description: 'Perfect for Small Teams and Startups',
    features: [
      'Up to 30 videos/month (12 second video)',
      '12,24:48 second video options',
      'up to 300 free images',
      'Ideal for founders, solo operators, early launches',
      'No contracts, cancel anytime.'
    ],
    savingsAmount: '$7.400', // Matches screenshot "7.400" vs typical "7,400"
    traditionalCostText: '30 UGC videos* $250 = $7,500/month',
    traditionalCostSub: 'Paid to affiliates & creators'
  },
  'scale': {
    icon: StartIcon,
    description: 'Perfect for Small Teams and Startups',
    features: [
      'up to 150 videos/month (12 second video)',
      '12,24:48 second video options',
      'up to 1500 free images',
      'Built for scaling DTC brands and products teams',
      'Consistent daily content across social & ads'
    ],
    savingsAmount: '$37,000',
    traditionalCostText: '150 UGC videos* $250 = $37,500/month',
    traditionalCostSub: 'Paid to affiliates & creators'
  },
  'agency': {
    icon: StartIcon,
    description: 'Perfect for Small Teams and Startups',
    features: [
      'up to 150 videos/month (12 second video)', // Matches screenshot text if visible, or logical fallback
      '12,24:48 second video options',
      'up to 4500 free images',
      'Designed for agencies & in house brand teams',
      'Serve multiple clients without adding headcount'
    ],
    savingsAmount: '$111,000', // Corrected value for Agency typically
    traditionalCostText: '450 videos* $250 = $112,500/mo',
    traditionalCostSub: 'Paid to affiliates & creators'
  }
};

export default function SimplePricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper to reliably find metadata based on normalized name
  const getMetadata = (name) => {
    const normalized = (name || '').toLowerCase();
    if (normalized.includes('start')) return PLAN_METADATA['start'];
    if (normalized.includes('scale')) return PLAN_METADATA['scale'];
    if (normalized.includes('agency')) return PLAN_METADATA['agency'];
    return PLAN_METADATA['start']; // Fallback
  };

  useEffect(() => {
    const fetchPlans = async () => {
      if (!supabase) {
        console.error("Supabase client not initialized");
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase.from('plan').select('*');
        if (error) {
          console.error('Error fetching plans:', error);
        } else {
          console.log('Fetched plans:', data);
          setPlans(data || []);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Filter logic
  const visiblePlans = plans.filter(plan => {
    const interval = (plan.type || plan.interval || '').toLowerCase();
    const target = isYearly ? 'year' : 'month';
    const isMainPlan = ['start', 'scale', 'agency'].some(k => (plan.name || '').toLowerCase().includes(k));
    return interval.startsWith(target) && isMainPlan;
  }).sort((a, b) => a.price - b.price);

  // Price Display Logic
  const getDisplayPrice = (plan) => {
    const interval = (plan.type || plan.interval || '').toLowerCase();
    if (interval.startsWith('year')) {
      return Math.floor(plan.price / 12);
    }
    return plan.price;
  };

  return (
    <div className={styles.simplePricing} id="pricing">
      <div className='container-xs3'>
        <div className={styles.title}>
          <h2>Simple Pricing</h2>
          <p>Choose the plan that fits your needs. All plans include a 14-day free trial.</p>
        </div>

        <div className={styles.centerAlignment}>
          <div className={styles.toggleGroup}>
            <span>Monthly Billing</span>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={isYearly}
                onChange={(e) => setIsYearly(e.target.checked)}
              />
              <span className={classNames(styles.slider, styles.round)}></span>
            </label>
            <span>Yearly Billing</span>
          </div>
        </div>

        <div className={styles.grid}>
          {loading && <div style={{ width: '100%', textAlign: 'center', color: 'black' }}>Loading plans...</div>}

          {!loading && visiblePlans.length > 0 ? (
            visiblePlans.map((plan, index) => {
              const meta = getMetadata(plan.name);
              const displayPrice = getDisplayPrice(plan);

              return (
                <div className={styles.griditems} key={plan.id || index}>
                  <div className={styles.firstList}>
                    <img src={meta.icon} alt={`${plan.name} Icon`} />
                    <div className={styles.textstyle}>
                      <h3>{plan.name}</h3>
                      {/* Use static description if needed, or DB description */}
                      <p>{meta.description || plan.description}</p>
                      <h4>
                        ${displayPrice} <sub> / month </sub>
                      </h4>
                      {/* Show 'Billed yearly' only if yearly toggle is on AND plan is actually a yearly plan */}
                      {isYearly && (
                        <div style={{ fontSize: '13px', color: '#6B7280', fontWeight: '400', marginTop: '4px' }}>
                          Billed ${plan.price} yearly
                        </div>
                      )}
                    </div>
                    <div className={styles.buttonDesign}>
                      <button>{plan.cta_text || 'Choose Plan'}</button>
                    </div>
                    <div className={styles.allListAlignment}>
                      {meta.features.map((feature, i) => (
                        <div className={styles.list} key={i}>
                          <CheckIcon />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.lastBox}>
                    <div className={styles.cardheader} >
                      <h4>
                        Monthly Savings
                      </h4>
                      <h5 style={{ fontSize: '16px', fontWeight: '700', }}>
                        {meta.savingsAmount} <sub style={{ fontSize: '12px', fontWeight: '400', bottom: '0' }}>/ month</sub>
                      </h5>
                    </div>
                    <div style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '4px' }}>
                      <p style={{ fontWeight: '700', }}>Traditional Cost: {meta.traditionalCostText} </p>
                    </div>
                    <span style={{ fontSize: '12px', display: 'block' }}>
                      {meta.traditionalCostSub}
                    </span>
                  </div>
                </div>
              );
            })
          ) : (
            !loading && <div style={{ width: '100%', textAlign: 'center', color: 'black' }}>No plans found for {isYearly ? 'yearly' : 'monthly'} billing.</div>
          )}
        </div>

        <div className={styles.agencyIntegration}>
          <div className={styles.agencyIntegrationHeader}>
            <img src={LogoIcon} alt='LogoIcon' />
            <h4>Agency Integration</h4>
          </div>
          <div className={styles.gridList}>
            <div className={styles.items}><CheckIcon /><span>White Labeling- Branded with Your Interface</span></div>
            <div className={styles.items}><CheckIcon /><span>API & Custom Integrations- Workflow Tools, Cloud, CRM, DAM, Social</span></div>
            <div className={styles.items}><CheckIcon /><span>Highest Video & Image Volume Tiers</span></div>
            <div className={styles.items}><CheckIcon /><span>Custom Model Tuning</span></div>
            <div className={styles.items}><CheckIcon /><span>99.5% Uptime SLA and Priority Support, Full analytics & reporting dashboard
            </span></div>
            <div className={styles.items}><CheckIcon /><span>Dedicated Account & Technical Support Management
            </span></div>
            <div className={styles.items}><CheckIcon /><span>Contact for Custom Configuration Plan
            </span></div>
          </div>
        </div>
      </div>
    </div>
  )
}