import { CheckCircle2, Clock3, Layers3, Megaphone, Play, Send, Users } from "lucide-react";
import { Course } from "../data/courses";
import { getCourseMarketing } from "../data/salesTracker";
import { Button } from "./Button";

type CourseDetailProps = {
  course: Course;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onEnroll: () => void;
};

const tabs = ["Overview", "Curriculum", "Reviews"];

export function CourseDetail({ course, activeTab, onTabChange, onEnroll }: CourseDetailProps) {
  const Icon = course.icon;
  const marketing = getCourseMarketing(course.title);
  const primaryAd = marketing.ads[0];
  const primaryEmail = marketing.emails[0];

  return (
    <section className="section detail-section">
      <div className="detail-panel">
        <div className="detail-copy">
          <div className="breadcrumb">Development <span>›</span> {course.category} <span>›</span> {course.title}</div>
          <strong className="bestseller">Bestseller</strong>
          <h2>{course.title} - The Complete Guide</h2>
          <p>{primaryAd?.primaryText ?? course.outcome} Learn with practical projects, field notes, and performance tips.</p>
          <div className="detail-stats">
            <span>
              <Megaphone size={16} /> {marketing.ads.length} campaign ads
            </span>
            <span>
              <Send size={16} /> {marketing.emails.length} mapped emails
            </span>
            <span>
              <Clock3 size={16} /> {course.duration}
            </span>
          </div>
          <div className="instructor-strip">
            <div className="avatar">CC</div>
            <div>
              <strong>CourseCraft Academy</strong>
              <span>Senior instructors and industry reviewers</span>
            </div>
          </div>
          <div className="marketing-strip">
            <span>{primaryAd?.platform ?? "CourseCraft"} campaign</span>
            <strong>{primaryAd?.headline ?? "Course launch sequence ready"}</strong>
            <small>{primaryEmail?.subjectLine ?? "Launch email not mapped yet"}</small>
          </div>
        </div>
        <div className="detail-media" style={{ background: course.accent }}>
          <div className="preview-screen">
            <div className="preview-header">
              <span />
              <span />
              <span />
            </div>
            <Icon size={78} />
            <div className="preview-play">
              <Play size={34} fill="currentColor" />
            </div>
          </div>
        </div>
        <aside className="purchase-card">
          <div className="purchase-tabs">
            <button className="is-active" type="button">Personal</button>
            <button type="button">Teams</button>
          </div>
          <strong>${course.price}<span> $129</span></strong>
          <Button onClick={onEnroll}>Enroll now</Button>
          <Button variant="secondary" onClick={onEnroll}>Add to cart</Button>
          <small>30-day money-back guarantee</small>
        </aside>
      </div>
      <div className="course-tabs-area">
        <div className="tabs" role="tablist" aria-label="Course details">
          {tabs.map((tab) => (
            <button
              aria-selected={activeTab === tab}
              className={activeTab === tab ? "is-active" : ""}
              key={tab}
              onClick={() => onTabChange(tab)}
              role="tab"
              type="button"
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="course-content-grid">
          <div className="module-list">
            {course.modules.concat(["Testing and polish", "Deployment"]).map((module) => (
              <div key={module}>
                <CheckCircle2 size={18} />
                <span>{module}</span>
              </div>
            ))}
          </div>
          <div className="includes-card">
            <h3>This course includes</h3>
            <p><Layers3 size={16} /> {course.modules.length + 4} studio lessons</p>
            <p><Clock3 size={16} /> Lifetime access</p>
            <p><CheckCircle2 size={16} /> Certificate of completion</p>
            <p><Users size={16} /> {marketing.leads.length} mapped outreach leads</p>
          </div>
        </div>
      </div>
    </section>
  );
}
