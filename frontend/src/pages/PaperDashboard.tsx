import { useMemo, useState } from 'react'
import { PaperCard } from '../components/PaperCard'
import type { Paper } from '../types/paper'

interface Props {
  papers: Paper[]
  onOpen: (paper: Paper) => void
}

export function PaperDashboard({ papers, onOpen }: Props) {
  const [query, setQuery] = useState('')
  const filtered = useMemo(
    () => papers.filter((paper) => paper.title.toLowerCase().includes(query.toLowerCase())),
    [papers, query],
  )

  return (
    <div className="space-y-3">
      <input
        placeholder="Search papers"
        className="w-full rounded border border-slate-300 px-3 py-2"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="grid gap-3 md:grid-cols-2">
        {filtered.map((paper) => (
          <PaperCard key={paper.id} paper={paper} onOpen={onOpen} />
        ))}
      </div>
    </div>
  )
}
