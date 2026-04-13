import { useState } from 'react'

interface Props {
  onImport: (source: string) => Promise<void>
}

export function UploadBox({ onImport }: Props) {
  const [source, setSource] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!source.trim()) return
    setLoading(true)
    try {
      await onImport(source)
      setSource('')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="rounded-xl bg-white p-4 shadow">
      <h3 className="text-lg font-semibold">Upload PDF or import DOI/arXiv</h3>
      <p className="mt-1 text-sm text-slate-600">MVP supports DOI/arXiv import plus backend PDF upload endpoint.</p>
      <input
        className="mt-3 w-full rounded border border-slate-300 px-3 py-2"
        value={source}
        onChange={(event) => setSource(event.target.value)}
        placeholder="https://arxiv.org/abs/... or DOI"
      />
      <button
        type="submit"
        disabled={loading}
        className="mt-3 rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? 'Importing…' : 'Import Paper'}
      </button>
    </form>
  )
}
