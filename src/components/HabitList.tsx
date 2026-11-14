import type { Habit } from '../store/habits';

export default function HabitList({ habits }: { habits: Habit[] }) {
  if (habits.length === 0) {
    return (
      <div className="empty">
        <p className="empty-title">No habits yet</p>
        <p className="empty-body">Habits you add show up here, with a mark for every day you complete them.</p>
      </div>
    );
  }

  return (
    <ul className="habit-list">
      {habits.map((habit) => (
        <li key={habit.id} className="habit-row">
          <span className="habit-name">{habit.name}</span>
        </li>
      ))}
    </ul>
  );
}
