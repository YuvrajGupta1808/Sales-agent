import { ArrowRight, Award, Box, BriefcaseBusiness, Clock3, Sparkles } from "lucide-react";
import { trackerSource } from "../data/salesTracker";
import { Button } from "./Button";
import { ThreeDShowcase } from "./ThreeDShowcase";

export function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-copy">
        <h1>Master skills that compound</h1>
        <p>
          Buy focused online courses built around real projects, expert review, and
          career-ready outcomes.
        </p>
        <div className="hero-actions">
          <Button>
            Explore courses <ArrowRight size={18} />
          </Button>
          <Button variant="secondary">View learning paths</Button>
        </div>
        <div className="hero-proof" aria-label="CourseCraft proof points">
          <div>
            <Sparkles size={18} />
            <strong>Expert instructors</strong>
            <span>Learn from the best</span>
          </div>
          <div>
            <BriefcaseBusiness size={18} />
            <strong>Practical projects</strong>
            <span>Build real-world skills</span>
          </div>
          <div>
            <Clock3 size={18} />
            <strong>Lifetime access</strong>
            <span>Learn on your time</span>
          </div>
          <div>
            <Award size={18} />
            <strong>Certificate</strong>
            <span>Showcase your skills</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <ThreeDShowcase />
        <div className="mentor-card">
          <Box size={18} />
          <div>
            <strong>Marketing source</strong>
            <span>{trackerSource.workbookPath}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
