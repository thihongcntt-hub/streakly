import { useState } from 'react';
import WeekStrip from './components/WeekStrip';
import HabitList from './components/HabitList';
import AddHabitForm from './components/AddHabitForm';
import { loadHabits, saveHabits, type Habit } from './store/habits';
import { toDateKey } from './lib/dates';

const dateLabel = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

export default function App() {
  const [habits, setHabits] = useState<Habit[]>(loadHabits);
  const today = new Date();

  function addHabit(name: string) {
    const habit: Habit = {
      id: crypto.randomUUID(),
      name,
      createdAt: toDateKey(new Date()),
      doneDates: [],
    };
    const next = [...habits, habit];
    setHabits(next);
    saveHabits(next);
  }

  return (
    <main className="app">
      <header className="app-header">
        <h1>Streakly</h1>
        <p className="today">{dateLabel.format(today)}</p>
      </header>
      <WeekStrip today={today} />
      <section className="habits" aria-labelledby="habits-title">
        <h2 id="habits-title">Your habits</h2>
        <AddHabitForm onAdd={addHabit} />
        <HabitList habits={habits} />
      </section>
    </main>
  );
}
