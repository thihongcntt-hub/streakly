import { currentWeek, toDateKey } from '../lib/dates';

const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short' });

export default function WeekStrip({ today }: { today: Date }) {
  const todayKey = toDateKey(today);
  return (
    <div className="week" role="group" aria-label="This week">
      {currentWeek(today).map((day) => {
        const key = toDateKey(day);
        const state = key === todayKey ? 'today' : key < todayKey ? 'past' : 'future';
        return (
          <div key={key} className={`day day--${state}`} aria-current={state === 'today' ? 'date' : undefined}>
            <span className="day-name">{weekday.format(day)}</span>
            <span className="day-num">{day.getDate()}</span>
          </div>
        );
      })}
    </div>
  );
}
