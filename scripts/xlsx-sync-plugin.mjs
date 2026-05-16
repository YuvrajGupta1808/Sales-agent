import { writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const XLSX_PATH = resolve(ROOT, "marketing/sales-tracker.xlsx");
const OUT_PATH = resolve(ROOT, "src/data/trackerSnapshot.json");

const HEADER_MAP = {
  // Ads
  "Ad ID": "id",
  "Course": "course",
  "Platform": "platform",
  "Campaign": "campaign",
  "Headline": "headline",
  "Primary Text": "primaryText",
  "CTA": "cta",
  "Audience": "audience",
  "Budget (USD)": "budget",
  "Status": "status",
  "Start Date": "startDate",
  "End Date": "endDate",
  "Notes": "notes",
  // Outreach
  "Lead ID": "id",
  "Name": "name",
  "Role": "role",
  "Company": "company",
  "Segment": "segment",
  "Source": "source",
  "Email": "email",
  "LinkedIn": "linkedIn",
  "X/Twitter": "twitter",
  "Email Sent": "emailSent",
  "Sent Date": "sentDate",
  "Last Touch": "lastTouch",
  "Stage": "stage",
  "Owner": "owner",
  "Next Action": "nextAction",
};

function mapHeader(label) {
  return HEADER_MAP[label] ?? label
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/^(.)/, (m) => m.toLowerCase());
}

function cellValue(cell) {
  const v = cell.value;
  if (v == null) return "";
  if (typeof v === "object") {
    if ("text" in v) return v.text;
    if ("richText" in v) return v.richText.map((r) => r.text).join("");
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    if ("result" in v) return v.result;
  }
  return v;
}

function readSheet(ws) {
  if (!ws) return [];
  const headerRow = ws.getRow(1);
  const headers = [];
  headerRow.eachCell({ includeEmpty: false }, (cell, col) => {
    headers[col] = mapHeader(String(cell.value ?? "").trim());
  });
  const rows = [];
  for (let r = 2; r <= ws.rowCount; r++) {
    const row = ws.getRow(r);
    const obj = {};
    let hasData = false;
    headers.forEach((h, col) => {
      if (!h) return;
      const v = cellValue(row.getCell(col));
      if (v !== "" && v != null) hasData = true;
      obj[h] = v ?? "";
    });
    if (hasData) rows.push(obj);
  }
  return rows;
}

async function buildSnapshot() {
  if (!existsSync(XLSX_PATH)) {
    return {
      ads: [],
      outreach: [],
      sheets: [],
      generatedAt: new Date().toISOString(),
      missing: true,
    };
  }
  const wb = new ExcelJS.Workbook();
  await wb.xlsx.readFile(XLSX_PATH);
  const ads = readSheet(wb.getWorksheet("Ads"));
  const outreach = readSheet(wb.getWorksheet("Outreach"));
  return {
    ads,
    outreach,
    sheets: wb.worksheets.map((s) => s.name),
    generatedAt: new Date().toISOString(),
  };
}

export async function writeSnapshot() {
  const snapshot = await buildSnapshot();
  writeFileSync(OUT_PATH, JSON.stringify(snapshot, null, 2) + "\n");
  return snapshot;
}

export function xlsxSyncPlugin() {
  return {
    name: "xlsx-sync",
    async buildStart() {
      const snap = await writeSnapshot();
      this.info?.(
        `xlsx-sync: ${snap.ads.length} ads, ${snap.outreach.length} leads from ${snap.sheets.join("+")}`,
      );
    },
    configureServer(server) {
      server.watcher.add(XLSX_PATH);
      const reload = async () => {
        try {
          const snap = await writeSnapshot();
          server.config.logger.info(
            `[xlsx-sync] reloaded: ${snap.ads.length} ads, ${snap.outreach.length} leads`,
          );
          server.ws.send({ type: "full-reload" });
        } catch (err) {
          server.config.logger.error(`[xlsx-sync] failed: ${err.message}`);
        }
      };
      server.watcher.on("change", (file) => {
        if (file === XLSX_PATH) reload();
      });
      server.watcher.on("add", (file) => {
        if (file === XLSX_PATH) reload();
      });
    },
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const snap = await writeSnapshot();
  console.log(
    `[xlsx-sync] wrote ${OUT_PATH} — ${snap.ads.length} ads, ${snap.outreach.length} leads`,
  );
}
