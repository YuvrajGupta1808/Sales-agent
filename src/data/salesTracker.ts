export type AdStatus = "Active" | "Draft";
export type EmailStatus = "Ready" | "Draft";
export type OutreachStage =
  | "Prospect"
  | "Replied"
  | "Cold sent"
  | "Booked call"
  | "No reply"
  | "Negotiating";

export type CourseAd = {
  id: string;
  course: string;
  platform: string;
  campaign: string;
  headline: string;
  primaryText: string;
  cta: string;
  audience: string;
  budget: number;
  status: AdStatus;
  startDate: string;
  endDate: string;
  notes: string;
};

export type CampaignEmail = {
  id: string;
  sequence: string;
  step: number;
  course: string;
  audienceSegment: string;
  subjectLine: string;
  previewText: string;
  bodyPreview: string;
  cta: string;
  sendDate: string;
  status: EmailStatus;
  owner: string;
};

export type OutreachLead = {
  id: string;
  name: string;
  role: string;
  company: string;
  segment: string;
  source: string;
  email?: string;
  linkedIn: string;
  xTwitter?: string;
  emailSent: "Yes" | "No";
  sentDate?: string;
  lastTouch?: string;
  stage: OutreachStage;
  owner: string;
  nextAction: string;
  notes: string;
};

export const courseAds: CourseAd[] = [
  {
    id: "AD-001",
    course: "AI Product Strategy",
    platform: "LinkedIn",
    campaign: "Q2-AI-PM",
    headline: "Stop shipping AI features on vibes.",
    primaryText:
      "Six weeks. Evals, prompt systems, launch review. Built for PMs and founders shipping real AI products.",
    cta: "Enroll Now",
    audience: "Senior PMs, Founders, AI Engineers (US/UK/CA)",
    budget: 1500,
    status: "Draft",
    startDate: "2026-05-20",
    endDate: "2026-06-30",
    notes: "Test 2 creatives; emphasize eval harness.",
  },
  {
    id: "AD-002",
    course: "AI Product Strategy",
    platform: "X/Twitter",
    campaign: "Q2-AI-PM",
    headline: "Your AI feature has no eval loop.",
    primaryText: "6 weeks to fix that. Real evals, prompt systems, launch review.",
    cta: "Learn More",
    audience: "AI builder Twitter, PM/Founder lists",
    budget: 600,
    status: "Draft",
    startDate: "2026-05-20",
    endDate: "2026-06-15",
    notes: "Pair with builder-focused audience.",
  },
  {
    id: "AD-003",
    course: "Visual Systems for Web",
    platform: "Instagram",
    campaign: "Q2-Design",
    headline: "Looks clean ≠ converts.",
    primaryText: "5 weeks. Hierarchy, type systems, component polish, portfolio teardown.",
    cta: "Apply Now",
    audience: "Freelance designers, agency mid-level (worldwide)",
    budget: 900,
    status: "Active",
    startDate: "2026-05-10",
    endDate: "2026-06-10",
    notes: "Carousel performs best per past data.",
  },
  {
    id: "AD-004",
    course: "Visual Systems for Web",
    platform: "LinkedIn",
    campaign: "Q2-Design",
    headline: "Your portfolio is leaking money.",
    primaryText: "We do a live teardown in week 5. It stings. Worth it.",
    cta: "Enroll Now",
    audience: "Mid-senior designers, design leads",
    budget: 800,
    status: "Draft",
    startDate: "2026-05-22",
    endDate: "2026-06-22",
    notes: "Lean into the teardown hook.",
  },
  {
    id: "AD-005",
    course: "Analytics That Sell",
    platform: "Google Search",
    campaign: "Q2-Data",
    headline: "Dashboards that move decisions",
    primaryText: "Learn metric trees, SQL patterns, and story charts in 4 weeks.",
    cta: "Start Free Module",
    audience: "Keywords: data analyst course, sql dashboards",
    budget: 1200,
    status: "Active",
    startDate: "2026-05-01",
    endDate: "2026-07-01",
    notes: "High intent — push to free module first.",
  },
  {
    id: "AD-006",
    course: "Launch Copy Studio",
    platform: "Meta (FB/IG)",
    campaign: "Q2-Marketing",
    headline: "Stop writing 'we help teams scale.'",
    primaryText: "3 weeks. Offer shape, landing copy, email arcs, ad testing.",
    cta: "Get Started",
    audience: "Indie founders, marketers (US/EU)",
    budget: 700,
    status: "Draft",
    startDate: "2026-05-25",
    endDate: "2026-06-25",
    notes: "Use creator-style UGC video.",
  },
  {
    id: "AD-007",
    course: "React Interface Lab",
    platform: "YouTube Pre-roll",
    campaign: "Q2-Code",
    headline: "The screens that feel expensive aren't accidents.",
    primaryText: "8 weeks of state, motion, design tokens, QA workflow.",
    cta: "Enroll Now",
    audience: "Frontend devs, 25-40, dev-content viewers",
    budget: 1800,
    status: "Draft",
    startDate: "2026-06-01",
    endDate: "2026-07-15",
    notes: "15s + 30s cuts.",
  },
  {
    id: "AD-008",
    course: "Creator Business Kit",
    platform: "TikTok",
    campaign: "Q2-Creator",
    headline: "An audience without an offer is volunteer work.",
    primaryText: "4 weeks to build one paid offer that works.",
    cta: "Apply Now",
    audience: "Creators 1k-50k followers, coaches",
    budget: 500,
    status: "Draft",
    startDate: "2026-05-28",
    endDate: "2026-06-28",
    notes: "Founder-led short-form.",
  },
];

export const campaignEmails: CampaignEmail[] = [];

export const outreachLeads: OutreachLead[] = [
  {
    id: "OR-001",
    name: "Diego Granados",
    role: "Senior AI Product Manager",
    company: "Google",
    segment: "AI / PM",
    source: "Public LinkedIn",
    linkedIn: "https://www.linkedin.com/in/diegogranadosh/",
    emailSent: "No",
    stage: "Prospect",
    owner: "Ara",
    nextAction: "Send AI Product Strategy syllabus + eval module teaser",
    notes: "Wiley author on AI PM. Posts about AI evals. Strong fit for AI Product Strategy.",
  },
  {
    id: "OR-002",
    name: "Lianna Patch",
    role: "Founder / Conversion Copywriter",
    company: "Punchline Copy",
    segment: "Marketing",
    source: "Public LinkedIn",
    linkedIn: "https://www.linkedin.com/in/liannapatch",
    emailSent: "No",
    stage: "Prospect",
    owner: "Ara",
    nextAction: "Send Launch Copy Studio offer-shape preview",
    notes: "Spoke at MicroConf US on emotion in copy. Possible partner, not just student.",
  },
  {
    id: "OR-003",
    name: "Justin Welsh",
    role: "Solopreneur / Newsletter Operator",
    company: "The Saturday Solopreneur",
    segment: "Creator",
    source: "Public LinkedIn",
    linkedIn: "https://www.linkedin.com/in/justinwelsh/",
    emailSent: "No",
    stage: "Prospect",
    owner: "Ara",
    nextAction: "Pitch cross-promo for Creator Business Kit",
    notes: "175k+ newsletter subs. Best fit as affiliate / cross-promo, not direct student.",
  },
  {
    id: "OR-004",
    name: "Alex Freberg",
    role: "Founder / Educator",
    company: "AnalystBuilder.com",
    segment: "Data",
    source: "Public LinkedIn",
    linkedIn: "https://www.linkedin.com/in/alex-freberg/",
    emailSent: "No",
    stage: "Prospect",
    owner: "Ara",
    nextAction: "Pitch Analytics That Sell as complementary cohort",
    notes: "Runs popular YouTube on data analysis. Audience overlap with Analytics That Sell.",
  },
];

export const trackerSource = {
  workbookPath: "marketing/sales-tracker.xlsx",
  coursePostsPath: "marketing/course-posts.md",
  sheets: ["Ads", "Outreach"],
};

export function getCourseMarketing(courseTitle: string) {
  return {
    ads: courseAds.filter((ad) => ad.course === courseTitle),
    emails: campaignEmails.filter((email) => email.course === courseTitle),
    leads: outreachLeads.filter((lead) => courseMatchesLead(courseTitle, lead.segment)),
  };
}

export function getEmailDashboardStats() {
  const readyEmails = campaignEmails.filter((email) => email.status === "Ready");
  const draftEmails = campaignEmails.filter((email) => email.status === "Draft");
  const sentOutreachEmails = outreachLeads.filter((lead) => lead.emailSent === "Yes");
  const needsAction = outreachLeads.filter((lead) => lead.nextAction.trim().length > 0);

  return {
    campaignEmailsTotal: campaignEmails.length,
    emailsReady: readyEmails.length,
    emailsLeft: draftEmails.length,
    emailsTouched: sentOutreachEmails.length,
    outreachLeadsTotal: outreachLeads.length,
    nextActions: needsAction.length,
  };
}

export function getWorkbookCoverageStats() {
  const courseNames = new Set([
    ...courseAds.map((ad) => ad.course),
    ...campaignEmails
      .filter((email) => !["Platform-wide", "Multi"].includes(email.course))
      .map((email) => email.course),
  ]);

  return {
    sourcePath: trackerSource.workbookPath,
    sheets: trackerSource.sheets.length,
    coursesWithCampaigns: courseNames.size,
    ads: courseAds.length,
    activeAds: courseAds.filter((ad) => ad.status === "Active").length,
    emails: campaignEmails.length,
    readyEmails: campaignEmails.filter((email) => email.status === "Ready").length,
    leads: outreachLeads.length,
  };
}

function courseMatchesLead(courseTitle: string, segment: string) {
  const normalized = `${courseTitle} ${segment}`.toLowerCase();

  if (courseTitle.includes("AI")) {
    return normalized.includes("ai");
  }

  if (courseTitle.includes("Visual")) {
    return normalized.includes("design");
  }

  if (courseTitle.includes("Analytics")) {
    return normalized.includes("data");
  }

  if (courseTitle.includes("Launch")) {
    return normalized.includes("marketing");
  }

  if (courseTitle.includes("Creator")) {
    return normalized.includes("creator");
  }

  return normalized.includes(courseTitle.toLowerCase());
}
