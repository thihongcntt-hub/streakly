import type { Habit } from '../store/habits';
import { toDateKey } from '../lib/dates';

type Props = { habits: Habit[]; onToggle: (id: string) => void };

export default function HabitList({ habits, onToggle }: Props) {
  const todayKey = toDateKey(new Date());

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
      {habits.map((habit) => {
        const done = habit.doneDates.includes(todayKey);
        return (
          <li key={habit.id} className={done ? 'habit-row habit-row--done' : 'habit-row'}>
            <span className="habit-name">{habit.name}</span>
            <span className="done-toggle">
              <input
                type="checkbox"
                aria-label="Done today"
                checked={done}
                onChange={() => onToggle(habit.id)}
              />
            </span>
          </li>
        );
      })}
    </ul>
  );
}
