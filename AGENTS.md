# Rules for agents working on Streakly

## Branches and merge requests
- One ticket, one branch: `feat/<ticket-id>-<short-slug>`, for example `feat/3-streak-counter`.
- Open a merge request that references the ticket (`Closes #3`) and set the label `ready-for-qa`.
- A fix after a QA failure goes on the same branch and the same merge request.

## Before pushing
- `npm run build` must pass.
- `npm run test:e2e` must pass, including any test you added.
- Add at least one Playwright test in `tests/` for each acceptance criterion you implement.

## Code
- React function components in `src/components/`, one component per file.
- Keep state in `App.tsx` and persist habits with `saveHabits` from `src/store/habits.ts`.
- Use `toDateKey` from `src/lib/dates.ts` for any date comparison, never raw `Date` strings.
- Use the CSS variables in `src/styles.css`. Don't add new colors without a token.
- Give interactive elements accessible names so tests can find them by role.

## QA evidence
- Playwright records video, screenshots, and a trace for every test (see `playwright.config.ts`).
- When a test fails, comment on the ticket with steps, expected and actual results, and attach the evidence.

## Data
- Synthetic data only. Never use real client data, names, or code.
