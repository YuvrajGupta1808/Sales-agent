# Context For CourseCraft Sales Agent

This file is the operating context for humans and AI agents working in this repo. It explains the product, data model, current workbook state, frontend surfaces, and the intended future API.

## Business Context

CourseCraft is a fictional premium online course marketplace. The business sells cohort-style courses to builders: product managers, designers, analysts, marketers, frontend engineers, and creators.

The sales motion combines:

- Paid ads by course and platform.
- Organic social copy in markdown.
- Outreach tracking in a workbook.
- A storefront and users dashboard in React.

The repo’s purpose is to make this workflow feel real enough for agent testing without requiring a production backend.

## Source Of Truth

Current source file:

```text
marketing/sales-tracker.xlsx
```

Current workbook sheets:

| Sheet | Current rows | Notes |
| --- | ---: | --- |
| `Ads` | 8 | Active source for course campaign data. |
| `Outreach` | 0 lead rows | Headers exist, but no users/leads are currently populated. |

There is no `Emails` sheet in the current workbook. Any UI or agent response must treat campaign email data as absent unless a sheet is added later.

## Current Courses

Defined in `src/data/courses.ts`.

| Course | Category | Duration | Level | Price |
| --- | --- | --- | --- | --- |
| AI Product Strategy | AI | 6 weeks | Advanced | $249 |
| Visual Systems for Web | Design | 5 weeks | Intermediate | $189 |
| Analytics That Sell | Data | 4 weeks | Beginner | $139 |
| Launch Copy Studio | Marketing | 3 weeks | Intermediate | $119 |
| React Interface Lab | Code | 8 weeks | Advanced | $279 |
| Creator Business Kit | Creator | 4 weeks | Beginner | $99 |

All courses should be shown in the UI. Do not truncate the course list to only the first four courses.

## Ads Data Contract

Mirrored in `src/data/salesTracker.ts` as `CourseAd`.

| Field | Meaning |
| --- | --- |
| `id` | Workbook ad ID, such as `AD-001`. |
| `course` | Course title. Must match a course in `courses.ts`. |
| `platform` | Paid channel: LinkedIn, X/Twitter, Instagram, Google Search, Meta, YouTube, TikTok. |
| `campaign` | Campaign identifier such as `Q2-AI-PM`. |
| `headline` | Primary paid creative headline. |
| `primaryText` | Main ad body text. |
| `cta` | Call to action. |
| `audience` | Target audience description. |
| `budget` | Budget in USD. |
| `status` | `Active` or `Draft`. |
| `startDate` | Campaign start date. |
| `endDate` | Campaign end date. |
| `notes` | Operator notes. |

Current ad rows:

| ID | Course | Platform | Status |
| --- | --- | --- | --- |
| AD-001 | AI Product Strategy | LinkedIn | Draft |
| AD-002 | AI Product Strategy | X/Twitter | Draft |
| AD-003 | Visual Systems for Web | Instagram | Active |
| AD-004 | Visual Systems for Web | LinkedIn | Draft |
| AD-005 | Analytics That Sell | Google Search | Active |
| AD-006 | Launch Copy Studio | Meta (FB/IG) | Draft |
| AD-007 | React Interface Lab | YouTube Pre-roll | Draft |
| AD-008 | Creator Business Kit | TikTok | Draft |

## UI Data Mirror

The frontend currently reads typed local data rather than parsing Excel at runtime:

```text
src/data/salesTracker.ts
```

Important exports:

- `courseAds`: current ad rows from `Ads`.
- `campaignEmails`: currently `[]` because no `Emails` sheet exists.
- `outreachLeads`: currently `[]` because `Outreach` has no lead rows.
- `trackerSource`: workbook path and sheet names.
- `getCourseMarketing(courseTitle)`: maps a course to related ads/emails/leads.
- `getEmailDashboardStats()`: produces `/users` KPI values.
- `getWorkbookCoverageStats()`: produces marketplace summary counts.

## UI Surfaces

### Storefront `/`

Key components:

| Component | Purpose |
| --- | --- |
| `Header.tsx` | Main nav. Links work from both `/` and `/users`. |
| `Hero.tsx` | Brand opening and workbook source hint. |
| `CourseExplorer.tsx` | Shows all courses and workbook coverage. |
| `CourseCard.tsx` | Shows course info and real ad/email counts. |
| `CourseDetail.tsx` | Shows selected course and primary campaign positioning. |
| `Pricing.tsx` | Uses workbook-derived counts, not fake reviews. |
| `Community.tsx` | Final CTA section. |

### Users Page `/users`

Key component:

```text
src/components/UsersPage.tsx
```

Current behavior:

- Shows workbook source path.
- Shows current counts from `salesTracker.ts`.
- Shows empty state for campaign emails because no email data exists.
- Shows empty state for outreach because no lead rows exist.
- Includes a “Back to courses” link and global nav links back to all main storefront sections.

## Navigation Rules

When on `/users`, anchor links must route back to the storefront:

```text
/               home
/#courses       course marketplace
/#paths         learning path
/#pricing       pricing / plan section
/#community     final CTA/resources area
/users          users dashboard
```

Do not use plain `#courses` on `/users`, because that would point to a section that does not exist on that page.

## Real Data Rule

Do not invent metrics in UI copy or agent responses.

Avoid:

- fake ratings
- fake student counts
- fake trusted company logos
- fake email rows
- fake outreach users
- fake review totals

Allowed:

- course price/duration/level from `courses.ts`
- campaign counts from `courseAds`
- sheet and row coverage from `salesTracker.ts`
- empty states when the workbook has no rows

## Future Complex API Plan

The current app has no backend, but the data shape is ready for a small API layer.

Recommended API responsibilities:

1. Parse `marketing/sales-tracker.xlsx`.
2. Validate workbook sheets and row schemas.
3. Expose typed JSON for the React app.
4. Detect missing data and report empty states.
5. Keep `src/data/salesTracker.ts` generated or replace it entirely.

Suggested endpoints:

| Endpoint | Method | Response |
| --- | --- | --- |
| `/api/health` | `GET` | App and workbook parse status. |
| `/api/courses` | `GET` | Course catalog. |
| `/api/marketing/ads` | `GET` | Rows from workbook `Ads`. |
| `/api/marketing/outreach` | `GET` | Rows from workbook `Outreach`. |
| `/api/marketing/emails` | `GET` | Empty array unless `Emails` exists. |
| `/api/marketing/summary` | `GET` | Counts for sheets, rows, active ads, missing sections. |
| `/api/sync/workbook` | `POST` | Re-read workbook and refresh generated data. |

Suggested summary response:

```json
{
  "source": "marketing/sales-tracker.xlsx",
  "sheets": ["Ads", "Outreach"],
  "counts": {
    "courses": 6,
    "ads": 8,
    "activeAds": 2,
    "emails": 0,
    "outreachLeads": 0
  },
  "missing": ["Emails sheet", "Outreach lead rows"]
}
```

## Agent Operating Rules

When asked to improve or reason about the app:

1. Check `marketing/sales-tracker.xlsx` first if the request mentions marketing, users, outreach, email, or campaign data.
2. Keep `src/data/salesTracker.ts` aligned with the workbook.
3. Preserve the current visual style unless the user asks for redesign.
4. Do not add fake rows to make the UI look full.
5. Use empty states when data is missing.
6. Keep all courses visible.
7. Run `npm run build` before pushing code.

## Good Extension Ideas

- Add workbook-to-JSON sync script.
- Add an API route/server for workbook parsing.
- Add editable outreach rows.
- Add Gmail integration only after user confirms account access and send permissions.
- Add validation that fails build if workbook and `salesTracker.ts` drift.

## Last Known Alignment

Aligned to current repository state:

- 6 courses
- 8 ad rows
- 2 active ads
- 0 campaign email rows
- 0 outreach lead rows
- Workbook sheets: `Ads`, `Outreach`
