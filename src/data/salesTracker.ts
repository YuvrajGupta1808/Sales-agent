import snapshot from "./trackerSnapshot.json";

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
  status: "Active" | "Draft" | string;
  startDate: string;
  endDate: string;
  notes: string;
};

export type OutreachLead = {
  id: string;
  name: string;
  role: string;
  company: string;
  segment: string;
  source: string;
  email: string;
  linkedIn: string;
  twitter: string;
  emailSent: "Yes" | "No" | string;
  sentDate: string;
  lastTouch: string;
  stage: string;
  owner: string;
  nextAction: string;
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
  status: "Ready" | "Draft" | string;
  owner: string;
};

export type TrackerSnapshot = {
  ads: CourseAd[];
  outreach: OutreachLead[];
  sheets: string[];
  generatedAt: string;
  missing?: boolean;
};

const data = snapshot as TrackerSnapshot;

export const courseAds: CourseAd[] = data.ads ?? [];
export const outreachLeads: OutreachLead[] = data.outreach ?? [];
export const campaignEmails: CampaignEmail[] = [];

export const trackerSource = {
  workbookPath: "marketing/sales-tracker.xlsx",
  coursePostsPath: "marketing/course-posts.md",
  generatedAt: data.generatedAt,
  sheets: data.sheets ?? [],
};

// Maps course title → list of segment labels that count as a match.
// Keeps matching logic transparent and explainable (used by the "thinking" UI).
export const COURSE_SEGMENT_MAP: Record<string, string[]> = {
  "AI Product Strategy": ["AI / PM", "AI", "AI / Eng"],
  "Visual Systems for Web": ["Design"],
  "Analytics That Sell": ["Data", "Data / Analytics"],
  "Launch Copy Studio": ["Marketing", "Marketing / AI"],
  "React Interface Lab": ["Code", "Engineering"],
  "Creator Business Kit": ["Creator", "Marketing / Creator", "Creator / Marketing"],
};

export function matchesCourse(course: string, segment: string): boolean {
  const allowed = COURSE_SEGMENT_MAP[course] ?? [];
  return allowed.some(
    (s) => segment.toLowerCase().trim() === s.toLowerCase().trim(),
  );
}

export type Campaign = {
  ad: CourseAd;
  leads: OutreachLead[];
  rationale: string;
  spendPerLead: number;
};

export function buildCampaigns(
  ads: CourseAd[] = courseAds,
  leads: OutreachLead[] = outreachLeads,
): Campaign[] {
  return ads.map((ad) => {
    const matched = leads.filter((l) => matchesCourse(ad.course, l.segment));
    const allowed = COURSE_SEGMENT_MAP[ad.course] ?? [];
    const rationale =
      allowed.length === 0
        ? `No segment mapping defined for "${ad.course}" yet.`
        : `Matched leads whose Segment is one of: ${allowed.join(", ")}. ` +
          `${matched.length} of ${leads.length} leads qualify for this campaign.`;
    return {
      ad,
      leads: matched,
      rationale,
      spendPerLead: matched.length > 0 ? ad.budget / matched.length : 0,
    };
  });
}

export function getDashboardStats(campaigns: Campaign[]) {
  const totalSpend = campaigns.reduce((sum, c) => sum + (c.ad.budget || 0), 0);
  const totalLeads = outreachLeads.length;
  const sent = outreachLeads.filter((l) => l.emailSent === "Yes").length;
  const active = campaigns.filter((c) => c.ad.status === "Active").length;
  return { totalSpend, totalLeads, sent, unsent: totalLeads - sent, active, totalCampaigns: campaigns.length };
}

export function getCourseMarketing(courseTitle: string) {
  return {
    ads: courseAds.filter((ad) => ad.course === courseTitle),
    emails: campaignEmails.filter((email) => email.course === courseTitle),
    leads: outreachLeads.filter((lead) => matchesCourse(courseTitle, lead.segment)),
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
  const courseNames = new Set(courseAds.map((ad) => ad.course));

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
