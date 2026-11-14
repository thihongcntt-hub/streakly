export type Habit = {
  id: string;
  name: string;
  createdAt: string; // yyyy-mm-dd
  doneDates: string[]; // yyyy-mm-dd, one entry per completed day
};

const STORAGE_KEY = 'streakly.habits.v1';

export function loadHabits(): Habit[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Habit[]) : [];
  } catch {
    return [];
  }
}

export function saveHabits(habits: Habit[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  } catch {
    // Storage can be unavailable (private mode, quota). The app keeps working in memory.
  }
}
