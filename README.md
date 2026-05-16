# CourseCraft Sales Agent

CourseCraft is a realistic demo environment for an AI-assisted sales workflow around an online course marketplace. It combines a buyer-facing course storefront, a marketing operations workbook, and a user/outreach dashboard so an agent can reason from product context and campaign data instead of generic prompts.

## Why This Exists

The use case is simple: a small course business wants to sell multiple cohort-based courses without losing track of product positioning, ad campaigns, and outreach work.

This repo gives that business one coherent surface:

- A polished marketplace where every course is visible.
- A marketing workbook in `marketing/sales-tracker.xlsx` that acts as the current source of truth.
- A `/users` command page that shows email/outreach status from the workbook state.
- Typed frontend data in `src/data/salesTracker.ts` so the UI can mirror the workbook without a backend.

It is built for demos, agent evaluation, and early workflow prototyping. It is not connected to Gmail, Stripe, a CRM, or live ad platforms yet.

## Current Data State

The UI is aligned to the current workbook:

| Workbook sheet | Current state | UI behavior |
| --- | --- | --- |
| `Ads` | 8 ad rows | Course cards and course detail pages show campaign counts and ad positioning. |
| `Outreach` | 4 lead rows | `/users` shows prospect rows and next actions from the workbook. |
| `Emails` | Not present | `/users` shows no campaign email rows instead of fake email data. |

The workbook path is intentionally surfaced in the app so users know where the operational data is coming from:

```text
marketing/sales-tracker.xlsx
```

## Main User Flows

1. Open the storefront at `/`.
2. Review all six course cards.
3. Select a course to inspect its campaign positioning.
4. Open `/users` from the nav to see what email/outreach work exists.
5. Go back to Courses, Paths, Pricing, or Resources from the same nav.

All course cards should remain visible. The app does not hide courses just because a course has fewer campaign rows.

## Courses

The course catalog lives in `src/data/courses.ts`.

| Course | Category | Duration | Level | Price |
| --- | --- | --- | --- | --- |
| AI Product Strategy | AI | 6 weeks | Advanced | $249 |
| Visual Systems for Web | Design | 5 weeks | Intermediate | $189 |
| Analytics That Sell | Data | 4 weeks | Beginner | $139 |
| Launch Copy Studio | Marketing | 3 weeks | Intermediate | $119 |
| React Interface Lab | Code | 8 weeks | Advanced | $279 |
| Creator Business Kit | Creator | 4 weeks | Beginner | $99 |

## Data API

There is no server API yet. The current “API” is a typed frontend data layer:

```text
src/data/courses.ts
src/data/salesTracker.ts
```

Important exports:

| Export | Purpose |
| --- | --- |
| `courses` | Course catalog used by the storefront. |
| `courseAds` | Ads mirrored from the workbook `Ads` sheet. |
| `campaignEmails` | Empty array until an `Emails` sheet is added back. |
| `outreachLeads` | Four prospect rows from the current `Outreach` sheet. |
| `trackerSource` | Paths and sheet names shown in the UI. |
| `getCourseMarketing(courseTitle)` | Returns ads, emails, and lead matches for a course. |
| `getEmailDashboardStats()` | Builds `/users` KPI counts from current data. |
| `getWorkbookCoverageStats()` | Builds marketplace and summary counts from workbook mirror data. |

### Workbook Sync Snapshot

The project now includes a workbook sync script:

```bash
npm run sync:xlsx
```

That command reads `marketing/sales-tracker.xlsx` and writes:

```text
src/data/trackerSnapshot.json
```

The snapshot is the simplest bridge toward a real API: it proves the workbook can be parsed into JSON with the current workbook shape (`8` ads, `4` outreach leads, no email rows).

## Future Backend/API Use Case

The strongest next API use case is a sync endpoint that reads `marketing/sales-tracker.xlsx` and generates the typed data mirror automatically.

Recommended endpoints:

| Endpoint | Method | Use case |
| --- | --- | --- |
| `/api/courses` | `GET` | Return course catalog. |
| `/api/marketing/ads` | `GET` | Return workbook ad rows. |
| `/api/marketing/outreach` | `GET` | Return outreach leads when rows exist. |
| `/api/marketing/summary` | `GET` | Return counts for ads, emails, leads, active campaigns, and next actions. |
| `/api/sync/workbook` | `POST` | Re-read workbook and refresh app data. |

Until that backend exists, update `src/data/salesTracker.ts` when the workbook changes.

## Project Structure

```text
src/App.tsx                         Main app shell and /users routing
src/components/CourseExplorer.tsx   Course marketplace panel
src/components/CourseDetail.tsx     Selected course + campaign preview
src/components/UsersPage.tsx        Email/outreach status page
src/data/courses.ts                 Course catalog
src/data/salesTracker.ts            Workbook mirror and helper functions
src/data/trackerSnapshot.json       Generated workbook JSON snapshot
scripts/xlsx-sync-plugin.mjs        Workbook-to-JSON sync script
src/styles/global.css               Visual system and layout
marketing/sales-tracker.xlsx        Source workbook
marketing/course-posts.md           Organic social copy per course
public/design-reference/            UI reference image
context.md                          Deeper operating context
```

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173/
http://localhost:5173/users
```

Build:

```bash
npm run build
```

## Git Hygiene

`.gitignore` excludes generated and local-only files:

```text
node_modules/
dist/
.DS_Store
~$*.xlsx
```

Excel temporary lock files should not be committed.

## Known Limitations

- No live backend API.
- No live Gmail sending.
- No CRM or payment integration.
- Workbook-to-TypeScript sync is manual.
- `/users` currently shows empty email states because the workbook has no `Emails` sheet.

## Good Demo Prompt

Use this project when asking an agent:

```text
Use the CourseCraft sales tracker to identify which courses have campaign coverage, which campaign data is missing, and what should happen next on the users page.
```

That prompt forces the agent to inspect real local data, avoid fake metrics, and explain the next operational step.
