import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { xlsxSyncPlugin } from "./scripts/xlsx-sync-plugin.mjs";

export default defineConfig({
  plugins: [react(), xlsxSyncPlugin()],
});
