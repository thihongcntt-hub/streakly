import { useState, type FormEvent } from 'react';

export default function AddHabitForm({ onAdd }: { onAdd: (name: string) => void }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError('Habit name is required');
      return;
    }
    onAdd(trimmed.slice(0, 60));
    setName('');
    setError('');
  }

  return (
    <form className="add-habit" onSubmit={handleSubmit} noValidate>
      <div className="add-habit-row">
        <input
          type="text"
          aria-label="New habit"
          placeholder="New habit"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={error ? true : undefined}
        />
        <button type="submit">Add</button>
      </div>
      {error && (
        <p className="add-habit-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
