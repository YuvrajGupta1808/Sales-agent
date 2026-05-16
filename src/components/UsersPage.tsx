import { ArrowLeft, CalendarClock, CheckCircle2, FileSpreadsheet, Mail, Send, UserRoundCheck } from "lucide-react";
import { ReactNode } from "react";
import {
  campaignEmails,
  getEmailDashboardStats,
  outreachLeads,
  trackerSource,
} from "../data/salesTracker";

export function UsersPage() {
  const stats = getEmailDashboardStats();
  const upcomingEmails = campaignEmails
    .filter((email) => email.status !== "Ready")
    .slice(0, 5);
  const nextActions = outreachLeads.slice().sort((a, b) => a.lastTouch.localeCompare(b.lastTouch));

  return (
    <main className="users-page">
      <section className="users-hero">
        <div>
          <a className="back-link" href="/">
            <ArrowLeft size={17} /> Back to courses
          </a>
          <span>Email command center</span>
          <h1>Users and outreach status</h1>
          <p>
            A live working page mapped from the Excel tracker: campaign emails, outreach
            touches, what remains, and the next action for each lead.
          </p>
        </div>
        <div className="users-hero-card">
          <FileSpreadsheet size={24} />
          <strong>{stats.nextActions}</strong>
          <span>next actions waiting</span>
          <small>{trackerSource.workbookPath}</small>
        </div>
      </section>

      <section className="users-kpis" aria-label="Email summary">
        <KpiCard icon={<Send size={22} />} label="Email outreach contacts" value={stats.emailsTouched} />
        <KpiCard icon={<CheckCircle2 size={22} />} label="Campaign emails ready" value={stats.emailsReady} />
        <KpiCard icon={<Mail size={22} />} label="Campaign emails left" value={stats.emailsLeft} />
        <KpiCard icon={<UserRoundCheck size={22} />} label="Tracked outreach leads" value={stats.outreachLeadsTotal} />
      </section>

      <section className="users-grid">
        <article className="users-panel">
          <div className="users-panel-heading">
            <h2>What is left</h2>
            <span>{stats.campaignEmailsTotal} total campaign emails</span>
          </div>
          <div className="email-list">
            {upcomingEmails.length > 0 ? (
              upcomingEmails.map((email) => (
                <div className="email-row" key={email.id}>
                  <div>
                    <strong>{email.subjectLine}</strong>
                    <span>{email.sequence} · {email.audienceSegment}</span>
                  </div>
                  <time>{email.sendDate}</time>
                </div>
              ))
            ) : (
              <div className="empty-state">
                No email rows are currently present in {trackerSource.workbookPath}.
              </div>
            )}
          </div>
        </article>

        <article className="users-panel">
          <div className="users-panel-heading">
            <h2>Do next</h2>
            <span>prioritized by oldest touch</span>
          </div>
          <div className="action-list">
            {nextActions.length > 0 ? (
              nextActions.map((lead) => (
                <div className="action-row" key={lead.id}>
                  <div className="lead-avatar">{lead.name.slice(0, 2).toUpperCase()}</div>
                  <div>
                    <strong>{lead.name}</strong>
                    <span>{lead.role}, {lead.company}</span>
                    <p>{lead.nextAction}</p>
                  </div>
                  <span className={`stage-pill ${lead.stage.toLowerCase().replaceAll(" ", "-")}`}>
                    {lead.stage}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-state">
                Outreach has headers but no lead rows yet, so there are no next actions to show.
              </div>
            )}
          </div>
        </article>
      </section>

      <section className="timeline-panel">
        <div className="users-panel-heading">
          <h2>Send calendar</h2>
          <span>next campaign steps from Excel</span>
        </div>
        <div className="send-calendar">
          {campaignEmails.length > 0 ? (
            campaignEmails.map((email) => (
              <div key={email.id}>
                <CalendarClock size={18} />
                <time>{email.sendDate}</time>
                <strong>{email.subjectLine}</strong>
                <span>{email.status}</span>
              </div>
            ))
          ) : (
            <div className="empty-state wide">
              Add an Emails sheet or email rows to the marketing workbook to populate this calendar.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function KpiCard({ icon, label, value }: { icon: ReactNode; label: string; value: number }) {
  return (
    <article className="kpi-card">
      <div>{icon}</div>
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}
