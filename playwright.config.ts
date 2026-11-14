import { defineConfig, devices } from '@playwright/test';

// PORT lets Agent Studio run one copy per ticket side by side.
const port = Number(process.env.PORT) || 5173;
const baseURL = `http://localhost:${port}`;

export default defineConfig({
  testDir: 'tests',
  reporter: [['list'], ['json', { outputFile: 'test-results/report.json' }]],
  use: {
    baseURL,
    // Evidence for the QA agent: every test keeps a video, screenshots, and a trace.
    video: 'on',
    screenshot: 'on',
    trace: 'on',
  },
  webServer: {
    command: 'npm run dev',
    url: baseURL,
    reuseExistingServer: true,
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
