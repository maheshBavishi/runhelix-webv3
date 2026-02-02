"use client";
import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import styles from "./simplePricing.module.scss";



const InfoIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const Check = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"

    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const CreditUsageTooltip = ({ type, tier, monthlyPrice, videoCount, imageCount }) => {
  return (
    <div className={styles.infoIcon}>
      <InfoIcon style={{ width: 14, height: 14 }} />
      <div className={styles.tooltipContent}>
        <div className={styles.tooltipTitle}>
          <InfoIcon />
          <span>{type === "video" ? "Video Generation Math" : "Image Generation Math"}</span>
        </div>

        {type === "video" && (
          <>
            <div className={`${styles.tooltipRow} ${styles.bgRow}`}>
              <div className={styles.label}>
                Sora 2 (:12s)
              </div>
              <div className={`${styles.value} ${styles.highlight}`}>10 Tokens</div>
            </div>
            <div className={`${styles.tooltipRow} ${styles.bgRow}`}>
              <div className={styles.label}>
                Veo 3.1 (:08s)
              </div>
              <div className={`${styles.value} ${styles.highlight}`}>10 Tokens</div>
            </div>
          </>
        )}

        {type === "image" && (
          <div className={`${styles.tooltipRow} ${styles.bgRow}`}>
            <div className={styles.label}>
              Cost per Image
              <small>(Gemini 2.5)</small>
            </div>
            <div className={`${styles.value} ${styles.highlight}`}>1 Credit</div>
          </div>
        )}

        <div className={styles.tooltipRow}>
          <div className={styles.label} style={{ fontWeight: "bold", textTransform: "uppercase", fontSize: "10px", color: "#64748b" }}>
            {tier} Plan Capacity
          </div>
        </div>

        {type === "video" && (
          <div style={{ background: "rgba(0,0,0,0.03)", padding: "12px", borderRadius: "8px" }}>
            <div className={styles.tooltipRow}>
              <div className={styles.label}>Total Tokens</div>
              <div className={`${styles.value} ${styles.highlight}`}>{videoCount * 10} Tokens</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.tooltipRow}>
              <div className={styles.label} style={{ color: "#64748b" }}>Total Videos</div>
              <div className={styles.value}>{videoCount}</div>
            </div>
          </div>
        )}

        {type === "image" && (
          <div style={{ background: "rgba(0,0,0,0.03)", padding: "12px", borderRadius: "8px" }}>
            <div className={styles.tooltipRow}>
              <div className={styles.label}>Total Tokens</div>
              <div className={`${styles.value} ${styles.highlight}`}>{imageCount * 1} Tokens</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.tooltipRow}>
              <div className={styles.label} style={{ color: "#64748b" }}>Total Images</div>
              <div className={styles.value}>{imageCount}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default function SimplePricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      if (!supabase) return;
      const { data, error } = await supabase
        .from("plan")
        .select("*")
        .order("price", { ascending: true });

      if (data) {
        setPlans(data);
      }
    }
    fetchPlans();
  }, []);

  const filteredPlans = plans.filter((plan) => plan.type === billingCycle && !plan.name.toLowerCase().includes("top up"));

  const renderCardBody = (plan) => {
    const name = plan.name.toLowerCase();
    const periodLabel = billingCycle === 'yearly' ? '/ year' : '/ month';

    // Default credits if DB value missing
    let safeCredits = plan.tokens;
    if (!safeCredits) {
      if (name.includes("agency")) safeCredits = 4500;
      else if (name.includes("scale")) safeCredits = 1500;
      else safeCredits = 300;
    }

    const videoCount = Math.floor(safeCredits / 10);
    const imageCount = safeCredits;
    const monthlyPriceStr = `$${Math.round(plan.price)}`; // Approximate for display in tooltip if needed

    if (name.includes("start")) {
      return (
        <div className={styles.cardBody}>
          <ul className={styles.featuresList}>
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: '600' }}>{safeCredits.toLocaleString()} Tokens {periodLabel}</span>
                <div className={styles.infoIcon}>
                  <InfoIcon style={{ width: 14, height: 14 }} />
                  <div className={styles.tooltipContent} style={{ width: 'max-content', maxWidth: '250px' }}>
                    Unused Tokens don't roll over to the next {billingCycle === 'yearly' ? 'year' : 'month'}
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.highlight}>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Up to {videoCount} videos{periodLabel} <span><small>(:12 second video)</small></span></span>
                <CreditUsageTooltip
                  type="video"
                  tier="Start"
                  monthlyPrice={monthlyPriceStr}
                  videoCount={videoCount}
                  imageCount={imageCount}
                />
              </div>
            </li>
            {/* <li>
              <Check style={{ color: '#29a6b4' }} />
              <span>:12, :24, :48 second video options</span>
            </li> */}
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Up to {imageCount} Free Images</span>
                <CreditUsageTooltip
                  type="image"
                  tier="Start"
                  monthlyPrice={monthlyPriceStr}
                  videoCount={videoCount}
                  imageCount={imageCount}
                />
              </div>
            </li>
            <li>
              <InfoIcon style={{ color: '#29a6b4' }} />
              <span>Ideal for founders, solo operators, early launches</span>
            </li>
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <span>No contracts. Cancel anytime.</span>
            </li>
          </ul>

          <div className={styles.divider}></div>

          <div className={styles.savingsCompact}>
            <div className={styles.savingsTop}>
              <div className={styles.saveTitle}>Monthly Savings</div>
              <div className={styles.saveValue}>$7,400<span>/mo</span></div>
            </div>
            <div className={styles.savingsBottom}>
              <div className={styles.traditionalContent}>
                <strong>Traditional Cost:</strong> 30 UGC videos × $250
                <br />= $7,500/ month <br />
                <span className={styles.subtext}>paid to affiliates & creators</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (name.includes("scale")) {
      return (
        <div className={styles.cardBody}>
          <ul className={styles.featuresList}>
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: '600' }}>{safeCredits.toLocaleString()} Tokens {periodLabel}</span>
                <div className={styles.infoIcon}>
                  <InfoIcon style={{ width: 14, height: 14 }} />
                  <div className={styles.tooltipContent} style={{ width: 'max-content', maxWidth: '250px' }}>
                    Unused Tokens don't roll over to the next {billingCycle === 'yearly' ? 'year' : 'month'}
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.highlight}>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Up to {videoCount} videos{periodLabel} <span><small>(:12 second video)</small></span></span>
                <CreditUsageTooltip
                  type="video"
                  tier="Scale"
                  monthlyPrice={monthlyPriceStr}
                  videoCount={videoCount}
                  imageCount={imageCount}
                />
              </div>
            </li>
            {/* <li>
              <Check style={{ color: '#29a6b4' }} />
              <span>:12, :24, :48 second video options</span>
            </li> */}
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Up to {imageCount} Free Images</span>
                <CreditUsageTooltip
                  type="image"
                  tier="Scale"
                  monthlyPrice={monthlyPriceStr}
                  videoCount={videoCount}
                  imageCount={imageCount}
                />
              </div>
            </li>
            <li>
              <InfoIcon style={{ color: '#29a6b4' }} />
              <span>Built for scaling DTC brands and product teams</span>
            </li>
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <span>Consistent daily content across social & ads</span>
            </li>
          </ul>

          <div className={styles.divider}></div>

          <div className={styles.savingsCompact}>
            <div className={styles.savingsTop}>
              <div className={styles.saveTitle}>Monthly Savings</div>
              <div className={styles.saveValue}>$37,000<span>/mo</span></div>
            </div>
            <div className={styles.savingsBottom}>
              <div className={styles.traditionalContent}>
                <strong>Traditional Cost:</strong> 150 UGC videos × $250
                <br />= $37,500/ month <br />
                <span className={styles.subtext}>paid to affiliates & creators</span>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (name.includes("agency")) {
      return (
        <div className={styles.cardBody}>
          <ul className={styles.featuresList}>
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontWeight: '600' }}>{safeCredits.toLocaleString()} Tokens {periodLabel}</span>
                <div className={styles.infoIcon}>
                  <InfoIcon style={{ width: 14, height: 14 }} />
                  <div className={styles.tooltipContent} style={{ width: 'max-content', maxWidth: '250px' }}>
                    Unused Tokens don't roll over to the next {billingCycle === 'yearly' ? 'year' : 'month'}
                  </div>
                </div>
              </div>
            </li>
            <li className={styles.highlight}>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Up to {videoCount} videos{periodLabel} <span><small>(:12 second video)</small></span></span>
                <CreditUsageTooltip
                  type="video"
                  tier="Agency"
                  monthlyPrice={monthlyPriceStr}
                  videoCount={videoCount}
                  imageCount={imageCount}
                />
              </div>
            </li>
            {/* <li>
              <Check style={{ color: '#29a6b4' }} />
              <span>:12, :24, :48 second video options</span>
            </li> */}
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>Up to {imageCount} Free Images</span>
                <CreditUsageTooltip
                  type="image"
                  tier="Agency"
                  monthlyPrice={monthlyPriceStr}
                  videoCount={videoCount}
                  imageCount={imageCount}
                />
              </div>
            </li>
            <li>
              <InfoIcon style={{ color: '#29a6b4' }} />
              <span>Designed for agencies & in-house brand teams</span>
            </li>
            <li>
              <Check style={{ color: '#29a6b4' }} />
              <span>Serve multiple clients without adding headcount</span>
            </li>
          </ul>

          <div className={styles.divider}></div>

          <div className={styles.savingsCompact}>
            <div className={styles.savingsTop}>
              <div className={styles.saveTitle}>Monthly Savings</div>
              <div className={styles.saveValue}>$20K–111K<span>/mo</span><div className={styles.subtextSmall}>depending on approach</div></div>
            </div>
            <div className={styles.savingsBottom}>
              <div className={styles.traditionalContent}>
                <strong>Traditional Cost:</strong>
                <div className={styles.optionBlock}>
                  <strong>Option A — Outsourcing:</strong><br />
                  450 videos × $250 = $112,500/mo
                </div>
                <div className={styles.optionBlock}>
                  <strong>Option B — In-house:</strong><br />
                  - 2 video editors (~$11,600/mo)<br />
                  - 2 UGC creators (~$10,000/mo)<br />
                  = ~$21,600/ month
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className={styles.simplepricingmain} id="pricing">
        <div className="container-md">
          <div className={styles.title}>
            <h1>Simple Pricing</h1>
            <div className={styles.togglechip}>
              <div
                className={`${styles.togglechileft} ${billingCycle === 'monthly' ? styles.active : ''}`}
                onClick={() => setBillingCycle('monthly')}
                style={{ cursor: 'pointer', background: billingCycle === 'monthly' ? 'linear-gradient(90deg, #29a6b4 0%, #9ed2c3 100%)' : 'transparent', color: billingCycle === 'monthly' ? '#fff' : 'inherit', boxShadow: billingCycle === 'monthly' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none' }}
              >
                <p>Monthly Billing</p>
              </div>
              <div
                className={`${styles.togglechiright} ${billingCycle === 'yearly' ? styles.active : ''}`}
                onClick={() => setBillingCycle('yearly')}
                style={{ cursor: 'pointer', background: billingCycle === 'yearly' ? 'linear-gradient(90deg, #29a6b4 0%, #9ed2c3 100%)' : 'transparent', color: billingCycle === 'yearly' ? '#fff' : 'inherit', boxShadow: billingCycle === 'yearly' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none' }}
              >
                <p>Yearly Billing</p>
                <div className={styles.savebtn}>
                  <span>Save 20%</span>
                </div>
              </div>
            </div>
            <div className={styles.titlepera}>
              <p>
                VIDEOS: UGC · Ads · Promotional · Educational · Short-form ·
                Long-form IMAGES: Photoshoot · Lifestyle · Model · Infographic
              </p>
            </div>
          </div>
          <div className={styles.grid}>
            {filteredPlans.map((plan) => (
              <div key={plan.id} className={`${styles.pricingCard} ${plan.name.toLowerCase().includes('scale') ? styles.popular : ''}`}>
                {plan.name.toLowerCase().includes('scale') && <div className={styles.popularBadge}>Most Popular</div>}
                <div className={styles.cardHeader}>
                  <div className={styles.tierName}>{plan.name}</div>
                  <div className={styles.price}>
                    ${billingCycle === "yearly" ? Math.round(plan.price / 12) : plan.price}
                    <span>/ month</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      Billed ${plan.price} yearly
                    </div>
                  )}
                </div>

                <a
                  className={styles.subscribeBtn}
                  href={`https://platform.runhelix.ai/pricing?plan=${plan.name}&billing=${billingCycle}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {plan.name.toLowerCase().includes("start")
                    ? "Get Started"
                    : plan.name.toLowerCase().includes("scale")
                      ? "Choose Scale"
                      : plan.name.toLowerCase().includes("agency")
                        ? "Choose Agency"
                        : "Subscribe"}
                </a>

                {renderCardBody(plan)}
              </div>
            ))}
            {/* Logic fallback if no plans loaded yet */}
            {plans.length === 0 && (
              <div style={{ width: '100%', textAlign: 'center', gridColumn: 'span 3', padding: '40px' }}>Loading plans...</div>
            )}
          </div>

          <div className={styles.pricingbottommain}>
            <div className={styles.pricingbottom}>
              <div className={styles.pricingbottomtopbox}>
                <h6>Agency- Integration</h6>
                <div className={styles.iconText}>
                  <Check style={{ color: '#29a6b4', width: '20px', height: '20px', flexShrink: 0 }} />
                  <span>White Labeling- Branded with Your Interface</span>
                </div>
                <div className={styles.iconText}>
                  <Check style={{ color: '#29a6b4', width: '20px', height: '20px', flexShrink: 0 }} />
                  <span> API & Custom Integrations- Workflow Tools, Cloud, CRM, DAM, Social.</span>
                </div>
                <div className={styles.iconText}>
                  <Check style={{ color: '#29a6b4', width: '20px', height: '20px', flexShrink: 0 }} />
                  <span>Highest Video & Image Volume Tiers</span>
                </div>
                <div className={styles.iconText}>
                  <Check style={{ color: '#29a6b4', width: '20px', height: '20px', flexShrink: 0 }} />
                  <span>Custom Model Tuning</span>
                </div>
                <div className={styles.iconText}>
                  <Check style={{ color: '#29a6b4', width: '20px', height: '20px', flexShrink: 0 }} />
                  <span>99.5% Uptime SLA and Priority Support, Full analytics & reporting dashboard</span>
                </div>
                {/* <div className={styles.iconText}>
                  <img src={CheckIcon} alt="CheckIcon" />
                  <span>$4,999 Set-up Fee + Integrations Custom Model Tuning & Content
                    Tiers</span>
                </div> */}
                <div className={styles.iconText}>
                  <Check style={{ color: '#29a6b4', width: '20px', height: '20px', flexShrink: 0 }} />
                  <span>Dedicated Account & Technical Support Management</span>
                </div>
                <div className={styles.iconText}>
                  <Check style={{ color: '#29a6b4', width: '20px', height: '20px', flexShrink: 0 }} />
                  <span>Contact for Custom Configuration Plan</span>
                </div>
                {/* <a href="https://platform.runhelix.ai/auth" target="_blank"> */}
                <button type="button" className={styles.contactbtn}>
                  Contact Us
                </button>
                {/* </a> */}
              </div>
              <div className={styles.pricingbottombottombox}>
                <p className={styles.litsttitle}>* Industry Benchmark Costs</p>
                <ul>
                  <li>Agency short-form video: $800–$1,500 per video</li>
                  <li>UGC creator (10–15 sec): $250–$600 per video</li>
                  <li>
                    In-house video hire: $65K–$90K/year ($5,400–$7,500/ month per
                    person)
                  </li>
                  <li>Production timelines: days to weeks</li>
                </ul>
                <p className={styles.instantly}>Run Helix: Instantly</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
