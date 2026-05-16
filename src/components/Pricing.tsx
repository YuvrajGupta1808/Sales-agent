import { Check, Megaphone, Users } from "lucide-react";
import { getWorkbookCoverageStats, outreachLeads } from "../data/salesTracker";
import { Button } from "./Button";

type PricingProps = {
  isAnnual: boolean;
  onToggleBilling: () => void;
  onEnroll: () => void;
};

export function Pricing({ isAnnual, onToggleBilling, onEnroll }: PricingProps) {
  const coverage = getWorkbookCoverageStats();
  const proPrice = isAnnual ? 399 : 49;

  return (
    <section className="section pricing-section" id="pricing">
      <div className="bottom-card-grid">
        <article className="review-card">
          <div className="review-score">
            <strong>{coverage.activeAds}</strong>
            <span>
              <Megaphone size={20} />
              Active
            </span>
          </div>
          <small>active ads in the Excel tracker</small>
          {[
            { label: "Ads", value: coverage.ads },
            { label: "Emails", value: coverage.emails },
            { label: "Leads", value: coverage.leads },
          ].map((row) => (
            <div className="rating-row" key={row.label}>
              <span>{row.label}</span>
              <div><i style={{ width: `${Math.min(100, row.value * 12)}%` }} /></div>
              <small>{row.value}</small>
            </div>
          ))}
        </article>
        <article className="community-card">
          <h3>Join a community of builders</h3>
          <p><Users size={18} /> {coverage.leads} tracked outreach leads</p>
          <p><Check size={18} /> {coverage.coursesWithCampaigns} courses with campaigns</p>
          <p><Check size={18} /> {coverage.readyEmails} ready campaign email</p>
          <div className="avatar-stack" aria-label="Community members">
            {outreachLeads.slice(0, 4).map((lead) => (
              <span key={lead.id}>{lead.name.slice(0, 2).toUpperCase()}</span>
            ))}
          </div>
        </article>
        <article className="pricing-card featured">
          <div className="plan-heading">
            <h3>Choose your plan</h3>
            <div className="billing-toggle">
              <button className={!isAnnual ? "is-active" : ""} onClick={onToggleBilling} type="button">
                Monthly
              </button>
              <button className={isAnnual ? "is-active" : ""} onClick={onToggleBilling} type="button">
                Yearly
              </button>
            </div>
          </div>
          <div className="plan-columns">
            <div>
              <strong>$12.42<span>/month</span></strong>
              <p>Billed annually at $149</p>
              <Button onClick={onEnroll}>Get started</Button>
            </div>
            <div>
              <strong>${proPrice}<span>/{isAnnual ? "year" : "month"}</span></strong>
              <p>All courses, analytics, and support</p>
              <Button variant="secondary" onClick={onEnroll}>Contact sales</Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
