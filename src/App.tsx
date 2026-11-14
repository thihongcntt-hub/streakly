import { useState } from 'react';
import WeekStrip from './components/WeekStrip';
import HabitList from './components/HabitList';
import { loadHabits, type Habit } from './store/habits';

const dateLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

export default function App() {
  const [habits] = useState<Habit[]>(loadHabits);
  const today = new Date();

  return (
    <main className="app">
      <header className="app-header">
        <h1>Streakly</h1>
        <p className="today">{dateLabel.format(today)}</p>
      </header>
      <WeekStrip today={today} />
      <section className="habits" aria-labelledby="habits-title">
        <h2 id="habits-title">Your habits</h2>
        <HabitList habits={habits} />
      </section>
    </main>
  );
}
