# Streakly

A small habit tracker. It's the sandbox app for our AI Build Day 2026 project, **Agent Studio**: AI agents pick up GitLab tickets and build Streakly's features, then a QA agent tests each one in a real browser.

This starter is deliberately small. It has the app shell, a week strip that marks today, an empty habit list, and storage helpers. Everything else is left for the agents to build from tickets.

## Run it

```bash
npm install
npx playwright install chromium ffmpeg
npm run dev          # http://localhost:5173
```

## Check it

```bash
npm run build        # type-check and production build
npm run test:e2e     # Playwright tests, with video, screenshots, and a trace for every test
```

Test evidence lands in `test-results/`, including `report.json` for the QA agent's report.

## Project layout

```
src/
  App.tsx                 page layout
  components/
    WeekStrip.tsx         Monday-to-Sunday strip, today highlighted
    HabitList.tsx         habit list and empty state
  store/habits.ts         Habit type, load and save to localStorage
  lib/dates.ts            local date keys and the current week
  styles.css              design tokens and styles
tests/
  smoke.spec.ts           app loads, empty state, week strip
```

## Features

New features arrive as GitLab issues. The issue's acceptance criteria are the spec: build exactly what they say.

## Ticket workflow

Labels drive the whole flow:

`todo` → `in-progress` → `ready-for-qa` → `in-qa` → `qa-passed`, or `qa-failed` back to the developer.

See `AGENTS.md` for the rules every agent follows.
