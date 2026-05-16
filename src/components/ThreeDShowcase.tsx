import { Award, BarChart3, Code2, Megaphone, PenTool, PlayCircle } from "lucide-react";
import { getWorkbookCoverageStats } from "../data/salesTracker";

export function ThreeDShowcase() {
  const coverage = getWorkbookCoverageStats();

  return (
    <div className="showcase" aria-label="CourseCraft learning preview">
      <div className="scene">
        <div className="progress-glass">
          <span>Excel mapped</span>
          <strong>{coverage.ads}</strong>
          <small>ad rows</small>
          <svg viewBox="0 0 160 80" aria-hidden="true">
            <polyline points="4,70 34,58 62,62 92,36 126,42 156,16" />
          </svg>
        </div>
        <div className="cube-cluster">
          <div className="skill-block block-code">
            <Code2 size={30} />
            <strong>Web Development</strong>
          </div>
          <div className="skill-block block-data">
            <BarChart3 size={30} />
            <strong>Data Science</strong>
          </div>
          <div className="skill-block block-design">
            <PenTool size={30} />
            <strong>Product Design</strong>
          </div>
          <div className="skill-block block-growth">
            <Megaphone size={30} />
            <strong>Marketing Growth</strong>
          </div>
        </div>
        <div className="certificate-card">
          <Award size={24} />
          <span>{coverage.emails} campaign emails</span>
        </div>
        <div className="video-card">
          <PlayCircle size={42} fill="currentColor" />
          <span>{coverage.leads} leads</span>
        </div>
      </div>
    </div>
  );
}
