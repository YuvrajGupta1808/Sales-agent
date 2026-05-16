import {
  ArrowLeft,
  BadgeDollarSign,
  Brain,
  CheckCircle2,
  FileSpreadsheet,
  Mail,
  Send,
  Sparkles,
  Users,
} from "lucide-react";
import { ReactNode, useMemo, useState } from "react";
import {
  buildCampaigns,
  Campaign,
  COURSE_SEGMENT_MAP,
  getDashboardStats,
  outreachLeads as initialLeads,
  OutreachLead,
  trackerSource,
} from "../data/salesTracker";

type SendStatus = {
  campaignId: string;
  sentTo: string[];
  at: string;
};

const formatUSD = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export function UsersPage() {
  const [leads, setLeads] = useState<OutreachLead[]>(initialLeads);
  const [lastSend, setLastSend] = useState<SendStatus | null>(null);
  const [thinkingFor, setThinkingFor] = useState<string | null>(null);

  const campaigns = useMemo(() => buildCampaigns(undefined, leads), [leads]);
  const stats = useMemo(() => getDashboardStats(campaigns), [campaigns]);

  const handleSend = (campaign: Campaign) => {
    const targets = campaign.leads.filter((l) => l.emailSent !== "Yes");
    if (targets.length === 0) return;
    const today = new Date().toISOString().slice(0, 10);
    setLeads((prev) =>
      prev.map((l) =>
        targets.find((t) => t.id === l.id)
          ? { ...l, emailSent: "Yes", sentDate: today, stage: l.stage === "Prospect" ? "Cold sent" : l.stage }
          : l,
      ),
    );
    setLastSend({
      campaignId: campaign.ad.id,
      sentTo: targets.map((t) => t.name),
      at: new Date().toLocaleTimeString(),
    });
  };

  return (
    <main className="users-page">
      <section className="users-hero">
        <div>
          <a className="back-link" href="/">
            <ArrowLeft size={17} /> Back to courses
          </a>
          <span>Campaign command center</span>
          <h1>Send the right ad to the right user.</h1>
          <p>
            Each campaign below pulls leads from <code>{trackerSource.workbookPath}</code> whose
            segment matches the course. Press <strong>Send</strong> to dispatch the ad to every
            unsent lead in that campaign.
          </p>
        </div>
        <div className="users-hero-card">
          <FileSpreadsheet size={24} />
          <strong>{stats.totalCampaigns}</strong>
          <span>campaigns live from xlsx</span>
          <small>updated {new Date(trackerSource.generatedAt).toLocaleString()}</small>
        </div>
      </section>

      <section className="users-kpis" aria-label="Campaign summary">
        <KpiCard icon={<Sparkles size={22} />} label="Active campaigns" value={stats.active} />
        <KpiCard icon={<Users size={22} />} label="Tracked leads" value={stats.totalLeads} />
        <KpiCard icon={<CheckCircle2 size={22} />} label="Emails sent" value={stats.sent} />
        <KpiCard
          icon={<BadgeDollarSign size={22} />}
          label="Total ad spend"
          value={stats.totalSpend}
          formatter={formatUSD}
        />
      </section>

      {lastSend && (
        <section className="send-banner">
          <Send size={18} />
          <span>
            Dispatched <strong>{lastSend.campaignId}</strong> to{" "}
            <strong>{lastSend.sentTo.length}</strong> lead{lastSend.sentTo.length === 1 ? "" : "s"} at{" "}
            {lastSend.at} — {lastSend.sentTo.slice(0, 4).join(", ")}
            {lastSend.sentTo.length > 4 ? "…" : ""}
          </span>
        </section>
      )}

      <section className="campaign-grid">
        {campaigns.map((c) => (
          <CampaignCard
            key={c.ad.id}
            campaign={c}
            onSend={() => handleSend(c)}
            thinkingOpen={thinkingFor === c.ad.id}
            onToggleThinking={() =>
              setThinkingFor((id) => (id === c.ad.id ? null : c.ad.id))
            }
          />
        ))}
      </section>
    </main>
  );
}

function CampaignCard({
  campaign,
  onSend,
  thinkingOpen,
  onToggleThinking,
}: {
  campaign: Campaign;
  onSend: () => void;
  thinkingOpen: boolean;
  onToggleThinking: () => void;
}) {
  const { ad, leads, rationale } = campaign;
  const unsentCount = leads.filter((l) => l.emailSent !== "Yes").length;
  const allowedSegments = COURSE_SEGMENT_MAP[ad.course] ?? [];

  return (
    <article className="campaign-card">
      <header className="campaign-head">
        <div>
          <span className={`status-pill ${ad.status.toLowerCase()}`}>{ad.status}</span>
          <span className="platform-tag">{ad.platform}</span>
          <span className="course-tag">{ad.course}</span>
        </div>
        <strong className="spend-tag">{formatUSD(ad.budget)}</strong>
      </header>

      <h2 className="campaign-headline">{ad.headline}</h2>
      <p className="campaign-copy">{ad.primaryText}</p>

      <dl className="campaign-meta">
        <div>
          <dt>Audience</dt>
          <dd>{ad.audience}</dd>
        </div>
        <div>
          <dt>Window</dt>
          <dd>
            {ad.startDate} → {ad.endDate}
          </dd>
        </div>
        <div>
          <dt>Spend / matched lead</dt>
          <dd>
            {leads.length > 0
              ? `${formatUSD(ad.budget / leads.length)}`
              : "—"}
          </dd>
        </div>
      </dl>

      <button className="thinking-toggle" type="button" onClick={onToggleThinking}>
        <Brain size={15} />
        {thinkingOpen ? "Hide reasoning" : "Why these leads?"}
      </button>
      {thinkingOpen && (
        <div className="thinking-box">
          <strong>Match logic</strong>
          <p>{rationale}</p>
          <ul>
            <li>
              Course: <code>{ad.course}</code>
            </li>
            <li>
              Allowed segments:{" "}
              {allowedSegments.length > 0
                ? allowedSegments.map((s) => <code key={s}>{s}</code>)
                : "none"}
            </li>
            <li>
              {leads.length} matched · {unsentCount} not yet sent
            </li>
          </ul>
        </div>
      )}

      <div className="campaign-leads">
        <div className="campaign-leads-head">
          <h3>
            Attached users <span>{leads.length}</span>
          </h3>
          <button
            type="button"
            className="send-btn"
            disabled={unsentCount === 0}
            onClick={onSend}
          >
            <Send size={14} />
            {unsentCount === 0
              ? "All sent"
              : `Send to ${unsentCount} ${unsentCount === 1 ? "lead" : "leads"}`}
          </button>
        </div>
        {leads.length === 0 ? (
          <div className="empty-state">
            No leads in the Outreach sheet match this course's segments yet.
          </div>
        ) : (
          <ul className="lead-list">
            {leads.map((l) => (
              <li key={l.id} className={l.emailSent === "Yes" ? "sent" : ""}>
                <div className="lead-avatar">{l.name.slice(0, 2).toUpperCase()}</div>
                <div className="lead-info">
                  <strong>{l.name}</strong>
                  <span>
                    {l.role}
                    {l.company ? ` · ${l.company}` : ""}
                  </span>
                </div>
                <div className="lead-state">
                  {l.emailSent === "Yes" ? (
                    <span className="sent-pill">
                      <Mail size={12} /> sent {l.sentDate}
                    </span>
                  ) : (
                    <span className="pending-pill">pending</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}

function KpiCard({
  icon,
  label,
  value,
  formatter,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  formatter?: (n: number) => string;
}) {
  return (
    <article className="kpi-card">
      <div>{icon}</div>
      <strong>{formatter ? formatter(value) : value}</strong>
      <span>{label}</span>
    </article>
  );
}
