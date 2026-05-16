import { ArrowRight, Award, BookOpen, Laptop } from "lucide-react";
import { Button } from "./Button";

export function Community() {
  return (
    <section className="section community-section" id="community">
      <div className="career-banner">
        <div className="banner-objects" aria-hidden="true">
          <BookOpen size={56} />
          <Award size={58} />
          <Laptop size={58} />
        </div>
        <div>
          <h2>Ready to level up your career?</h2>
          <p>Join thousands of professionals learning in-demand skills.</p>
        </div>
        <div className="banner-actions">
          <Button>
            Enroll now <ArrowRight size={18} />
          </Button>
          <Button variant="secondary">View all courses</Button>
        </div>
      </div>
    </section>
  );
}
