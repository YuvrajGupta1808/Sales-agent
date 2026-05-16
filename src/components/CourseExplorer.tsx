import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo } from "react";
import { Course, CourseCategory, categories, courses } from "../data/courses";
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
          <FilterGroup title="Category" options={["Development", "Data Science", "Design", "Marketing", "Business", "IT & Software"]} />
          <FilterGroup title="Level" options={["Beginner", "Intermediate", "Advanced"]} />
          <div className="range-filter">
            <strong>Duration</strong>
            <div className="range-track"><span /></div>
            <small>0 - 40+ hours</small>
          </div>
          <FilterGroup title="Price" options={["Free", "Paid"]} />
          <button className="apply-filters" type="button">Apply filters</button>
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
            {visibleCourses.slice(0, 4).map((course) => (
              <CourseCard
                course={course}
                isSelected={selectedCourse.id === course.id}
                key={course.id}
                onSelect={onCourseSelect}
              />
            ))}
          </div>
          <div className="trusted-row">
            <span>Trusted by professionals from</span>
            <strong>Google</strong>
            <strong>Microsoft</strong>
            <strong>amazon</strong>
            <strong>Meta</strong>
            <strong>IBM</strong>
            <strong>airbnb</strong>
            <strong>Spotify</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, options }: { title: string; options: string[] }) {
  return (
    <div className="filter-group">
      <strong>{title}</strong>
      {options.map((option, index) => (
        <label key={option}>
          <input type="checkbox" />
          <span>{option}</span>
          <small>{128 - index * 19}</small>
        </label>
      ))}
    </div>
  );
}
