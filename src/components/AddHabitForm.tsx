import { useState, type FormEvent } from 'react';

export default function AddHabitForm({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState('');
  const trimmed = name.trim();

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!trimmed) return;
    onAdd(trimmed);
    setName('');
  }

  return (
    <form className="add-habit" onSubmit={submit}>
      <input
        className="add-habit-input"
        type="text"
        aria-label="Habit name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="add-habit-button" disabled={!trimmed}>
        Add habit
      </button>
    </form>
  );
}
