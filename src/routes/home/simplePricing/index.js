'use client'
import React, { useState, useEffect } from 'react'
import { createClient } from "@supabase/supabase-js";
import styles from './simplePricing.module.scss';
import classNames from 'classnames';
import CheckIcon from '@/icons/checkIcon';
import InfoIcon from '@/icons/infoIcon';
import Tooltip from '@/components/Tooltip';
import CreditUsageContent from './CreditUsageContent';

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
      '300 Tokens / month',
      { text: 'Up to 30 videos/month (12 second video)', tooltipType: 'video', count: 30 },
      '12,24:48 second video options',
      { text: 'up to 300 free images', tooltipType: 'image', count: 300 },
      'Ideal for founders, solo operators, early launches',
      'No contracts, cancel anytime.'
    ],
    savings: {
      type: 'simple',
      amount: '$7,400',
      text: 'Traditional Cost: 30 UGC videos * $250 = $7,500/month',
      sub: 'Paid to affiliates & creators'
    }
  },
  'scale': {
    icon: ScaleIcon,
    description: 'Perfect for Small Teams and Startups',
    features: [
      '1,500 Tokens / month',
      { text: 'up to 150 videos/month (12 second video)', tooltipType: 'video', count: 150 },
      '12,24:48 second video options',
      { text: 'up to 1500 free images', tooltipType: 'image', count: 1500 },
      'Built for scaling DTC brands and products teams',
      'Consistent daily content across social & ads'
    ],
    savings: {
      type: 'simple',
      amount: '$37,000',
      text: 'Traditional Cost: 150 UGC videos * $250 = $37,500/month',
      sub: 'Paid to affiliates & creators'
    }
  },
  'agency': {
    icon: StartIcon,
    description: 'Perfect for Small Teams and Startups',
    features: [
      '4,500 Tokens / month',
      { text: 'up to 450 videos/month (12 second video)', tooltipType: 'video', count: 450 },
      '12,24:48 second video options',
      { text: 'up to 4500 free images', tooltipType: 'image', count: 4500 },
      'Designed for agencies & in house brand teams',
      'Serve multiple clients without adding headcount'
    ],
    savings: {
      type: 'complex',
      amount: '$20K-111K',
      subAmount: '/mo',
      note: 'depending on approach',
      traditionalCostLabel: 'Traditional Cost:',
      options: [
        { label: 'Option A — Outsourcing:', value: '450 videos × $250 = $112,500/mo' },
        { label: 'Option B — In-house:', value: ['- 2 video editors (~$11,600/mo)', '- 2 UGC creators (~$10,000/mo)', '= ~$21,600/ month'] }
      ]
    }
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

  const handleSubscribe = (planName) => {
    const billingCycle = isYearly ? 'yearly' : 'monthly';
    // Clean up plan name for URL matching (optional, but good for robustness)
    let planParam = 'Start';
    if (planName.toLowerCase().includes('scale')) planParam = 'Scale';
    if (planName.toLowerCase().includes('agency')) planParam = 'Agency';
    
    // Redirect to the platform app with query params in a new tab
    window.open(`https://platform.runhelix.ai/pricing?plan=${planParam}&billing=${billingCycle}`, '_blank');
  };

  return (
    <div className={styles.simplePricing} id="pricing">
      <div className='container-xs3'>
        <div className={styles.title}>
          <h2>Simple Pricing</h2>
          <p className={styles.content}>
            VIDEOS: UGC · Ads · Promotional · Educational · Short-form ·
            Long-form IMAGES: Photoshoot · Lifestyle · Model · Infographic
          </p>
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

             <div className={styles.yearlyLabel}>
              <span>Yearly Billing</span>
              <span className={styles.saveBadge}>SAVE 20%</span>
             </div>
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
                      <button onClick={() => handleSubscribe(plan.name)}>
                        {plan.name.toLowerCase().includes('start')
                          ? 'Get Started'
                          : plan.name.toLowerCase().includes('scale')
                          ? 'Choose Scale'
                          : plan.name.toLowerCase().includes('agency')
                          ? 'Choose Agency'
                          : plan.cta_text || 'Subscribe'}
                      </button>
                    </div>
                    <div className={styles.allListAlignment}>
                      {meta.features.map((feature, i) => (
                        <div className={styles.list} key={i}>
                          <CheckIcon />
                          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
                            <span>{typeof feature === 'string' ? feature : feature.text}</span>
                            {typeof feature === 'object' && feature.tooltipType && (
                              <div style={{ marginLeft: '6px', display: 'flex', alignItems: 'center' }}>
                                <Tooltip content={<CreditUsageContent type={feature.tooltipType} count={feature.count} />}>
                                  <InfoIcon width={14} height={14} color="#9CA3AF" />
                                </Tooltip>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.lastBox}>
                    <div className={styles.cardheader} >
                    {meta.savings.type === 'complex' ? (
                       <div className={styles.agencySavingsHeader}>
                          <span className={styles.savingsLabel}>Monthly Savings</span>
                          <span className={styles.savingsAmount}>{meta.savings.amount} <span className={styles.sub}>{meta.savings.subAmount}</span></span>
                          <span className={styles.savingsNote}>{meta.savings.note}</span>
                       </div>
                    ) : (
                      <>
                        <h4>Monthly Savings</h4>
                        <h5 style={{ fontSize: '16px', fontWeight: '700', }}>
                          {meta.savings.amount || meta.savingsAmount} <sub style={{ fontSize: '12px', fontWeight: '400', bottom: '0' }}>/ month</sub>
                        </h5>
                      </>
                    )}
                    </div>

                    {meta.savings.type === 'complex' ? (
                      <div className={styles.agencySavingsBody}>
                        <p className={styles.tradCostLabel}>{meta.savings.traditionalCostLabel}</p>
                        {meta.savings.options.map((opt, idx) => (
                          <div key={idx} className={styles.optionBlock}>
                            <p className={styles.optionLabel}>{opt.label}</p>
                            {Array.isArray(opt.value) ? (
                              opt.value.map((v, vIdx) => <p key={vIdx} className={styles.optionValue}>{v}</p>)
                            ) : (
                              <p className={styles.optionValue}>{opt.value}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: '13px', lineHeight: '1.5', marginBottom: '4px' }}>
                          <p style={{ fontWeight: '700', }}>{meta.savings.text || meta.traditionalCostText}</p>
                        </div>
                        <span style={{ fontSize: '12px', display: 'block' }}>
                          {meta.savings.sub || meta.traditionalCostSub}
                        </span>
                      </>
                    )}
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
            <h4>Agency - Integration</h4>
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