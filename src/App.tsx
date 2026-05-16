import { useState } from "react";
import { Community } from "./components/Community";
import { CourseDetail } from "./components/CourseDetail";
import { CourseExplorer } from "./components/CourseExplorer";
import { EnrollToast } from "./components/EnrollToast";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { LearningPath } from "./components/LearningPath";
import { Pricing } from "./components/Pricing";
import { UsersPage } from "./components/UsersPage";
import { Course, CourseCategory, courses } from "./data/courses";

export function App() {
  const isUsersPage = window.location.pathname === "/users";
  const [activeCategory, setActiveCategory] = useState<CourseCategory | "All">("All");
  const [selectedCourse, setSelectedCourse] = useState<Course>(courses[0]);
  const [activeTab, setActiveTab] = useState("Overview");
  const [isAnnual, setIsAnnual] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const handleEnroll = () => {
    setCartCount((count) => count + 1);
    setShowToast(true);
  };

  return (
    <>
      <Header cartCount={cartCount} isUsersPage={isUsersPage} />
      {isUsersPage ? (
        <UsersPage />
      ) : (
        <main>
          <Hero />
          <CourseExplorer
            activeCategory={activeCategory}
            selectedCourse={selectedCourse}
            onCategoryChange={setActiveCategory}
            onCourseSelect={setSelectedCourse}
          />
          <CourseDetail
            activeTab={activeTab}
            course={selectedCourse}
            onEnroll={handleEnroll}
            onTabChange={setActiveTab}
          />
          <LearningPath />
          <Pricing
            isAnnual={isAnnual}
            onEnroll={handleEnroll}
            onToggleBilling={() => setIsAnnual((value) => !value)}
          />
          <Community />
        </main>
      )}
      <EnrollToast visible={showToast} onClose={() => setShowToast(false)} />
    </>
  );
}
