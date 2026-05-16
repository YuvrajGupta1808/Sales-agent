import { Check, Star, Users } from "lucide-react";
import { Button } from "./Button";

type PricingProps = {
  isAnnual: boolean;
  onToggleBilling: () => void;
  onEnroll: () => void;
};

export function Pricing({ isAnnual, onToggleBilling, onEnroll }: PricingProps) {
  const proPrice = isAnnual ? 399 : 49;

  return (
    <section className="section pricing-section" id="pricing">
      <div className="bottom-card-grid">
        <article className="review-card">
          <div className="review-score">
            <strong>4.7</strong>
            <span>
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </span>
          </div>
          <small>12,456 ratings</small>
          {[72, 20, 6, 1, 1].map((width, index) => (
            <div className="rating-row" key={index}>
              <span>{5 - index}★</span>
              <div><i style={{ width: `${width}%` }} /></div>
              <small>{width}%</small>
            </div>
          ))}
        </article>
        <article className="community-card">
          <h3>Join a community of builders</h3>
          <p><Users size={18} /> 120k+ active learners</p>
          <p><Check size={18} /> Private community</p>
          <p><Check size={18} /> Weekly live sessions</p>
          <div className="avatar-stack" aria-label="Community members">
            <span>AR</span><span>MS</span><span>JP</span><span>+90k</span>
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
