import { useState } from 'react'

export function NotesPanel() {
  const [notes, setNotes] = useState<string[]>([])
  const [draft, setDraft] = useState('')

  const add = () => {
    if (!draft.trim()) return
    setNotes((current) => [draft, ...current])
    setDraft('')
  }

  return (
    <section className="rounded-xl bg-white p-3 shadow">
      <h4 className="font-semibold">Notes</h4>
      <div className="mt-2 flex gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          className="flex-1 rounded border border-slate-300 px-2 py-1"
          placeholder="Write a note"
        />
        <button onClick={add} className="rounded bg-slate-900 px-3 py-1 text-white">
          Add
        </button>
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {notes.map((note, idx) => (
          <li key={idx} className="rounded bg-slate-100 p-2">
            {note}
          </li>
        ))}
      </ul>
    </section>
  )
}
