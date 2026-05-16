import { learningPath } from "../data/courses";

export function LearningPath() {
  return (
    <section className="section path-section" id="paths">
      <div className="section-heading">
        <h2>A path that feels active from day one</h2>
        <p>Every purchase includes structured milestones, critique prompts, and visible progress.</p>
      </div>
      <div className="path-layout">
        <div className="timeline">
          {learningPath.map((step) => (
            <div className="timeline-row" key={step.label}>
              <div className="timeline-dot" />
              <div>
                <strong>{step.label}</strong>
                <span>{step.detail}</span>
              </div>
              <div className="progress-track" aria-label={`${step.label} ${step.progress}%`}>
                <span style={{ width: `${step.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
        <div className="assignment-board">
          <div className="board-top">
            <span>Project room</span>
            <strong>Launch audit checklist</strong>
          </div>
          <div className="kanban-row">
            <span>Research notes</span>
            <strong>12</strong>
          </div>
          <div className="kanban-row">
            <span>Drafts reviewed</span>
            <strong>4</strong>
          </div>
          <div className="kanban-row">
            <span>Mentor comments</span>
            <strong>27</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
