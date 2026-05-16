import { Award, BarChart3, Code2, Megaphone, PenTool, PlayCircle } from "lucide-react";

export function ThreeDShowcase() {
  return (
    <div className="showcase" aria-label="CourseCraft learning preview">
      <div className="scene">
        <div className="progress-glass">
          <span>Your progress</span>
          <strong>68%</strong>
          <small>Keep going!</small>
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
          <span>Certificate of Completion</span>
        </div>
        <div className="video-card">
          <PlayCircle size={42} fill="currentColor" />
          <span>12:45</span>
        </div>
      </div>
    </div>
  );
}
