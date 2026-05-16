import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import { Course, CourseCategory, categories, courses } from "../data/courses";
import { getWorkbookCoverageStats, trackerSource } from "../data/salesTracker";
import { CourseCard } from "./CourseCard";

type CourseExplorerProps = {
  activeCategory: CourseCategory | "All";
  selectedCourse: Course;
  onCategoryChange: (category: CourseCategory | "All") => void;
  onCourseSelect: (course: Course) => void;
};

export function CourseExplorer({
  activeCategory,
  selectedCourse,
  onCategoryChange,
  onCourseSelect,
}: CourseExplorerProps) {
  const coverage = getWorkbookCoverageStats();
  const visibleCourses = useMemo(() => {
    if (activeCategory === "All") {
      return courses;
    }

    return courses.filter((course) => course.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="section course-section" id="courses">
      <div className="marketplace-shell">
        <aside className="filter-sidebar" aria-label="Find your course">
          <div className="sidebar-title">
            <strong>Find your course</strong>
            <button type="button">Clear all</button>
          </div>
          <label className="search-field">
            <input placeholder="Search topics or skills..." />
            <Search size={17} />
          </label>
          <FilterGroup title="Category" options={getOptionCounts(courses, "category")} />
          <FilterGroup title="Level" options={getOptionCounts(courses, "level")} />
          <div className="range-filter">
            <strong>Duration</strong>
            <div className="range-track"><span /></div>
            <small>{getDurationSummary(courses)}</small>
          </div>
          <FilterGroup title="Price" options={[{ label: "Paid", count: courses.filter((course) => course.price > 0).length }]} />
          <button className="apply-filters" type="button">Apply filters</button>
          <div className="source-card">
            <strong>Source</strong>
            <span>{trackerSource.workbookPath}</span>
            <small>{coverage.sheets} sheets mapped</small>
          </div>
        </aside>
        <div className="popular-area">
          <div className="popular-header">
            <h2>Popular courses</h2>
            <div className="popular-tools">
              <button type="button">See all</button>
              <SlidersHorizontal size={18} />
            </div>
          </div>
          <div className="filter-bar compact" aria-label="Course filters">
            {categories.map((category) => (
              <button
                className={category === activeCategory ? "is-active" : ""}
                key={category}
                onClick={() => onCategoryChange(category)}
                type="button"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="course-grid">
            {visibleCourses.map((course) => (
              <CourseCard
                course={course}
                isSelected={selectedCourse.id === course.id}
                key={course.id}
                onSelect={onCourseSelect}
              />
            ))}
          </div>
          <div className="tracker-row">
            <span>Mapped from {coverage.sourcePath}</span>
            <strong>{courses.length} courses</strong>
            <strong>{coverage.ads} ads</strong>
            <strong>{coverage.emails} emails</strong>
            <strong>{coverage.leads} leads</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, options }: { title: string; options: Array<{ label: string; count: number }> }) {
  return (
    <div className="filter-group">
      <strong>{title}</strong>
      {options.map((option) => (
        <label key={option.label}>
          <input type="checkbox" />
          <span>{option.label}</span>
          <small>{option.count}</small>
        </label>
      ))}
    </div>
  );
}

function getOptionCounts(list: Course[], key: "category" | "level") {
  return Array.from(
    list.reduce((counts, course) => {
      counts.set(course[key], (counts.get(course[key]) ?? 0) + 1);
      return counts;
    }, new Map<string, number>()),
    ([label, count]) => ({ label, count }),
  );
}

function getDurationSummary(list: Course[]) {
  const weekCounts = list
    .map((course) => Number.parseInt(course.duration, 10))
    .filter((duration) => Number.isFinite(duration));

  return `${Math.min(...weekCounts)} - ${Math.max(...weekCounts)} weeks`;
}
