export type AdStatus = "Active" | "Draft";
export type EmailStatus = "Ready" | "Draft";
export type OutreachStage = "Replied" | "Cold sent" | "Booked call" | "No reply" | "Negotiating";

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
  channel: string;
  contact: string;
  linkedIn: string;
  lastTouch: string;
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
    notes: "Pair with Sahil Lavingia-style audience.",
  },
  {
    id: "AD-003",
    course: "Visual Systems for Web",
    platform: "Instagram",
    campaign: "Q2-Design",
    headline: "Looks clean != converts.",
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
    notes: "High intent - push to free module first.",
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
    audience: "Frontend devs, 25-40, viewers of Theo/Fireship",
    budget: 1800,
    status: "Draft",
    startDate: "2026-06-01",
    endDate: "2026-07-15",
    notes: "15s + 30s cuts.",
  },
];

export const campaignEmails: CampaignEmail[] = [
  {
    id: "EM-001",
    sequence: "Welcome",
    step: 1,
    course: "Platform-wide",
    audienceSegment: "New signups",
    subjectLine: "Welcome to the studio.",
    previewText: "Here's how to pick your first course in under 2 minutes.",
    bodyPreview:
      "Hey {{first_name}}, glad you're in. The fastest path: take the 60-second quiz, get matched to a cohort, start week one this Sunday...",
    cta: "Take the quiz",
    sendDate: "2026-05-20",
    status: "Ready",
    owner: "Ara",
  },
  {
    id: "EM-002",
    sequence: "Welcome",
    step: 2,
    course: "Platform-wide",
    audienceSegment: "New signups (no quiz)",
    subjectLine: "Two questions, one cohort.",
    previewText: "Pick the outcome - we'll handle the path.",
    bodyPreview:
      "If you tell me whether your next 90 days are about shipping, designing, or selling, I can narrow six courses down to one in this email...",
    cta: "Choose your path",
    sendDate: "2026-05-22",
    status: "Draft",
    owner: "Ara",
  },
  {
    id: "EM-003",
    sequence: "Nurture - AI",
    step: 1,
    course: "AI Product Strategy",
    audienceSegment: "AI/PM list",
    subjectLine: "Your AI feature has no eval loop.",
    previewText: "Most teams ship on vibes. Here's the fix.",
    bodyPreview:
      "Last cohort, 71% of students said the eval module was the part that paid for the course. Here's why...",
    cta: "See the syllabus",
    sendDate: "2026-05-24",
    status: "Draft",
    owner: "Ara",
  },
  {
    id: "EM-004",
    sequence: "Nurture - AI",
    step: 2,
    course: "AI Product Strategy",
    audienceSegment: "AI/PM list",
    subjectLine: "What a real eval harness looks like",
    previewText: "Free teardown attached.",
    bodyPreview:
      "Pulling one exercise from week 3 - a starter eval harness for an LLM feature. Reply if you want feedback on yours...",
    cta: "Download the teardown",
    sendDate: "2026-05-28",
    status: "Draft",
    owner: "Ara",
  },
  {
    id: "EM-005",
    sequence: "Nurture - Design",
    step: 1,
    course: "Visual Systems for Web",
    audienceSegment: "Designer list",
    subjectLine: "Why your portfolio is leaking money",
    previewText: "The teardown that fixes it.",
    bodyPreview:
      "Three patterns I see in 80% of designer portfolios that submit to the cohort. Each one is costing you a tier of clients...",
    cta: "Read the breakdown",
    sendDate: "2026-05-26",
    status: "Draft",
    owner: "Ara",
  },
  {
    id: "EM-006",
    sequence: "Launch - Cohort",
    step: 1,
    course: "Multi",
    audienceSegment: "Warm leads",
    subjectLine: "Doors open Sunday.",
    previewText: "6 cohorts, 1 platform, finite seats.",
    bodyPreview: "Sunday at 9am PT, summer cohorts open. Here's what's running and how to choose...",
    cta: "Reserve a seat",
    sendDate: "2026-06-01",
    status: "Draft",
    owner: "Ara",
  },
  {
    id: "EM-007",
    sequence: "Launch - Cohort",
    step: 2,
    course: "Multi",
    audienceSegment: "Warm leads (opened EM-006)",
    subjectLine: "Last 48h - 9 seats left across cohorts",
    previewText: "Real number, not a fake countdown.",
    bodyPreview:
      "Quick update on remaining capacity per cohort, and what to pick if you're stuck between two...",
    cta: "Grab your seat",
    sendDate: "2026-06-05",
    status: "Draft",
    owner: "Ara",
  },
];

export const outreachLeads: OutreachLead[] = [
  {
    id: "OR-001",
    name: "Priya Shah",
    role: "Head of Product",
    company: "Lumen Health",
    segment: "AI / PM",
    channel: "Email",
    contact: "priya@lumenhealth.io",
    linkedIn: "linkedin.com/in/priyashah",
    lastTouch: "2026-05-12",
    stage: "Replied",
    owner: "Ara",
    nextAction: "Send AI Product Strategy syllabus + 1:1 invite",
    notes: "Asked about eval module - strong fit.",
  },
  {
    id: "OR-002",
    name: "Marcus Lee",
    role: "Founding Engineer",
    company: "Stack Drift",
    segment: "AI / Eng",
    channel: "LinkedIn DM",
    contact: "-",
    linkedIn: "linkedin.com/in/marcuslee",
    lastTouch: "2026-05-10",
    stage: "Cold sent",
    owner: "Ara",
    nextAction: "Follow up in 4 days",
    notes: "Posted about RAG evals last week - relevant angle.",
  },
  {
    id: "OR-003",
    name: "Sofia Romero",
    role: "Senior Designer",
    company: "Frame Studio",
    segment: "Design",
    channel: "Email",
    contact: "sofia@framestudio.co",
    linkedIn: "linkedin.com/in/sofiaromero",
    lastTouch: "2026-05-14",
    stage: "Booked call",
    owner: "Ara",
    nextAction: "Prep teardown of her portfolio",
    notes: "Wants to move into design lead role.",
  },
  {
    id: "OR-004",
    name: "James O'Connor",
    role: "Design Lead",
    company: "North Lane",
    segment: "Design",
    channel: "Email",
    contact: "james@northlane.com",
    linkedIn: "linkedin.com/in/jamesoconnor",
    lastTouch: "2026-05-09",
    stage: "No reply",
    owner: "Ara",
    nextAction: "Bump with portfolio teardown sample",
    notes: "Opened 3x, no click.",
  },
  {
    id: "OR-005",
    name: "Aditi Verma",
    role: "Data Analyst",
    company: "Beacon Retail",
    segment: "Data",
    channel: "Email",
    contact: "aditi.v@beaconretail.com",
    linkedIn: "linkedin.com/in/aditiverma",
    lastTouch: "2026-05-13",
    stage: "Replied",
    owner: "Ara",
    nextAction: "Send free SQL patterns module",
    notes: "Asked if course covers exec dashboards - yes.",
  },
  {
    id: "OR-006",
    name: "Tobi Adeyemi",
    role: "Growth Marketer",
    company: "Helix Co",
    segment: "Marketing",
    channel: "Twitter DM",
    contact: "@tobi_grows",
    linkedIn: "linkedin.com/in/tobiadeyemi",
    lastTouch: "2026-05-11",
    stage: "Cold sent",
    owner: "Ara",
    nextAction: "Wait for reply, follow up 2026-05-18",
    notes: "Engaged with launch copy thread.",
  },
  {
    id: "OR-007",
    name: "Rachel Chen",
    role: "Indie Founder",
    company: "Quill (solo)",
    segment: "Marketing / Creator",
    channel: "Email",
    contact: "rachel@quill.so",
    linkedIn: "linkedin.com/in/rachelchen",
    lastTouch: "2026-05-15",
    stage: "Negotiating",
    owner: "Ara",
    nextAction: "Send team-of-1 discount code",
    notes: "Wants both Launch Copy + Creator Kit.",
  },
];

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
  const emailChannelTouches = outreachLeads.filter((lead) => lead.channel === "Email");
  const needsAction = outreachLeads.filter((lead) =>
    ["Replied", "Booked call", "No reply", "Negotiating"].includes(lead.stage),
  );

  return {
    campaignEmailsTotal: campaignEmails.length,
    emailsReady: readyEmails.length,
    emailsLeft: draftEmails.length,
    emailsTouched: emailChannelTouches.length,
    outreachLeadsTotal: outreachLeads.length,
    nextActions: needsAction.length,
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
