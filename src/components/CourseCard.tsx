import { Clock3, Megaphone, Send } from "lucide-react";
import { CSSProperties } from "react";
import { Course } from "../data/courses";
import { getCourseMarketing } from "../data/salesTracker";
import { Button } from "./Button";

type CourseCardProps = {
  course: Course;
  isSelected: boolean;
  onSelect: (course: Course) => void;
};

export function CourseCard({ course, isSelected, onSelect }: CourseCardProps) {
  const Icon = course.icon;
  const marketing = getCourseMarketing(course.title);
  const activeAds = marketing.ads.filter((ad) => ad.status === "Active").length;

  return (
    <article className={`course-card ${isSelected ? "is-selected" : ""}`}>
      <div className="course-cover" style={{ background: course.accent }}>
        <div className="mini-cube" style={{ "--cube-color": course.color } as CSSProperties}>
          <Icon size={25} />
        </div>
        <span>{course.category}</span>
      </div>
      <div className="course-body">
        <div className="course-meta">
          <span>
            <Clock3 size={15} /> {course.duration}
          </span>
          <span>
            <Megaphone size={15} /> {marketing.ads.length} ads
          </span>
          <span>
            <Send size={15} /> {marketing.emails.length} emails
          </span>
        </div>
        <h3>{course.title} - Complete Guide</h3>
        <span className="instructor-name">CourseCraft Academy</span>
        <span className="campaign-chip">
          {activeAds} active campaign{activeAds === 1 ? "" : "s"}
        </span>
        <p>{course.outcome}</p>
        <div className="course-footer">
          <strong>${course.price}</strong>
          <Button variant={isSelected ? "secondary" : "primary"} onClick={() => onSelect(course)}>
            {isSelected ? "Selected" : "View course"}
          </Button>
        </div>
      </div>
    </article>
  );
}
